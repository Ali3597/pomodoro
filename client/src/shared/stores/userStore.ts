import { defineStore } from 'pinia';
import type { LoginForm, User, UserForm } from '../interfaces';
import {  apiFetch } from '../services';

interface UserState {
    currentUser: User | null,
    loaded: boolean
}

export const useUser = defineStore('user', {
    state: (): UserState => ({
        currentUser: null,
        loaded: false
    }),
    getters: {
        isAuthenticated(state): boolean | null {
            if (state.currentUser) {
                return true;
            } else if (!state.currentUser && state.loaded) {
                return false;
            } else {
                return null;
            }
        }
    },
    actions: {
        async login(loginForm: LoginForm) {
            try {
                this.currentUser = await apiFetch("auth/login", {
                    method: "POST",
                    body: loginForm
                })
            } catch (e) {
                throw e;
            }
        },
        async signup(userForm: UserForm) {
            try {
                this.currentUser = await apiFetch("auth/signup", {
                    method: "POST",
                    body: userForm
                })
            } catch (e) {
                throw e;
            }
        },
        async logout() {
            try {
                await apiFetch("auth/logout");
                this.currentUser = null;
            } catch (e) {
                throw e;
            }
        },

        async fetchCurrentUser() {
            this.currentUser = await apiFetch("auth/me");
            this.loaded = true;
        }
    }
});