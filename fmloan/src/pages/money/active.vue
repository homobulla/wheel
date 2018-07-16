<template>
    <div class="active">
        <main>
            <div class="active-one">
                <div class="rules" @click="isRules = true"></div>
                <div class="btn" @click="isShare = true"></div>
            </div>
            <div class="active-two">

            </div>
            <div class="active-three">
                <div class="btn" @click="isShare = true"></div>
            </div>
        </main>
        <footer>
            <div class="foot-left">活动首页</div>
            <div class="foot-right" @click="goAccount">我的账户</div>
            
        </footer>
        <homo-pop  title='活动规则'  v-show="isRules" @hidePop =hidePop>
            <ul class="rule-li">
                <li>1、您邀请的好友必须通过您分享的邀请页面注册蜂投借款，首次通过蜂投借款线上APP内指定的借款产品完成借款，即可获得奖励；</li>
                <li>2、实时返利将在好友借款后，（借款到达好友银行卡账户日，就是说好友提现成功）次日，自动发放到您的账户中，最低提现金额为 100 元</li>
                <li>3、月度返利（当月累计邀请借款金额对应返利）于次月初统一发放。</li>
                <li>4、每次提现时，须将可提现金额全部提出，手续费不论提现金额大小，提现手续费 1元/笔。</li>
            </ul>
        </homo-pop>

        <homo-pop v-show="isShare" @hidePop=hidePop>
           <div class="share">
                <div>
                    <p class="share-title">点击右上角分享专属链接给好友</p>
                    <img :src=myQrCode alt="">
                    <p class="share-line"></p>
                    <p class="share-tip">或面对面邀请好友扫码</p>
                    <p class="share-tip">共赢现金</p>
                </div>
           </div>
        </homo-pop>
        <iframe src="https://tysrlogin.ftoul.com/p2p-front/secure/fedservlet" style="display:none"></iframe>
        
    </div>
</template>

<script>
export default {
    name: 'active',
    data() {
        return {
            isRules: '',
            isShare: '',
            myQrCode: '',
            local: '',
            phoneModel: '',
            ipAddress: ''
        }
    },
    created() {
        this.getQueryString('isLogin') == 1 || localStorage.getItem('token') ? this.login() : window.location.href = api.LOGIN;
        this.getIp();
        
    },
    mounted(){
        navigator.geolocation.getCurrentPosition(this.getSuccess, this.getError, {
            enableHighAccuracy: true,
            maximumAge: 0
        });
        var md = new MobileDetect(window.navigator.userAgent);
        this.phoneModel = md.phone()
    },
    methods: {
        getSuccess (position) {
            console.log(position)
            this.local = position.coords.latitude + ',' + position.coords.longitude
        },
        getError (error) {
            console.log(error)
        },
        hidePop () {
            this.isRules = 0;
            this.isShare = 0;
        },
        getIp() {
            this.$axios({
            url: api.LOCATION,
            method: 'get',
            data: {}

            }).then(ret =>{
                let made = ret.data.split('=')[1];
                let madea = `${made.split(';')[0]}`;
                var result = JSON.parse(madea);
                this.ipAddress = result.cip;
            })
        },
        login(){

            this.$axios({
                data: {
                    transcode: '1001',
                    body: {
                        'userType': '0',
                        'phone': '',
                        'pwd': '',
                        'ipAddress': this.ipAddress,
                        'p2pUid': '',
                        'local': this.local,
                        'phoneModel': this.phoneModel
                    },
                },
             
            }).then(res => {
                var data = res.data.data
                console.log(data)
                if (data.header.errCode == 0) {
                    
                    localStorage.setItem('icon', data.body.icon)
                    localStorage.setItem('uid', data.body.uid)
                    localStorage.setItem('token', data.body.token)
                    localStorage.setItem('phone', data.body.phone)
                    localStorage.setItem('p2pUid', data.body.p2pUid)
                    this.getShare();
                } else {
                }
            }).catch(error =>{
            
            })
        },
        getShare() {
            this.$axios({
                data: {
                    transcode: '1112',
                    body: {
                        'uid': localStorage.getItem('uid'),
                        'token': localStorage.getItem('token')
                    }    
                },
            }).then(res => {
                let data = res.data.data
                if (data.header.errCode == 0) {
                    this.mobile = this.hideMobile(data.body.mobile);
                    this.myQrCode = data.body.myQrCode;
                }
            })
        },
        
        goAccount() {
            this.$router.push('/account')
        }
       
    }
}
</script>

<style lang="scss" scoped>

    main {
        .active-one {
            position: relative;
            background: url(../../assets/active_02.png);
            @include backImg(100%,741px);

            .rules {
                position: absolute;
                right: 0;
                top: 38px;
                width: 167px;
                height: 53px;
            }

            .btn {
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -220px;
                width: 443px;
                height: 100px;   
            }
        }
        .active-two {
            background: url(../../assets/active_03.png);
            @include backImg(100%,1765px);
        }

        .active-three {
            position: relative;
            background: url(../../assets/active_04.png);
            @include backImg(100%,654px);

            .btn {
                position: absolute;
                bottom: 87px;
                left: 50%;
                margin-left: -220px;
                width: 443px;
                height: 100px;
                
            }
        }
    }
    footer {
        width: 100%;
        height: 108px;
        @include myflex;
        font-size: 36px;
        font-weight: bold;
        .foot-left{
            height: 108px;
            line-height: 108px;
            flex: 1;
            background: #f89641;
            color: #fff;
        }

        .foot-right{
            height: 108px;
            line-height: 108px;
            flex: 1;
            background: #fff;
            color: #f89641;
        }
    }
    .rule-li li{
        margin-top: 10px;
    }
    .share {
        @include myflex;

        .share-title {
            font-size: 32px;
            font-weight: bold;
            margin-top: 10px;
        }

        img {
            width: 303px;
            height: 303px;
            margin: 45px 0;
        }
        .share-tip {
            font-size: 28px;
            margin-bottom: 10px;
        }

        .share-line {
            width: 303px;
            height: 1Px;
            margin: 0 auto 30px auto;
            background: #eee;
        }
    }
    
</style>

