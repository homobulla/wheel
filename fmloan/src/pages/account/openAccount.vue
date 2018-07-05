<template>
    <div class="openAccount">
        <div class="main">
            <h1>请绑定本人的储蓄卡，目前仅支持绑定一张卡</h1>
            <ul class="yhxx">
                <li><h1>姓名，核实后不可修改</h1><input type="text" name="" placeholder="请输入开户姓名" v-model="name"></li>
                <li><h1>身份证</h1><input type="text" name="" placeholder="请输入身份证号" v-model="idCard"></li>
                <li><h1>本人银行卡卡号</h1><input type="number" name="" placeholder="请输入银行卡号" v-model="bankNum"></li>
                <li class="group" @click="sup" id="cBank"><span v-if="$route.query.bankName">{{$route.query.bankName}}</span><span v-else>请选择银行</span><img src="../../assets/arrl.png" alt="" class="enter"></li>
                <li><input type="text" name="" placeholder="请输入开户支行，开户支行(例：井湾子支行)" v-model="bankBranch"></li>
                
              
            </ul>
            <ul class="yhxx">
                
                <li><h1>银行预留手机号</h1><input type="number" name="" placeholder="请输入银行预留手机号" v-model="phone"></li>
                <li>
                    <h1>验证码</h1>
                    <input type="number" name="" placeholder="请输入验证码" v-model="code">
                    <input type="button" class="hqyz" @click="getSms($event)" ref="Code" value="获取验证码">
                </li>
         
            </ul>
            <p class="ts">手机号和银行卡预留手机号必须一致</p>
            <div class="submit" @click="sub">绑定</div>
        </div>  
    </div>
</template>

<script>

export default {
    name: 'openAccount',
    data () {
        return {
            SRUserAccountInfo: {},
            title:'开通银行存管账户',
            step: 1,
            rbtnshowf: true,
            rbutton:'支持银行',
            rbtnlink:'',
            name: '',
            idCard: '',
            bankAbbr: '',
            password: '',
            token: '',
            bank: '',
            bankNum: '',
            bankBranch: '',
            kqCallBack: {},
            phone: '',
            code: ''
        }
    },
   
    methods:{
        sup () {
            this.$router.push('/openBank');
        },
        getCode(e){
            var nums = 120;
            e.target.disabled = true; 
            e.target.value = nums+'秒后可重新获取';
            var clock = setInterval(function(){
                nums--;
                if(nums > 0){
                    e.target.value = nums+'秒后可重新获取';
                }else{
                    clearInterval(clock);
                    e.target.disabled = false;
                    e.target.value = '点击发送验证码';
                    nums = 120; 
                }
            }, 1000);
        },
        getSms (e) {
          
        },
        checkCard () {
            this.$http({
                urlType: 1,
                url: api.apiHost_v1 + "bill99/checkCard",
                data: qs.stringify({
                    mobile: this.phone,
                    idNumber: this.idCard,
                    realityName: this.name,
                    bankCardNo: this.bankNum,
                    bankBranch: this.bankBranch,
                    bankAbbr: this.$route.query.bankName,
                    password: this.password,
                    token: this.kqCallBack.token,
                    validCode: this.code,
                    orderNo: this.kqCallBack.externalRefNumber
                }),
                loading: true
            }).then(res => {
                if (res.data.code == 0) {
                    if (this.SRUserAccountInfo.ipsAccuntNo == '' || this.SRUserAccountInfo.ipsAccuntNo == 0 || this.SRUserAccountInfo.ipsAccuntNo == undefined) {
                        this.$router.push('/personCenter')
                        this.$util.openFrame({
                            name: "sumb",
                            type: "Jushi",
                            Param: {
                                CmdId: 'create_account_p',
                                realityName: this.name,
                                idNumber: this.idCard,
                                bankCardNo: this.bankNum,
                                roleType: '1'
                            }
                        })
                    } else {
                        this.$toast('开户成功')
                        this.$router.push('/personCenter')
                    }
                } else {
                    this.$toast(res.data.msg)
                }
            })
        },
        sub0 () {
            if(this.phone == ''){
                this.$toast('请填写手机号');
                return false;
            }
            if(this.name == ''){
                this.$toast('请填写开户姓名');
                return false;
            }
            if(this.idCard == ''){
                this.$toast('请填写身份证');
                return false;
            }
            if(this.bankNum == ''){
                this.$toast('请填写银行卡号');
                return false;
            }
            this.getSms()
        },
        sub(){
            if(this.phone == ''){
                this.$toast('请填写手机号');
                return false;
            }
            if(this.name == ''){
                this.$toast('请填写开户姓名');
                return false;
            }
            if(this.idCard == ''){
                this.$toast('请填写身份证');
                return false;
            }
            if(this.bankNum == ''){
                this.$toast('请填写银行卡号');
                return false;
            }
            if (!this.$route.query.bankName) {
                this.$toast('请选择银行');
                return false;
            }
            if(this.name == ''){
                this.$toast('请填写开户姓名');
                return false;
            }
            if(this.idCard == ''){
                this.$toast('请填写身份证');
                return false;
            }
            if(this.bankNum == ''){
                this.$toast('请填写银行卡号');
                return false;
            }
            if(this.bankBranch == ''){
                this.$toast('请选择开户行');
                return false;
            }
            if(this.phone == ''){
                this.$toast('请填写手机号');
                return false;
            }
            if(this.code == ''){
                this.$toast('请填写验证码');
                return false;
            }
            this.checkCard()
        }
    },

   
  }
