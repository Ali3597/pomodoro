import type { User } from "./User.interface"

export interface TaskInterface {
    _id: string,
    title: string,
    details: string,
    created_at: Date,
    updated_at:  null |Date,
    done_at: null | Date
    author: User
}

export interface TaskFormInterface {
    title: string,
    details:  string,
}

export interface TaskErrorInterface {
    title?: string,
    details?:  string,
}