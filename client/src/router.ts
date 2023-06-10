import { createRouter, createWebHistory } from 'vue-router'
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './shared/guards';
import { useUser } from './shared/stores/userStore';
import NotFound from "./views/NotFound.vue"
import { useTask } from './shared/stores/TaskStore';



export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            beforeEnter: [isAuthenticatedGuard,
                async () => {
                const taskStore = useTask();
                if (!taskStore.loaded) {
                    await taskStore.fetchTasks();
                }
            }],
            component: () => import('@/features/pomodoro/Pomodoro.vue')
        },
        {
            path: '/connexion',
            beforeEnter: [isNotAuthenticatedGuard],
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/inscription',
            beforeEnter: [isNotAuthenticatedGuard],
            component: () => import('@/views/Signup.vue')
        },
        {
            path: '/profil',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import('@/features/admin/Profil.vue')
        },
        {
            path: '/:notfound(.*)*',
            component: NotFound
        }
    ]
})

router.beforeEach(async () => {
    const userStore = useUser();
    if (!userStore.loaded) {
        await userStore.fetchCurrentUser();
    }
});