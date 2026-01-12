'use client';

import Cookies from 'js-cookie';

export interface User {
    phone: string;
    firstName: string;
    lastName: string;
    points: number;
    badge: string;
}

const USER_COOKIE_KEY = 'hemo_user';
const PHONE_COOKIE_KEY = 'hemo_phone';

export const authUtils = {
    // Save user to cookies
    saveUser: (user: User) => {
        Cookies.set(USER_COOKIE_KEY, JSON.stringify(user), { expires: 30 }); // 30 days
        Cookies.set(PHONE_COOKIE_KEY, user.phone, { expires: 30 });
    },

    // Get user from cookies
    getUser: (): User | null => {
        const userStr = Cookies.get(USER_COOKIE_KEY);
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    // Get phone from cookies
    getPhone: (): string | null => {
        return Cookies.get(PHONE_COOKIE_KEY) || null;
    },

    // Check if user is logged in
    isLoggedIn: (): boolean => {
        return !!Cookies.get(PHONE_COOKIE_KEY);
    },

    // Logout - clear cookies
    logout: () => {
        Cookies.remove(USER_COOKIE_KEY);
        Cookies.remove(PHONE_COOKIE_KEY);
    },

    // Update user stats (points and badge)
    updateStats: (points: number, badge: string) => {
        const user = authUtils.getUser();
        if (user) {
            user.points = points;
            user.badge = badge;
            authUtils.saveUser(user);
        }
    },

    // Legacy support (updates points only)
    updatePoints: (points: number) => {
        const user = authUtils.getUser();
        if (user) {
            user.points = points;
            authUtils.saveUser(user);
        }
    },
};
