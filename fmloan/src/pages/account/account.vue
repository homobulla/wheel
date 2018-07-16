<template>
    <div class="account">
        <header>
            <ul>
                <li><img src="../../assets/error.png" alt=""></li>
                <li>{{mobile}},</li>
                <li class="account-out" @click="loginOut">退出</li>
                <li class="account-withdraw" @click="history">提现记录</li>
            </ul>
           <p>可提现金额 (元)</p>
           <p class="account-money">{{balance}}</p>
           <div class="account-ask" @click="withdrawToDo">申请提现</div>
        </header>
        <main>
            <ul class="account-data">
                <li @click="$router.push({path:'/getMoneyRecord',query:{money:totalAmount}})">
                    <span>累计赚取(元)</span>
                    <span>{{totalAmount}} <i></i></span>
                </li>
                <li @click="$router.push('/cumulative')">
                    <span>累计邀请(人)</span>
                    <span>{{inviteCount}} <i></i></span>
                </li>
            </ul>
        </main>
        <homo-pop v-show=isPop1 :title=title popBtn=true @hidePop=hidePop>
            <div>
                当前账户未绑定取现银行卡，是否绑定？
            </div>
        </homo-pop>
        <homo-pop v-show=isPop2 :title=title @hidePop=hidePop>
            <div>
                您的账户可提现余额不足<span style="color:red;">100</span> 元，暂不可进行提现操作，继续邀请更多好友借款赢取现金吧！
            </div>
        </homo-pop>
        <homo-pop v-show=isPop3 :title=title @hidePop=hidePop>
            <div class="withdraw">
               <p>提现到银行卡</p>
               <p class="withdraw-bank">
                   <img :src=body.bankPhoto alt="">
                   <b>{{body.bankName}}</b>
                   <span>({{body.cardId}})</span>
                </p>
               <p class="withdraw-money">
                   <span>￥</span>
                   <input type="number" placeholder="请输入金额" v-model="withdraw.TransAmt">
                </p>
                <p class="withdraw-all">当前账户可提现余额:<span>{{totalAmount}}元</span></p>
                <div class="withdraw-btn" @click="openAccount(2)">提现</div>
                <p class="withdraw-last">提现金额预计三小时内到账</p>
            </div>
        </homo-pop>
        <form id="open" name="myform" method='post' :action="formAction" onsubmit="return checkUser();">
            <input v-for="(value,key) in open" type="hidden"  :name="key" :value="value" :key="value"/>
        </form>
        <!-- <iframe src="https://tysrlogin.ftoul.com/p2p-front/secure/fedservlet"></iframe> -->
        <form id="withdraw" name="myform" method='post' :action="formAction" onsubmit="return checkUser();">
            <input v-for="(value,key) in withdraw" type="hidden" :name="key" :value="value" :key="value" />
        </form>
    </div>
</template>

