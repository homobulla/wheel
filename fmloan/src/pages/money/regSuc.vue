<template>
    <div class="regSuc">
        <div class="no-data">
            <div>
                <img src="../../assets/no-data.png" alt="">
                <p>恭喜您，注册成功！</p>
                <div class="invit-btn"  @click="openApp">立即打开蜂投借款</div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'regSuc',
    data() {
        return {
            isAndroid: '',
            isiOS: ''
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
        openApp() {
            if(this.isAndroid) {
                window.location.href = api.android;
            } else if (this.isiOS) {
                window.location.href = api.ios;
            }
        }

    }
}
</script>

<style lang="scss" scoped>
 .no-data {
      width: 100%;
      @include myflex;
      img {
          width: 144px;
          height: 196px;
          margin: 208px 0 30px 0;
      }
      p {
          font-size: 32px;
      }
      .invit-btn {
            @include mybtn(510px);

            a {
                color: #fff;
            }
      }
  }
</style>

