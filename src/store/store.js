import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        userDetail:{
            id:1,
            name:'Hidayet',
            email:'',
        },
        isGameStart:false,
        gameConfig:{

        }
    }
})