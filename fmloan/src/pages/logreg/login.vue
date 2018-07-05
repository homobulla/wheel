<template>
    <div id="login">
        <header></header>
        <section>
            <div>
                <div class="login">
                    <img class="login-left" src="../../assets/phone.png" alt="">
                    <input type="number" placeholder="请输入手机号码" v-model="login.phone">
                </div>

                <div class="login">	
                    <img class="login-left" src="../../assets/pwd.png" alt="">
                    <input type="password" placeholder="请输入登录密码"  v-model="login.password">
                    <p   @click="changeStatu">
                        <img class="login-right" src="../../assets/unsee.png" alt="" v-show="logoStatus">
                        <img class="login-right" src="../../assets/see.png" alt="" v-show="!logoStatus">   
                    </p>	    
                </div>
                <div class="login-error" v-if="loginError">
                    <img src="../../assets/error.png" alt="">
                    <span>账号或密码不正确</span>
                </div>

                <div class="login-btn" :class="{'Style':isActive}" @click="logins">登录</div>
                <p class="register">还未注册账户？<a style="color: #2197f3;" @click="$router.push('/')">立即注册</a></p>
                <!-- <iframe id="login" scrolling="auto" frameborder="0" src="http://tylogin.ftoul.com/p2p-front/secure/fedservlet" style="width:100%;height:100%;"></iframe> -->
            </div>
        </section>
        <homo-foot></homo-foot>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            login: {
                phone: '',
                password: '',
            },
          
            isActive: '',
            logoStatus: '',
            loginError: '',
            local: '',
            ipAddress: '',
            phoneModel: ''

        };
    },
    created() {
        this.getIp();
    },
    mounted () { 
        var md = new MobileDetect(window.navigator.userAgent);
        this.phoneModel = md.phone()
    },
    watch: {
        login: {
            handler() {
                if (this.login.phone && this.login.password) {
                    this.isActive = true;
                    this.isregister = true;
                } else {
                    this.isActive = false;
                    this.isregister = false;
                }
            },
            deep: true
        }
    },
    methods: {
        getIp() {
            this.$axios({
            url: 'https://pv.sohu.com/cityjson?ie=utf-8',
            method: 'get',
            data: {}

            }).then(ret =>{
                let made = ret.data.split('=')[1];
                let madea = `${made.split(';')[0]}`;
                console.log(JSON.parse(madea))
                var result = JSON.parse(madea);
                this.local = result.cname;
                this.ipAddress = result.cip;
            })
        },
        changeStatu() {
            let Hinput = document.getElementsByTagName("input")[1];
            this.logoStatus = !this.logoStatus;
            if (this.logoStatus) {
                Hinput.type = "password";
            } else {
                Hinput.type = "text";
            }
        },
        reg() {
            this.$router.push({path:'/'})
        },
        logins() {
            this.$axios({
                data: {
                    transcode: '1001',
                    body: {
                        'userType': '0',
                        'phone': '15575144373',
                        'pwd': '111111',
                        'ipAddress': this.ipAddress,
                        //'p2pUid': '493575',
                        // 'phone': this.login.phone,
                        // 'pwd': this.login.password,
                        'local': this.local,
                        'phoneModel': this.phoneModel
                    }
                },
             
            }).then(res => {
                var data = res.data.data
                if (data.header.errCode == 0) {
                    this.loginError = 0;
                    localStorage.setItem('icon', data.body.icon)
                    localStorage.setItem('uid', data.body.uid)
                    localStorage.setItem('token', data.body.token)
                    localStorage.setItem('phone', data.body.phone)
                    localStorage.setItem('p2pUid', data.body.p2pUid)
                    this.$router.push('/')
                } else {
                    this.loginError = 1;
                }
            })
        }
    }
};
</script>

<style scoped>
#login {
    width: 100%;
    height: 100%;
    background: #fff;
}
header {
  width: 100%;
  height: 391px;
  background: url(../../assets/login-banner.png);
  background-size: 100% 100%;
}

section {
  width: 100%;
  box-sizing: border-box;
  padding: 30px 50px;
}

.login {
  position: relative;
  width: 100%;
  height: 110px;
  line-height: 110px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #e4e4e4;
}

.login-left {
  width: 36px;
  height: 40px;
  margin-right: 40px;
}
input {
  height: 90%;
  border: 0;
  outline: 0;
  font-size: 30px;
}
.login-right {
  position: absolute;
  right: 0;
  width: 38px;
  height: 23px;
}

.login-error {
  display: flex;
  align-items: center;
  color: #e73737;
}

.login-error img {
  width: 24px;
  margin-right: 20px;
}

.login-btn {
  margin: 80px auto;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border-radius: 50px;
  background-color: #ccc;
  box-shadow: 0 4px 29px rgba(204, 204, 204, 0.5); /*no*/
  border: none;
  font-size: 36px;
  color: #fff;
}
.Style {
  background-color: #f74c4c;
}

.register { 
    width: 100%;
    bottom: 0.773333rem;
    text-align: center;
    color: #333;
    font-size: 0.4rem;
    margin: 0;
    padding: 0;
}


</style>
