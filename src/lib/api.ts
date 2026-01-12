// Hemo API Configuration
const API_BASE_URL = 'https://api.hemo.com.tr/api';

// Helper function for API requests
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                data: null,
                error: errorData.error || `Hata: ${response.status}`
            };
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error('API Error:', error);
        return { data: null, error: 'Bağlantı hatası. Lütfen tekrar deneyin.' };
    }
}

// Authentication APIs
export const authAPI = {
    login: async (phone: string, password: string, fcmToken?: string) => {
        return apiRequest<{
            message: string;
            phone: string;
            first_name: string;
            last_name: string;
            points: number;
            badge: string;
        }>('/login/', {
            method: 'POST',
            body: JSON.stringify({ phone, password, fcm_token: fcmToken }),
        });
    },

    register: async (data: {
        first_name: string;
        last_name: string;
        phone: string;
        email: string;
        city: string;
        blood_type: string;
        password: string;
    }) => {
        return apiRequest<{ message: string; phone: string; error?: string }>('/register/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    verifyOTP: async (phone: string, code: string) => {
        return apiRequest<{ message: string }>('/verify-otp/', {
            method: 'POST',
            body: JSON.stringify({ phone, code }),
        });
    },

    changePassword: async (phone: string, oldPassword: string, newPassword: string) => {
        return apiRequest<{ message: string }>('/change-password/', {
            method: 'POST',
            body: JSON.stringify({
                phone,
                old_password: oldPassword,
                new_password: newPassword
            }),
        });
    },
};

// Blood Request Types
export interface BloodRequest {
    id: number;
    user_id: number;
    user_name: string;
    first_name: string;
    last_name: string;
    patient_first_name: string;
    patient_last_name: string;
    city: string;
    district: string;
    hospital: string;
    blood_type: string;
    blood_product: string;
    amount: number;
    contact_phone: string;
    transport_support: boolean;
    created_at: string;
    is_active: boolean;
}

// Blood Request APIs
export const bloodRequestAPI = {
    getAll: async (city?: string, viewerPhone?: string) => {
        let url = '/blood-requests/';
        const params = new URLSearchParams();
        if (city && city !== 'Tüm Türkiye') params.append('city', city);
        if (viewerPhone) params.append('viewer_phone', viewerPhone);
        if (params.toString()) url += `?${params.toString()}`;

        return apiRequest<BloodRequest[]>(url);
    },

    getById: async (id: number) => {
        return apiRequest<BloodRequest>(`/blood-requests/${id}/`);
    },

    create: async (data: {
        user_phone: string;
        patient_first_name: string;
        patient_last_name: string;
        patient_tc: string;
        city: string;
        district: string;
        hospital: string;
        blood_type: string;
        blood_product: string;
        amount: number;
        contact_phone: string;
        transport_support: boolean;
    }) => {
        return apiRequest<{ message: string }>('/blood-requests/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getMyRequests: async (phone: string) => {
        return apiRequest<BloodRequest[]>(`/my-requests/?phone=${phone}`);
    },

    deleteRequest: async (id: number) => {
        return apiRequest<{ message: string }>(`/delete-request/${id}/`, {
            method: 'DELETE',
        });
    },

    getDonors: async (requestId: number) => {
        return apiRequest<{ donation_id: number; donor_name: string }[]>(
            `/request-donors/${requestId}/`
        );
    },
};

// Donation APIs
export const donationAPI = {
    create: async (phone: string, requestId: number) => {
        return apiRequest<{ message: string }>('/donate/', {
            method: 'POST',
            body: JSON.stringify({ phone, request_id: requestId }),
        });
    },

    approve: async (donationId: number) => {
        return apiRequest<{ message: string }>('/approve-donation/', {
            method: 'POST',
            body: JSON.stringify({ donation_id: donationId }),
        });
    },

    getMyDonations: async (phone: string) => {
        return apiRequest<{
            hospital: string;
            blood_type: string;
            date: string;
            status: string;
            status_code: string;
        }[]>(`/my-donations/?phone=${phone}`);
    },
};

// User APIs
export const userAPI = {
    getProfile: async (phone: string) => {
        return apiRequest<{
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            phone: string;
            points: number;
            badge: string;
        }>(`/user-profile/?phone=${phone}`);
    },

    updateProfile: async (data: {
        phone: string;
        first_name: string;
        last_name: string;
        email: string;
    }) => {
        return apiRequest<{ message: string }>('/update-profile/', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    deleteAccount: async (phone: string) => {
        return apiRequest<{ message: string }>('/delete-account/', {
            method: 'DELETE',
            body: JSON.stringify({ phone }),
        });
    },

    blockUser: async (blockerPhone: string, blockedUserId: number) => {
        return apiRequest<{ message: string }>('/block-user/', {
            method: 'POST',
            body: JSON.stringify({
                blocker_phone: blockerPhone,
                blocked_user_id: blockedUserId
            }),
        });
    },

    reportContent: async (reporterPhone: string, requestId: number, reason: string) => {
        return apiRequest<{ message: string }>('/report-content/', {
            method: 'POST',
            body: JSON.stringify({
                reporter_phone: reporterPhone,
                blood_request_id: requestId,
                reason
            }),
        });
    },
};

// Location APIs
export const locationAPI = {
    getCities: async () => {
        return apiRequest<string[]>('/cities/');
    },

    getDistricts: async (city: string) => {
        return apiRequest<string[]>(`/districts/?city=${city}`);
    },

    getHospitals: async (city: string, district: string) => {
        return apiRequest<{ id: number; city: string; district: string; name: string }[]>(
            `/hospitals/?city=${city}&district=${district}`
        );
    },
};

// Leaderboard API
export const leaderboardAPI = {
    get: async () => {
        return apiRequest<{
            first_name: string;
            last_name: string;
            points: number;
            badge: string;
        }[]>('/leaderboard/');
    },
};

// Legal Documents API
export const legalAPI = {
    getDocument: async (slug: string) => {
        return apiRequest<string>(`/contracts/${slug}/`);
    },
};

// Blood Type Mapping
export const BLOOD_TYPES = [
    { value: 'A+', label: 'A Rh+' },
    { value: 'A-', label: 'A Rh-' },
    { value: 'B+', label: 'B Rh+' },
    { value: 'B-', label: 'B Rh-' },
    { value: 'AB+', label: 'AB Rh+' },
    { value: 'AB-', label: 'AB Rh-' },
    { value: '0+', label: '0 Rh+' },
    { value: '0-', label: '0 Rh-' },
];

// Blood Product Mapping
export const BLOOD_PRODUCTS = [
    { value: 'tam_kan', label: 'Tam Kan' },
    { value: 'eritrosit', label: 'Eritrosit Süspansiyonu' },
    { value: 'trombosit', label: 'Trombosit (Beyaz Kan)' },
    { value: 'plazma', label: 'Taze Donmuş Plazma' },
];

// Get product display name
export const getProductDisplayName = (code: string): string => {
    const product = BLOOD_PRODUCTS.find(p => p.value === code);
    return product?.label || 'Tam Kan';
};
