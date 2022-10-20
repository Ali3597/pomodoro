import type { TaskInterface,TaskFormInterface, FilterTask } from "@/shared/interfaces";
import { defineStore } from "pinia";

interface TaskState {
    tasks: TaskInterface[];
    day: Date;
    filter: FilterTask;
    activeTaskId: string | null;
    open:  string | null;
}

const taskTestA = {
     _id: "1",
    title: "Ma premiere tache test",
    details: null ,
    subTasks: [],
    created_at: new Date(),
    done_at: null 
}

const taskTestB = {
     _id: "2",
    title: "Ma deusieme tache test",
    details: null ,
    subTasks: [],
    created_at: new Date(),
    done_at: null 
}



export const useTask = defineStore('task', {

    state: (): TaskState => ({
        tasks: [taskTestA,taskTestB],
        day: new Date(),
        filter: "Date",
        activeTaskId:"1",
        open:null
    }),
    getters: {

        tasksDay(state) {
            if (state.filter == "Date") {
                return state.tasks.filter((task) => {
                    return task.created_at.getDate() == state.day.getDate()
                }).sort(compareTaskDate);
            }
             else if (state.filter == "Done") {
                return state.tasks.filter((task) => {
                    return task.created_at.getDate() == state.day.getDate()
                }).sort(compareTaskDone);
            }
        },

        activedTask(state) {
            return state.tasks.find((task) => {return task._id == state.activeTaskId}) 
        },

       
        

    },


    actions: {


        addTask(task:TaskFormInterface) {
            const newTask:TaskInterface = {
                _id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
                title: task.title,
                details : task.details,
                subTasks : [],
                created_at: new Date(),
                done_at: null 
            }
            this.tasks.push(newTask)
            console.log(this.tasks,"mes taches")
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
            console.log(task)
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