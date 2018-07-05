<template>
    <div class="myInvite">
        <div class="have-data" >
            <header>
                <ul class="myInvite-head" @click="select($event)">
                    <li class="myInvite-special ">成功注册</li>
                    <li>申请中</li>
                    <li>成功借款</li>
                </ul>
            </header>
            <main>
                    <div class="myInvite-list">
                        <p class="left">注册日期</p>
                        <p>好友手机号</p>
                        <p class="right">借款金额</p>
                    </div>
                    <ul class="myInvite-reg" v-show="text === '成功注册'">
                        <li class="left">2018-05-05</li>
                        <li>13584654545</li>
                        <li class="right">0</li>
                    </ul>
                    <ul class="myInvite-inving" v-show="text === '申请中'">
                        <li class="left">2018-05-05</li>
                        <li>13584654545</li>
                        <li class="right">3333</li>
                    </ul>
                    <ul class="myInvite-loan" v-show="text === '成功借款'">
                        <li class="left">2018-05-05</li>
                        <li>13584654545</li>
                        <li class="right">6666</li>
                    </ul>
                
                
            </main>
        </div>
        <div class="no-data">
            <div>
                <img src="../../assets/no-data.png" alt="">
                <p>当前还没有任何数据, 快去邀请吧~</p>
                <div class="invit-btn">立即邀请好友</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "myInvite",
  data() {
    return {
        text: '成功注册'
    };
  },
  methods: {
    siblings(elm) {
      var p = elm.parentNode.children;
      for (var i = 0, pl = p.length; i < pl; i++) {
        if (p[i] !== elm) {
          p[i].classList.remove("myInvite-special");
        }
      }
    },
    select(e) {
      if (e.srcElement.nodeName == "LI") {
            this.text = e.target.innerText;
            e.target.classList.add("myInvite-special");
            this.siblings(e.target);
      }
    }
  }
};

</script>

<style lang="scss" scoped>
   .myInvite {
       @include mybody;
    }
.myInvite-head {
  display: flex;
  align-items: center;
  font-size: 32px;
  background: #fff;
  li {
    padding: 24px 0;
    flex: 1;
    text-align: center;
  }

  .myInvite-special {
    color: #f74c4c;
    border-bottom: 1px solid #f74c4c;
  }
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
    height: 100px;
    box-sizing: border-box;
    padding: 0 30px;
    background: #fff;
    
     li {
        float: left;
        width: 33%;
        text-align: center;
        padding: 36px 0;
        font-size: 28px;
        border-bottom: 1px solid #eeeeee;
     }
  }

}
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
      }
  }
</style>
