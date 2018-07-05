<template>
    <div class="account">
        <header>
            <ul>
                <li><img src="../../assets/error.png" alt=""></li>
                <li>{{mobile}},</li>
                <li class="account-out">退出</li>
                <li class="account-withdraw" @click="history">提现记录</li>
            </ul>
           <p>可提现金额 (元)</p>
           <p class="account-money">{{balance}}</p>
           <div class="account-ask" @click="withdraw">申请提现</div>
        </header>
        <main>
            <ul class="account-data">
                <li @click="$router.push('/getMoneyRecord')">
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
    </div>
</template>

<script>
export default {
    name: 'account',
    data() {
        return {
            isPop1: '',
            isPop2: '',
            title: '提示',
            mobile: '',
            balance: '0',
            totalAmount: '0',
            inviteCount: '0'

        }
    },
    methods: {
        history() {
            this.$router.push('./getMoneyRecord');
        },
        
        getAccount() {

            this.$axios({
                data: {
                    transcode: '1113',
                    body: {
                        'uid': localStorage.getItem('uid'),
                        'token': localStorage.getItem('token')
                    }
                    
                },
             
            }).then(res => {
                var data = res.data.data
                if (data.header.errCode == 0) {
                    this.mobile = this.hideMobile(data.body.mobile);
                    this.balance = data.body.balance;
                    this.totalAmount = data.body.totalAmount;
                    this.inviteCount = data.body.inviteCount;
                }
            })
        },

        withdraw() {
            if(this.balance < 100) {
                this.isPop2 = 1;
            }
        },
        hidePop () {
            this.isPop1 = 0;
            this.isPop2 = 0;
        },
    },
    created() {
      
        
        this.getAccount();
        
        //this.isPop = true;
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
}
</style>
