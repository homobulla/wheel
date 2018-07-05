<template>
    <div class="cumulative">
         <main>
                    <div class="myInvite-list">
                        <p class="left">注册日期</p>
                        <p>好友手机号</p>
                        <p class="right">借款金额</p>
                    </div>
                    <ul class="myInvite-reg" >
                        <li class="left">2018-05-05</li>
                        <li>13584654545</li>
                        <li class="right">0</li>
                         <li class="left">2018-05-05</li>
                        <li>13584654545</li>
                        <li class="right">0</li>
                         <li class="left">2018-05-05</li>
                        <li>13584654545</li>
                        <li class="right">0</li>
                    </ul>
                 
                
                
            </main>
    </div>
</template>

<script>
export default {
    name: 'cumulative',
    data() {
        return {
        
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
 .cumulative {
       @include mybody;
    }
main {

  .myInvite-list {
    height: 88px;
    line-height: 88px;
    font-size: 28px;
    color: #999999;
    box-sizing: border-box;
    padding: 0 30px;
    p {
      float: left;
      width: 33%;
      text-align: center;
    }
  }

  ul {
    overflow: hidden;
    background: #fff;
    
     li {
        float: left;
        width: 33%;
        text-align: center;
        padding: 36px 30px;
        box-sizing: border-box;
        font-size: 28px;
        border-bottom: 1px solid #eeeeee;
     }
  }

  

}
  .no-data {
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
      }
  }
</style>