</script>

<style scoped>
.openAccount{
    position: absolute;
    width: 100%;
    top: 0px;
    background-color: #f5f5f5;
}

.submit{
    width: 92%;
    margin: 60px auto;
    text-align: center;
    background-color: #f74c4c;
    height: 100px;
    line-height: 100px;
    font-size: 36px;
    color: #fff;
    font-family: "pingf-bold";
    border: none;
    border-radius: 50px;
    box-shadow: 0 4px 29px rgba(247,76,76,0.5);/*no*/
}
.main>h1{
    padding: 45px 0;
    text-align: center;
    font-size: 30px;
    color: #f74c4c;
    font-family: "pingf-regular";
}
.main>p.ts{
    font-size: 26px;
    color: #666;
    margin-top: 35px;
    width: 96%;
    margin-left: 4%;
}
.yhxx{
    background-color: #fff;
    margin-bottom: 20px;
}
.yhxx li{
    width: 92%;
    margin: 0 4%;
    padding: 35px 0;
    border-bottom: 1px solid #e4e4e4; /*no*/
    position: relative;
}
.yhxx li:last-child{
    border-bottom: none;
}
.yhxx li h1{
    font-family: 'pingf-regular';
    font-size: 30px;
    color: #999;
    font-weight: normal;
    margin-bottom: 36px;
}

.yhxx li input[type='text'],.yhxx li input[type='number'],.yhxx li input[type='password']{
    width: 100%;
    color: #333;
    display: block;
    background-color: #fff;
    font-size: 30px;
    font-family: "pingf-bold";
    border: none;
}
::-webkit-input-placeholder {
    color: #ccc;
}
.yhxx  .group{
    font-size: 30px;
    color: #333;
    border: none;
    border-bottom: 1px solid #e4e4e4; /*no*/
}
.yhxx li select option{
    width: 100%;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    padding: 35px 0;
    font-size: 28px;
    color: #333;
}
.yhxx li img.enter{
    width: 12px;
    position: absolute;
    right: 30px;
    top: 45px;
}
.hqyz{
    border: none;
    background-color: #fff;
    font-size: 30px;
    font-family: "pingf-bold";
    color: #f75a5a;
    position: absolute;
    right: 30px;
    bottom: 35px;
}
</style>
