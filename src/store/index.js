import Vue from 'vue'
import Vuex from 'vuex'
import { ch } from '../assets/lang/ch';
import { en } from '../assets/lang/en';
import locale from 'element-ui/lib/locale/lang/zh-TW'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        examination: false,
        langData: ch
    },
    getters: {},
    mutations: {
        languageSet:(state)=>{
            switch(localStorage.getItem('lang')){
                case 'en':
                    state.langData = en;
                    locale.el.pagination = {
                        goto: 'To',
                        pagesize: '',
                        total: `{total}`,
                        pageClassifier: 'Page',
                    };
                    break;
                default:
                    state.langData = ch;
                    locale.el.pagination = {
                        goto: '跳至',
                        pagesize: '',
                        total: `{total}`,
                        pageClassifier: '頁',
                    };
                    break;
            }
        },
        languageChange:(state, text)=>{
            switch(text){
                case 'en':
                    state.langData = en;
                    localStorage.setItem('lang','en');
                    locale.el.pagination = {
                        goto: 'To',
                        pagesize: '',
                        total: `{total}`,
                        pageClassifier: 'Page',
                    };
                    break;
                default:
                    state.langData = ch;
                    localStorage.setItem('lang','ch');
                    locale.el.pagination = {
                        goto: '跳至',
                        pagesize: '',
                        total: `{total}`,
                        pageClassifier: '頁',
                    };
                    break;
            }
        }
    },
    actions: {
        languageChange({ commit }, text){
            commit('languageChange', text);
        },
        languageSet({ commit }){
            commit('languageSet');
        }
    },
})
export default store;