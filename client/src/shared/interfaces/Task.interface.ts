
export interface TaskInterface {
    _id: string,
    title: string,
    details: null | string,
    subTasks: TaskInterface[],
    created_at: Date,
    done_at: null | Date
}

export interface TaskFormInterface {
    title: string,
    details: null | string,
}