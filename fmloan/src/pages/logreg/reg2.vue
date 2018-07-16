<template>
    <div class="reg2">
        <div class="main">
            <header>
                <p class="reg-tip">已发送验证码至</p>
                <p class="reg-phone">+86 {{phone}}</p>
                <p class="reg-btn" @click="getCode(1)" id="homo-btn">58秒后,重新发送</p>
            </header>
            <section>
                <div>
                    <div class="login">
                        <img class="login-left" src="../../assets/code.png" alt="">
                        <input type="number" placeholder="请输入验证码" v-model="login.code">
                    </div>

                    <div class="login">	
                        <img class="login-left" src="../../assets/pwd.png" alt="">
                        <input type="password" placeholder="请输入密码"  v-model="login.password">
                        <p   @click="changeStatu">
                            <img class="login-right" src="../../assets/unsee.png" alt="" v-show="logoStatus">
                            <img class="login-right" src="../../assets/see.png" alt="" v-show="!logoStatus">
                        </p>	    
                    </div>
                    <div class="login-error">
                        <span>请输入6-12位数字/字母/数字字母组合</span>
                    </div>
                    <p class="btn-tip">
                        <span class="agree" @click="agr"><i class="no" v-if="agree == 1"></i><i class="yes" v-if="agree == 2"></i>注册即代表您已阅读并同意</span>
                        <span class="xieyi" @click="goAgree">《蜂投网用户注册协议》</span> 
                    </p>
                </div>
                <div class="login-btn" :class="{'Style':isActive}" @click="reg">注册</div>
                <p class="reg-upper" @click="$router.push('/')">上一步</p>
            </section>
            <div class="pop" v-show="isPop">
                <img src="../../assets/suce_03.png" alt="">
            </div>
        </div>
       <homo-foot isShow='0'></homo-foot>
    </div>
</template>

<script>
export default {
    name: "reg2",
    data() {
        return {
            phone: '',
            num: '',
            login: {
                code:'',
                password: ''
            },
            isActive: '',
            logoStatus: '',
            isregister: '',
            agree: 2,
            isPop: ''
        };
    },
    watch: {
        login: {
            handler() {
                if (this.login.code && this.login.password) {
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
    created() {
        this.num = this.$route.query.phone
        this.phone = this.hideMobile(this.$route.query.phone)  
    },
    mounted() {
        this.getCode() 
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

        reg() {
            if(!this.login.code || !this.login.password) {
                return;
            }
            this.$axios({
                data: {
                    transcode: '1002',
                    body: {
                        'phone': this.num,
                        'pwd': this.login.password,
                        'changeFlag': '0',
                        'code': this.login.code,
                        'channelFlag': 'FTJK'
                    }
                },
            }).then(res => {
                var data = res.data.data
                if (data.header.errCode == 0) {
                    this.isPop = 1
                    localStorage.setItem('uid', data.body.uid)
                    localStorage.setItem('token', data.body.token)
                    localStorage.setItem('phone', data.body.phone)
                    localStorage.setItem('icon', data.body.icon)
                    localStorage.setItem('p2pUid', data.body.p2pUid)
                   
                } else {
                    this.$toast(data.header.errMsg)
                }
            }).catch(err=>{
                this.$toast('请求失败')
            })
        },
        
        getCode (e) {
            let nums = 60,
                btn = document.getElementById('homo-btn');

            if(e == 1) {
                if (btn.innerHTML != '重新发送') {
                    return;
                }
            }
            btn.innerHTML = nums+'秒后可重新获取'
            var clock = setInterval(function () {
                nums--
                if (nums > 0) {
                    btn.innerHTML = nums + '秒后可重新获取'
                } else {
                    clearInterval(clock)
                    btn.innerHTML = '重新发送'
                    nums = 60
                }
            }, 1000)

            if (e == 1) {
                this.$axios({
                    data: {
                        transcode: '9801',
                        body: {
                            "phone": this.num,
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
                }).catch(err=>{
                this.$toast('请求失败')
            })
            }
        }
    }
};
</script>

<style lang="scss" scoped >
.main {
    width: 100%;
    box-sizing: border-box;
    padding: 40px 36px 0 36px;
}
.reg-tip {
  font-size: 30px;
  color: #666;
  margin: 0 0 10px;
}
.reg-phone {
  font-size: 48px;
  font-weight: bold;
}
.reg-btn {
  font-size: 24px;
  color: #f74c4c;
}

section {
  margin-top: 60px;
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
  font-size: 36px;
}
.login-right {
  position: absolute;
  right: 0;
  width: 38px;
  height: 23px;
}

.login-error span {
    color: #b3b3b3;
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

.reg-upper {
    text-align: center;
    color: #f74c4c;
    font-size: 30px;

}

.pop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($color: #000000, $alpha: .6);

    img {
        width: 466px;
        height: 466px;
    }
}
</style>
