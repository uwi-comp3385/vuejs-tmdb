import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            tmdbApiUrl: "https://api.themoviedb.org/3",
            count: 0
        }
    },
    actions: {
        increment() {
            this.count++
        }
    }
})