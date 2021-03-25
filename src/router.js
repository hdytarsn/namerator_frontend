import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Home from "./views/game/Home.vue";
import HowToPlay from "./views/information/HowToPlay.vue";
import GameRules from "./views/information/GameRules.vue";
import GameSettings from "./views/game/GameSettings";
import Login from "./views/user/Login.vue";
import Register from "./views/user/Register.vue";
import Profile from "./views/user/Profile.vue";
import NotFound from "./views/error/404.vue";

Vue.use(Router);

export default new Router({
    linkExactActiveClass: "active",
    mode: 'history',
    routes: [
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
            path: "/game-settings",
            name: "gameSettings",
            components: {
                header: AppHeader,
                default: GameSettings,
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
            }
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
    ],
    scrollBehavior: to => {
        if (to.hash) {
            return {selector: to.hash};
        } else {
            return {x: 0, y: 0};
        }
    }
});
