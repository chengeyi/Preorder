<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info" class="navContainer">
            <b-navbar-brand href="#" id="fontStyle">NiceBank</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- <b-navbar-nav>
                    <b-nav-item href="#">Link</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav> -->

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <!-- <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form> -->

                    <b-nav-item-dropdown :text="langData.wLang">
                        <b-dropdown-item @click="
                            languageChange('ch'),
                            updateTableWord('ch')
                        ">CH</b-dropdown-item>
                        <b-dropdown-item @click="
                            languageChange('en'),
                            updateTableWord('en')
                        ">EN</b-dropdown-item>
                        <!-- <b-dropdown-item>JP</b-dropdown-item> -->
                    </b-nav-item-dropdown>
                    <!-- Using 'button-content' slot -->
                    <!-- <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown> -->
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import locale from 'element-ui/lib/locale/lang/zh-TW'

export default {
    data(){
        return{
        }
    },
    mounted(){
    },
    methods: {
        ...mapActions([
            'languageChange'
        ]),
        updateTableWord(lang){
            switch(lang){
                case 'en':
                    locale.el.pagination = {
                        goto: 'To',
                        pagesize: '',
                        total: `{total}`,
                        pageClassifier: 'Page',
                    };
                    break;
                default:
                    locale.el.pagination = {
                        goto: '??????',
                        pagesize: '',
                        total: `{total}`,
                        pageClassifier: '???',
                    };
                    break;
            }
        },
    },
    computed:{
        ...mapState([
            'langData'
        ])
    },

}
</script>

<style lang="less" scoped>
.navContainer {
    background-color: transparent !important;
    backdrop-filter: blur(35px) !important;
    width: 100%;
    height: 70px;
    margin-bottom: 30px;
    position: relative;
    z-index: 9999;
}

#fontStyle{
    // padding: 10px;
    // -webkit-box-sizing: content-box;
    // -moz-box-sizing: content-box;
    // box-sizing: content-box;
    // border: none;
    // font: normal 30px/normal "Chau Philomene One", Helvetica, sans-serif;
    // color: rgb(51, 51, 51);
    // text-align: center;
    // -o-text-overflow: clip;
    // text-overflow: clip;
    // letter-spacing: 3px;
    // text-shadow: -3px 0 1px rgb(30,242,241) , 3px 0 1px rgb(246,5,10) ;

}
</style>