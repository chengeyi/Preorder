<template>
    
    <div class="containe">
        <div class="logging animate__animated animate__backInDown">
            <h3 class='font animate__animated animate__backInDown'>welcome Nice Bank</h3>
            <el-input v-model="loginForm.username" type="text" placeholder="Username" data-space-bottom="0.5rem" class="input animate__animated animate__backInDown"/>
            <br>
            <el-input v-model="loginForm.password" type="password" placeholder="Password" data-space-bottom="0.5rem"  class="input animate__animated animate__backInDown"/>
            <br>
            <el-button type="primary" @click="handleLogin" class="button animate__animated animate__backInDown">
                Login
            </el-button>
            <br>
            <el-button @click="removeCookie" class="button animate__animated animate__backInDown">Clear</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                token: ''
            }
        }
    },
    name: '',
    methods: {
        removeCookie(){
            this.loginForm.username = '';
            this.loginForm.password = '';
        },
        handleLogin(){
            console.log('in')
            this.$router.push({ name: "orderList"})
        }
    }
}
</script>

<style lang="less" scoped>
    .containe{
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        background-position: center center;
        background-size: cover;
        //background-image: url(https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
        background-image: url(https://images.unsplash.com/photo-1607944024060-0450380ddd33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80);
    }
    .containe .logging{
        height: 50%;
        backdrop-filter: blur(15px)!important;
    }
    .logging{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .input{
        width: 30%;
    }
    .button{
        width: 30%; 
    }

    .font{
        color: #ffffff;
        font-size: 50px;
    }
</style>