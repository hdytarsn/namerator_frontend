import Vue from "vue";
import Router from "vue-router";
import {constants} from "./store/constants";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Home from "./views/game/Home.vue";
import HowToPlay from "./views/information/HowToPlay.vue";
import GameRules from "./views/information/GameRules.vue";
import GameSettings from "./views/game/GameSettings";
import GameRoom from "./views/game/GameRoom";
import PlayGame from "./views/game/PlayGame";
import Login from "./views/user/Login.vue";
import Register from "./views/user/Register.vue";
import Profile from "./views/user/Profile.vue";
import NotFound from "./views/error/404.vue";

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "home",
        components: {
            header: AppHeader,
            default: Home,
        }
    },
    {
        path: "/how-to-play",
        name: "howToPlay",
        components: {
            header: AppHeader,
            default: HowToPlay,
            footer: AppFooter
        }
    },
    {
        path: "/game-rules",
        name: "gameRules",
        components: {
            header: AppHeader,
            default: GameRules,
            footer: AppFooter
        }
    },
    {
        path: "/game/settings",
        name: "gameSettings",
        components: {
            header: AppHeader,
            default: GameSettings,
        }
    },
    {
        path: "/game/room/:slug",
        name: "gameRoom",
        components: {
            header: AppHeader,
            default: GameRoom,
        }
    },
    {
        path: "/game/play",
        name: "playGame",
        components: {
            header: AppHeader,
            default: PlayGame,
            footer: AppFooter
        }
    },
    {
        path: "/profile",
        name: "profile",
        components: {
            header: AppHeader,
            default: Profile,
            footer: AppFooter
        },
        meta: {
            auth: true
        },
    },
    {
        path: "/login",
        name: "login",
        components: {
            header: AppHeader,
            default: Login,
        }
    },
    {
        path: "/register",
        name: "register",
        components: {
            header: AppHeader,
            default: Register,
        }
    }, {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: NotFound
    }
];
const router = new Router({
    mode: 'history',
    base: '/',
    routes
})
router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.auth) && !loggedIn) {
        next('/login')
        return
    }
    next()
});

export default router;



