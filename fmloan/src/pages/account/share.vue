<template>
    <div class="share">
        <main>
            <div class="share-user">
                <img src="../../assets/user.png" alt="">
                <p>您的账户：{{mobile}}</p>
            </div>
            <div class="myqr">
                <img :src = myQrCode alt="">
            </div>
        </main>
        
        <homo-foot isShow='0'></homo-foot>
    </div>
</template>

<script>
export default {
    name: 'share',
    data() {
        return {
            mobile: '',
            myQrCode: ''
        }
    },
    mounted() {},
    created() {
        this.getShare();
    },
    methods: {
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
                    console.log(data)
                    this.mobile = this.hideMobile(data.body.mobile);
                    this.myQrCode = data.body.myQrCode;
                }
            }).catch(err=>{
                this.$toast('请求失败')
            })
        },
        
        
    }
}
</script>

<style lang="scss" scoped>
    .share {
        @include mybody;
    }
    main {
        background: url(../../assets/share.png);
        @include backImg(100%,1066px);
    
    .share-user {
        width: 100%;
        height: 220px;
        @include myflex;
        justify-content: flex-start;
        img {
            width: 98px;
            height: 98px;
            border-radius: 40px;
            margin: 0 25px 0 50px ;
        }
        p {
            font-size: 30px;
            color: #fff;
        }
    }
    .myqr {
        margin:  0 auto;
        margin-top: 227px;
        text-align: center;

        img {
            width: 310px;
            height: 310px;
            
        }
    }
    }
</style>
