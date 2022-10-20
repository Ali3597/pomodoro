import type { StopWatchInterface } from "@/shared/interfaces";
import { defineStore } from "pinia";





export const useStopWatch = defineStore('stopWatch', {

    state: (): StopWatchInterface => ({
        time: 1500,
        color: "#ff0025",
        status: "Pause",
        section: "Work",
        timeInterval: null
    }),
    getters: {

        prettyTime(state): string {
            let hour: any = Math.floor(state.time / 3600);
            let minute: any = Math.floor((state.time % 3600) / 60);
            let second: any = state.time % 60;

            if (hour.toString().length === 1) {
                hour = `0${hour}`;
            }
            if (minute.toString().length === 1) {
                minute = `0${minute}`;
            }
            if (second.toString().length === 1) {
                second = `0${second}`;
            };
            return `${hour}-${minute}-${second}`;
        },
        brighten(state): string {
            // strip the leading # if it's there
            let hex = state.color.replace(/^\s*#|\s*$/g, '');
            let percent = 20

            // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
            if (hex.length == 3) {
                hex = hex.replace(/(.)/g, '$1$1');
            }

            var r = parseInt(hex.substr(0, 2), 16),
                g = parseInt(hex.substr(2, 2), 16),
                b = parseInt(hex.substr(4, 2), 16);

            return '#' +
                ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
                ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
                ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
        }



    },


    actions: {

        start() {
            this.status = "Progress"
            this.timeInterval = setInterval(() => {
                if (this.time > 0) {
                    this.time--
                } else {
                    clearInterval(this.timeInterval)
                    this.reset()
                }
            }, 1000)

        },
        stop() {
            this.status = "Pause"
            clearInterval(this.timeInterval)
        },
        reset() {
            this.stop()
            this.time = 1500
        },
        passToShortBreak() {
            this.stop()
            if (this.section !== "Short") {
                this.section = "Short"
                this.color = "#6cdf23"
                this.status = "Pause"
                this.time = 300
            }
        },
        passToLongBreak() {
            this.stop()
            if (this.section !== "Long") {
                this.section = "Long"
                this.color = "#0da2ff"
                this.status = "Pause"
                this.time = 900
            }
        },
        passToWork() {
            this.stop()
            if (this.section !== "Work") {
                this.section = "Work"
                this.color = "#ff0025"
                this.status = "Pause"
                this.time = 1500
            }
        },


    }


})






// export function initialFetchProducts() {
//     const productStore = useProducts()
//     if (!productStore.loaded || productStore.needRefresh) {
//         productStore.fetchProducts()
//         productStore.loaded = true
//         if (productStore.needRefresh) {
//             productStore.pagev = 1
//             productStore.products = []
//             productStore.needRefresh = false
//         }

//     }
// }  