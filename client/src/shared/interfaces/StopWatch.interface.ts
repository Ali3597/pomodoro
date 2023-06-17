import type { Status, Section } from "./type";


export interface StopWatchInterface {
    time: number,
    color: string,
    status: Status,
    section: Section,
    timeInterval: any
    countWork:number

}