<template>

    <div class="containe">
        <div class="logging animate__animated animate__backInDown">
            <h3 class='font animate__animated animate__backInDown'>Welcome To Nice Bank</h3>
            <el-input v-model="loginForm.username" type="text" placeholder="Username" data-space-bottom="0.5rem"
                class="input animate__animated animate__backInDown" />
            <br>
            <div class="passwordBox">
                <!-- <button @click="handlerEye" v-if="eyeOpen" class="zi zi_eye animate__animated animate__backInDown">
                </button>
                <button @click="handlerEye" v-if="eyeClose" class="zi zi_eyeslash animate__animated animate__backInDown">
                </button> -->
                <el-input v-model="loginForm.password" type="password" placeholder="Password" data-space-bottom="0.5rem"
                    class="input animate__animated animate__backInDown" />
            </div>
            <br>
            <el-button type="primary" @click="handleLogin" class="button animate__animated animate__backInDown">
                Login
            </el-button>
            <br>
            <el-button @click="removeCookie" class="button animate__animated animate__backInDown">Clear</el-button>
            <p v-if="mistakeMsg" class="mistake">帳號密碼錯誤，您是 <a href="" class="forget"> 忘記</a> 還是害怕想起來</p>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                token: ''
            },
            mistakeMsg: false,
            eyeOpen: true,
            eyeClose: false
        }
    },
    name: '',
    methods: {
        handlerEye() {
            if (this.eyeOpen == true) {
                this.eyeOpen = false;
                this.eyeClose = true;
            } else {
                this.eyeOpen = true;
                this.eyeClose = false;
            }
        },
        removeCookie() {
            this.loginForm.username = '';
            this.loginForm.password = '';
        },
        handleLogin() {
            if (this.loginForm.username != 'steven') {
                Swal.fire({
                    title: '帳號密碼錯誤',
                    type: 'question',
                    showCancelButton: true,
                    icon: 'warning',
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    showCloseButton: true,
                    html:
                        '<a href="//sweetalert2.github.io" class="forget">忘記密碼</a> '
                });
                this.mistakeMsg = true

            } else {

                this.$router.push({ name: "orderList" })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.containe {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    background-position: center center;
    background-size: cover;
    //background-image: url(https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
    background-image: url(https://images.unsplash.com/photo-1607944024060-0450380ddd33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80);
}

.containe .logging {
    height: 50%;
    backdrop-filter: blur(15px) !important;
}

.logging {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.passwordBox {
    width: 30%;
    position: relative;
}

.zi_eye {
    position: absolute;
    z-index: 9999999999999999999;
    right: 15px;
    top: 9px;
    cursor: pointer;
    // background-color: transparent;
    // border: none;
}

.zi_eyeslash {
    position: absolute;
    z-index: 99999999999999999999999;
    right: 15px;
    top: 9px;
    cursor: pointer;
    // background-color: transparent;
    // border: none;
}



.passwordBox .input {
    width: 100%;
}

.input {
    width: 30%;
}

.button {
    width: 30%;
}

.font {
    color: #ffffff;
    font-size: 3rem;
    text-align: center;
}

.mistake {
    color: rgb(170, 26, 26);
    font-size: 16px;
}

.forget {
    color: #4091ff;
}
</style>