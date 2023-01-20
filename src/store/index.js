import {createStore} from 'vuex'
import getters from './getters'
import user from "./modules/user";

export const store = createStore({
    modules: {
        user
    },
    getters
})

