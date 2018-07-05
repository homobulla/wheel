<template>
    <div class="foot">
        <footer>      
            <p class="down-app" v-show="isShow == 1" @click="downloadApp">下载蜂投借款APP</p>
            <p>©2016-2018 深圳前海大众互联网金融服务有限公司版权所有</p>
            <p>粤ICP备 15002745号-1</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'foot',
    data() {
        return {
            isAndroid: '',
            isiOS: ''
        }
    },
    props: {
        isShow:{
            typeof: String,
            default: 1
        }
    },
    created(){
        this.equipment();
    },
    methods: {
        equipment() {
            let u = navigator.userAgent;
            this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        },
        downloadApp() {
            if(this.isAndroid) {
                window.location.href = api.android;
            } else if (this.isiOS) {
                window.location.href = api.ios;
            }
        }
    }
}
</script>

<style scoped>
.foot {
    position: fixed;
    bottom: 40px;
    width: 100%;
}
footer p{
    width: 100%;
    text-align: center;
    font-size: 20px;
}

.down-app {
    color: #2197f3;
    font-size: 24px;
    margin: 60px 0 30px 0;
}

@media (max-height: 500px) {
        .foot {
            display: none;
        }
    }
</style>
