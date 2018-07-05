<template>
    <div class="activeReg">
        <header></header>
         <section>
            <div>
                <div class="login">
                    <img class="login-left" src="../../assets/code.png" alt="">
                    <input type="number" placeholder="请输入手机号码" v-model="login.phone">
                </div>

                <div class="login">	
                    <img class="login-left" src="../../assets/pwd.png" alt="">
                    <input type="password" placeholder="设置密码"  v-model="login.password">
                    <p @click="changeStatu">
                        <img class="login-right" src="../../assets/unsee.png" alt="" v-show="logoStatus">
                        <img class="login-right" src="../../assets/see.png" alt="" v-show="!logoStatus">
                    </p>
                </div>
                 <div class="login-error">
                    <span>请输入6-12位数字/字母/数字字母组合</span>
                </div>
                <homo-slide :fun="suc" :name=login.phone></homo-slide>
                
                <div class="login">
                    <img class="login-left" src="../../assets/code.png" alt="">
                    <input type="number" placeholder="验证码" v-model="code">
                    <p>
                        <span class="login-right-span" id="homo-btn" @click="getCode">发送验证码</span>
                    </p>
                </div>

                <p class="btn-tip">
                    <span class="agree" @click="agr"><i class="no" v-if="agree == 1"></i><i class="yes" v-if="agree == 2"></i>注册即代表您已阅读并同意</span>
                    <span class="xieyi" @click="goAgree">《注册服务协议》</span> 
                </p>
                <div class="reg-btn" @click="register">注册</div>
            </div>
        </section>
        <div class="why"></div>
        <footer>
            <p>©2016-2018 深圳前海大众互联网金融服务有限公司版权所有</p>
            <p>粤ICP备 15002745号-1</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'activeReg',
    data() {
        return {
            login: {
                phone: '',
                password: ''
            },
            code: '',
            isActive: '',
            logoStatus: '',
            agree: 2,
            slide: ''
        };
    },
    watch: {
    
    },
    methods: {
        agr(){
            this.agree == 1 ? this.agree = 2 : this.agree = 1; 
        },
        
        goAgree(){
            window.location.href = api.agree;
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

        suc() {
            this.slide = 1;
        },

        getCode () {
            let nums = 60,
                btn = document.getElementById('homo-btn');

            if (btn.innerHTML != '发送验证码') {
                return;
            }
            if(!this.login.phone || !(/^1\d{10}$/.test(this.login.phone))) {
                this.$toast('手机号格式不正确')
                return;
            }
            btn.innerHTML = nums+'s'
            var clock = setInterval(function () {
                nums--
                if (nums > 0) {
                    btn.innerHTML = nums + 's'
                } else {
                    clearInterval(clock)
                    btn.innerHTML = '发送验证码'
                    nums = 60
                }
            }, 1000)

            this.$axios({
                data: {
                    transcode: '9801',
                    body: {
                        "phone": this.login.phone,
                        "codeType": 0,
                        "userType": '0'
                    }
                }
            }).then(res => {
                var data = res.data.data
                if (data.header.errCode != 0) {
                    this.$toast(data.header.errMsg)
                } else {
                    this.$toast('验证码发送成功！')
                }
            })
        },

        register() {
            if(!this.login.phone || !this.login.password) {
                return;
            }
            if(!this.slide) {
                this.$toast('请向右滑动滑块验证');
                return;
            }
            
            this.$axios({
                data: {
                    transcode: '1002',
                    body: {
                        'phone': this.login.phone,
                        'pwd': this.login.password,
                        'changeFlag': '0',
                        'code': this.code,
                        'channelFlag': ''
                    }
                },
            }).then(res => {
                var data = res.data.data
                if (data.header.errCode == 0) {
                    this.$toast('注册成功！')
                    localStorage.setItem('uid', data.body.uid)
                    localStorage.setItem('token', data.body.token)
                    localStorage.setItem('phone', data.body.phone)
                    localStorage.setItem('icon', data.body.icon)
                    localStorage.setItem('p2pUid', data.body.p2pUid)
                   
                } else {
                    this.$toast(data.header.errMsg)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .activeReg {
        background: url(../../assets/regBg.png) no-repeat;
        @include backImg(100%,2447px);
    }
    header {
        @include backImg(100%,642px);
    }
    section {
        @include boxSizing(80px);

        .login {
            position: relative;
            width: 100%;
            height: 90px;
            line-height: 90px;
            margin-top: 40px;
            border: none;
            border-radius: 10px;
            background: #fff;
            border-bottom: 1px solid #e4e4e4;
            @include boxSizing(20px);
            @include myflex;
            
            .login-left {
                width: 36px;
                height: 40px;
                margin-right: 40px;
            }
            input {
                height: 90%;
                border: 0;
                outline: 0;
                font-size: 36px;
            }
            .login-right {
                position: absolute;
                right: 20px;
                width: 38px;
                height: 23px;
            }
            .login-right-span {
                position: absolute;
                right: 20px;
                top: 9px;
                color: $baseColor;
            }
        }
    .login-error span {
        display: block;
        color: #b3b3b3;
        margin: 10px 0 40px 0;
    }
    .btn-tip {
        margin-top: 25px;
        font-size: 24px;
        color: #666;
        display: flex;
        align-items: center;
    }
    .btn-tip i {
        position: relative;
        top: 5px;
        display: inline-block;
        width: 27px;
        height: 28px;
        margin-right: 8px;
        background: url(../../assets/agree_03.png);
        background-size: 100% 100%;
    }
    .btn-tip .yes {
        background: url(../../assets/agree_06.png);
        background-size: 100% 100%;
    }
    .xieyi {
        color: #000;
    }
    .reg-btn {
        @include mybtn(100%);
        margin-top: 40px;
    }
    
}
.why {
        //background: url(../../assets/reg_06.png) no-repeat;
        @include backImg(100%,898px);
    }
footer{
    position: relative;
    top: -30px;
    p{
        width: 100%;
        text-align: center;
        font-size: 20px;
    }
}
</style>
