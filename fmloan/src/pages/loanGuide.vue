<template>
    <div id='loanGuide'>
        <header></header>
        <div class="itemList">
          <div class="item" v-for="(item) in listArr" :key="item.name" >  
            <p class="item-title">{{item.title}}</p>
            <p>{{item.detail}}</p>
          </div>
         </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      listArr: [
        {
          title: "如何使用蜂眸邀请好友借款？",
          detail:
            "邀请好友借款详解xxxxxx邀请好友借款详解xxxxxx邀请好友借款详解xxxxxx邀请好友借款详解xxxxxx"
        },
        {
          title: "怎样申请借款？",
          detail:
            "邀请好友借款详解xxxxxx邀请好友借款详解xxxxxx邀请好友借款详解xxxxxx邀请好友借款详解xxxxxx"
        },
        {
          title: "申请流程？",
          detail:
            "邀请好友借款详解xxxxxx邀请好友借款详解xxxxxx邀请好友借款详解xxxxxx邀请好友借款详解xxxxxx"
        }
      ]
    };
  }
};
</script>
<style scoped>
header {
  width: 100%;
  height: 320px;
  background: url(../assets/about.png);
  background-size: 100% 100%;
}
.item{ 
  height: 160px;
  margin: 30px 30px 30px 30px;
  border-bottom: 1px solid #eeeeee; /*下边框线*/
  font-size: 24px;
  color: #666666;
}
.item-title {
  color: #333333;
  padding-bottom: 20px;
  font-size: 32px;
}
</style>
