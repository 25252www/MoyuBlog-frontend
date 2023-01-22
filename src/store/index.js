import {createStore} from 'vuex'
import getters from './getters'
import user from "./modules/user";
import permission from "./modules/permission";

export const store = createStore({
    modules: {
        user,
        permission
    },
    getters
})

