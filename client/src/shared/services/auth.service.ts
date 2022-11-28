import type { LoginForm, User, UserForm } from "../interfaces";

const BASE_URL = '/api/auth';

export async function login(loginForm: LoginForm): Promise<User> {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify(loginForm),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}

export async function logout() {
    await fetch(`${BASE_URL}/logout`, {
        method: 'GET',
    });
}


export async function signup(userForm: UserForm) {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            body: JSON.stringify(userForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return response.json();
        } else {
            throw await response.json();
        }
    } catch (e) {
        throw e;
    }
}

export async function me(): Promise<User | null> {
    
    const test =  await (await fetch(`${BASE_URL}/me`,{
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    })).json()


    return test ;
}