import { defineStore } from 'pinia';
import type { LoginForm, User, UserForm } from '../interfaces';
import {  ApiErrors, apiFetch } from '../services';

interface UserState {
    currentUser: User | null,
    loaded: boolean,
    errors :UserForm
    
}

export const useUser = defineStore('user', {
    state: (): UserState => ({
        currentUser: null,
        loaded: false,
        errors : {}
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
                if (e instanceof ApiErrors) {
                    this.errors= e.errorsPerField 
           
                } else {
                  
                    throw e
                }
            }
        },
        async signup(userForm: UserForm) {
            try {
                this.currentUser = await apiFetch("auth/signup", {
                    method: "POST",
                    body: userForm
                })
            } catch (e) {
                if (e instanceof ApiErrors) {
                    
                    this.errors= e.errorsPerField 
                } else {
                    throw e
                }
            }
        },
        async logout() {
            try {
               
                this.currentUser = null;
            } catch (e) {
                throw e;
            }
        },

        async fetchCurrentUser() {
            this.currentUser = await apiFetch("auth/me");
            this.loaded = true;
        },

        resetErrors() {
            this.errors = {}
        },
    }
});