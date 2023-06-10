import type { TaskInterface,TaskFormInterface, FilterTask, User } from "@/shared/interfaces";
import { defineStore } from "pinia";
import { useUser } from "./userStore";
const userStore = useUser()
interface TaskState {
    tasks: TaskInterface[];
    filter: FilterTask;
    activeTaskId: string | null;
    open:  string | null;
}





export const useTask = defineStore('task', {

    state: (): TaskState => ({
        tasks: [],
        filter: "Date",
        activeTaskId:"1",
        open:null
    }),
    getters: {

        tasks(state) {
            if (state.tasks){
                return []
            }
            else if (state.filter == "Date") {
                return state.tasks.sort(compareTaskDate);
            }
             else if (state.filter == "Done") {
                return state.tasks.sort(compareTaskDone);
            }
        },

        activedTask(state) {
            return state.tasks.find((task) => {return task._id == state.activeTaskId}) 
        },

       
        

    },


    actions: {

        getMyTasks(){
            this.tasks = await 
        },
        addTask(task:TaskFormInterface) {
            const newTask:TaskInterface = {
                _id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
                title: task.title,
                details : task.details,
                created_at: new Date(),
                updated_at:null,
                done_at: null ,
                author: userStore.currentUser as User
            }
            this.tasks.push(newTask)
          },

          editTask(id:string,task:TaskFormInterface) {
            let myTask = this.tasks.find(element => element._id == id)
            if (myTask){
                myTask.title = task.title
                myTask.details = task.details
            }
          },


        deleteTask(id:string) {
          this.tasks.filter(task => task._id != id)
        },
        isItOpen(id:string) {
            if (this.open == id ) return true
            return false
          },
        
        whoIsOpen(id:string| null){
            this.open = id
        },

        deleteAllTask() {
            this.tasks = []
            this.activeTaskId= null
        },
        createTask(task: TaskInterface) {
          this.tasks.push(task)
        },

        activeTask(id: string) {
            this.activeTaskId = id
        },

     
        toggleDoneTask(id: string) {
            let task = this.tasks.find(element => element._id == id)
            if (task) {
                if (!task.done_at) {
                     task.done_at = new Date()
                } else {
                     task.done_at = null
                 }
            }
       
        },


        validAllTask(){
            this.tasks.map((task)=>{
                if (!task.done_at){
                task.done_at = new Date()
                }
            })
        },

        deleteAllValidTask(){
             this.tasks = this.tasks.filter((task) => {
                return !task.done_at
            })
        }


    }


})





export function compareTaskDate(a:TaskInterface,b:TaskInterface) {
    if (a.created_at > b.created_at) return 1;
    if (a.created_at < b.created_at) return -1;
    return 0;
}


export function compareTaskDone(a:TaskInterface,b:TaskInterface) {
    if (a.done_at && !b.done_at) return 1;
    if (!a.done_at && b.done_at) return -1;
    return 0;
}