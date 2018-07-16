<template>
    <div class="register">
        <header>
            广告预留位置
        </header>
        <section>
            <div class="login">
                <img class="login-left" src="../../assets/phone.png" alt="">
                <input type="number" placeholder="请输入手机号码" v-model="phone">
                <span class="login-right">+86</span>
            </div>

            <homo-slide :fun="suc" :name=phone></homo-slide>
        </section>
    </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            phone: '13575796946',
        }
     
    },
    created () {
    },
    methods: {
        suc() {
            this.$axios({
                data: {
                    transcode: '9801',
                    body: {
                        "phone": this.phone,
                        "codeType": 0,
                        "userType": '0'
                    }
                }
            }).then(res => {
                var data = res.data.data
                if (data.header.errCode != 0) {
                    this.$toast(data.header.errMsg)
                    this.init();     
                    
                } else {
                    this.$router.push({name: 'reg2', query: {phone: this.phone}})
                }
            })
        },
        init() {
            let _this = this;
            initNECaptcha({
                captchaId: "67c38dd53ef841ec9de41ad7433a917d",
                element: "#captcha",
                mode: "float",
                width: "100%",
                onVerify: function(err, ret) {
                  
                    if (!err) {
                        if(!(/^1\d{10}$/.test(_this.phone))){
                            _this.$toast('手机号格式有误！');
                            _this.init();
                            return false;
                    }
                    _this.suc();
                }
            },
            function(instance) {
                // 初始化成功后得到验证实例instance，可以调用实例的方法
                console.log('初始化成功')
            },
            function(err) {
                // 初始化失败后触发该函数，err对象描述当前错误信息
                console.log("初始化失败");
            }
          

            })
        },
       
    }
};
</script>

<style scoped>
.register {
    width: 100%;
    height: 100%;background: #fff;
}
header {
  width: 100%;
  height: 300px;
}
section {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 50px;
}

.login {
  position: relative;
  width: 100%;
  height: 110px;
  line-height: 110px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 80px;
  border: none;
  border-bottom: 1px solid #e4e4e4;
}

.login input{
    caret-color:red;
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
}

.login-right {
  position: absolute;
  right: 40px;
  font-size: 36px;
  font-weight: bold;
}

.login-right::after {
  content: "";
  position: absolute;
  top: 50px;
  width: 0;
  height: 0;
  margin: 0 10px;
  border-top: 10px solid black;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
}
</style>