<script>
export default {
    name: 'account',
    data() {
        return {
            isPop1: '',
            isPop2: '',
            isPop3: '',
            title: '提示',
            mobile: '',
            balance: '0',
            totalAmount: '0',
            inviteCount: '0',
            body: '' ,// 理财用户信息
            open: { 
                CmdId: "create_account_p",
                roleType: 1
               
            },
            withdraw: {
                CmdId: "withdraw_p",
                TransAmt: ''
            },
            formAction: ''

        }
    },
    created() {
        this.mobile = this.hideMobile(localStorage.getItem('phone'))
        this.getAccount();
        this.formAction = api.OPEN;
        
    },
    mounted(){
        this.getLiCai();
    },
    methods: {
        history() {
            this.$router.push('./getMoneyRecord');
        },
        loginOut(){
            document.cookie = '';
            localStorage.removeItem('icon');
            localStorage.removeItem('phone');
            localStorage.removeItem('token');
            localStorage.removeItem('p2pUid');
            localStorage.removeItem('uid');
            window.location.href = api.LOGINOUT;
        },
        getAccount() {
            this.$axios({
                data: {
                    transcode: '1113',
                    body: {
                        'uid': localStorage.getItem('uid'),
                        'token': localStorage.getItem('token')
                    },     
                },
            }).then(res => {
                var data = res.data.data
                if (data.header.errCode == 0) {
                    this.mobile = this.hideMobile(data.body.mobile);
                    this.balance = data.body.balance;
                    this.totalAmount = data.body.totalAmount;
                    this.inviteCount = data.body.inviteCount;
                } else {
                    this.$toast(data.header.errMsg)
                }
            }).catch(err=>{
                this.$toast('请求失败')
            })
        },

        getLiCai(){
            this.$axios({
                urlType: 1,
                url:  'getSRUserAccountInfo',
            }).then(res => {
                var data = res.data
                if(data.errCode == 0) {
                    this.body = data.body;
                    this.body.cardId = this.body.cardId.substr(-4)
                }
            }).catch(err=>{
                this.$toast('请求失败')
            })
        },
        openAccount(num){
            if(num == 1) {
                document.getElementById("open").submit()
            } else if (num == 2) {
                document.getElementById("withdraw").submit()
            }
            
        },  
      
        withdrawToDo() {
            if(this.balance < 100) {
                this.isPop2 = 1;
                return;
            }
            //开户了
            if (this.body.ipsAccuntNo != 0 && this.body.bankId != 0 && this.body.ipsAccuntNo != '')  {
               this.isPop3 = 1;
                // 未开户
            } else if (this.body.ipsAccuntNo == 0 || this.body.ipsAccuntNo == ''){
                
                this.openAccount(1);
            }
        },
        hidePop () {
            this.isPop1 = 0;
            this.isPop2 = 0;
            this.isPop3 = 0;
        },
    },

}
</script>

<style lang="scss" scoped>
.account{
    width: 100%;
    height: 100%;
    background: $backgroundColor;

    header {
        position: relative;
        @include boxSizing(30px);
        padding: 40px 0 1px 0;
        background: #fff;
        ul {
            display: flex;
            align-items: center;
            font-size: 28px;

            img {
                width: 50px;
                height: 50px;
                border-radius: 25px;
                margin: 20px;
            }
            .account-out {
                color: $baseColor;
                margin-left: 30px;
                
            }
            .account-withdraw {
                position: absolute;
                right: 30px;
                color: #7a97f5;
            }

        }
        p {
            font-size: 28px;
            text-align: center;
            margin: 80px 0 20px 0;
        }
        .account-money {
            font-size: 60px;
            font-weight: bold;
            margin: 0;
        }
        .account-ask {
            @include mybtn(360px);
        }
    }

    main{
        margin-top: 20px;
        li {
            height: 105px;
            font-size: 32px;
            font-weight: bold;
            background: #fff;
            border-bottom:  1px solid #eee;
            @include myflex;
            @include boxSizing(30px);
            justify-content: space-between;

            i {
                display: inline-block;
                margin-left: 20px;
                background: url(../../assets/go.png);
                @include backImg(14px,25px);
            }
        }
    }
    .withdraw {
        .withdraw-bank {
            @include myflex;
            justify-content: flex-start;
            padding: 15px 0;
            img {
                width: 45px;
            }
            b {
                padding: 0 12px;
            }
            span {
                font-weight: 700;
            }
        }
        .withdraw-money {
            @include myflex;
            justify-content: flex-start;
            padding: 25px 0 15px 0;
            border-bottom: 1px solid #eee;

            input {
                font-size: 36px;
            }
        }
        .withdraw-all {
            font-size: 24px;
            padding-top: 10px;

            span {
                font-weight: 600;
            }
        }
        .withdraw-btn {
            @include mybtn(100%);
            margin: 40px 0 10px 0;
            height: 80px;
            line-height: 80px;
        }
        .withdraw-last {
            font-size: 24px;
            text-align: center;
        }
    }
}
</style>
