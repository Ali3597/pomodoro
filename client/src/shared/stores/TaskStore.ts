import type { TaskInterface, TaskFormInterface, FilterTask, TaskErrorInterface  } from "@/shared/interfaces";
import { defineStore } from "pinia";
import { ApiErrors, apiFetch } from "../services";


interface TaskState {
    tasks: TaskInterface[];
    filter: FilterTask;
    activeTaskId: string | null;
    openId: string | null;
    loaded: boolean
    errors :TaskErrorInterface 
}





export const useTask = defineStore('task', {

    state: (): TaskState => ({
        tasks: [],
        filter: "Date",
        activeTaskId: null,
        openId: null,
        loaded: false,
        errors : {}
    }),
    getters: {

        tasksSorted(state) {
            if (state.filter == "Date") {
                return state.tasks.sort(compareTaskDate);
            }
            else if (state.filter == "Done") {
                return state.tasks.sort(compareTaskDone);
            }
        },

        activedTask(state) {
            return state.activeTaskId ? state.tasks.find((task) => { return task._id == state.activeTaskId }) : null
        },




    },


    actions: {

        async fetchTasks() {
            this.tasks = await apiFetch("task/")
            this.loaded = true;
        },

        async addTask(task: TaskFormInterface) {
            try {
                const newTask = await apiFetch("task", {
                    method: "POST",
                    body: task
                })
                this.tasks.push(newTask)
            } catch (e ) {
                if (e instanceof ApiErrors) {
                    this.errors= e.errorsPerField 
                } else {
                    throw e
                }
            }

        },

        async editTask(id: string, task: TaskFormInterface) {

            try {
                let myTask = this.tasks.find(element => element._id == id)
                const newTask = await apiFetch("task/" + myTask!._id, {
                    method: "POST",
                    body: task
                })
                myTask!.title = newTask.title
                myTask!.details = newTask.details

            } catch (e) {
                if (e instanceof ApiErrors) {
                    this.errors= e.errorsPerField 
                } else {
                    throw e
                }
            }
        },


        async deleteTask(id: string) {
            try {
                await apiFetch("task/" + id, {
                    method: "DELETE",
                })
                this.tasks = this.tasks.filter(task => task._id != id)
            } catch (e) {
                throw e;
            }

        },

        async toggleTask(id: string) {
            try {
                let myTask = this.tasks.find(element => element._id == id)
                const newTask = await apiFetch("task/toggle/" + myTask!._id, {
                    method: "POST",
                })
                myTask!.done_at = newTask.done_at
            } catch (e) {
                throw e;
            }
        },



        async deleteAllTask() {
            try {
                await this.tasks.reduce(async (a, task) => {
                    // Wait for the previous item to finish processing
                    await a;
                    this.deleteTask(task._id)
                }, Promise.resolve());
                this.activeTaskId = null
            } catch (error) {
                throw error
            }


        },

        activeTask(id: string) {
            this.activeTaskId = id
        },





        async validAllTask() {
            try {
                await this.tasks.reduce(async (a, task) => {
                    // Wait for the previous item to finish processing
                    await a;

                    if (task.done_at == null) {
                        this.toggleTask(task._id)
                    }
                }, Promise.resolve());
                this.activeTaskId = null
            } catch (error) {
                throw error
            }
        },

        async deleteAllValidTask() {
            try {
                await this.tasks.reduce(async (a, task) => {
                    // Wait for the previous item to finish processing
                    await a;
                    if (task.done_at != null) {
                        this.deleteTask(task._id)
                    }
                }, Promise.resolve());
                this.activeTaskId = null
            } catch (error) {
                throw error
            }
        },



        setNewOpen(id: string | null) {
            this.resetErrors()
            this.openId = id
        },

        resetErrors() {
            this.errors = {}
        },


    }


})





export function compareTaskDate(a: TaskInterface, b: TaskInterface) {
    if (a.created_at > b.created_at) return 1;
    if (a.created_at < b.created_at) return -1;
    return 0;
}


export function compareTaskDone(a: TaskInterface, b: TaskInterface) {
    if (a.done_at && !b.done_at) return 1;
    if (!a.done_at && b.done_at) return -1;
    return 0;
}