<template>
    <div class="cumulative">
        <main v-if="hasData == 1">
            <div class="myInvite-list">
                <p class="left">注册日期</p>
                <p>好友手机号</p>
                <p class="right">借款金额</p>
            </div>
            <ul class="myInvite-reg" v-for="i in list" :key="i.mobile">
                <li class="left">{{i.inviteTime}}</li>
                <li>{{i.mobile}}</li>
                <li class="right">{{i.loanAmount}}</li>
            </ul>
        </main>
        <div class="no-data" v-else-if="hasData == 2">
            <div>
                <img src="../../assets/no-data.png" alt="">
                <p>当前还没有任何数据, 快去邀请吧~</p>
                <div class="invit-btn" @click="$router.push('/active')">立即邀请好友</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cumulative',
    data() {
        return {
            list: [],
            hasData: '0'
        }
    },
    created(){
        this.getInviteLIst();
    },
    methods: {
        getInviteLIst(){
            this.$axios({
                data: {
                    transcode: '1115',
                    body: {
                        'uid': localStorage.getItem('uid'),
                        'token': localStorage.getItem('token'),
                        "pageNum": 1,
                        "pageSize": 100
                    }    
                },
            }).then(res => {
                let data = res.data.data
                if (data.header.errCode == 0) {
                    this.hasData = 1;
                    this.list = data.body.inviteUserList
                    this.list.forEach(i=>{
                        i.inviteTime = i.inviteTime.substring(0,10);
                    })
                } else if (data.header.errCode == 'C0112') {
                    this.hasData = 2;
                } else {
                    this.$toast(data.header.errMsg)
                }
            }).catch(err=>{
                this.$toast('请求失败')
            })
        }
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

