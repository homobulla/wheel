<template>
    <div id='getMoneyRecord'>
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
          title: "实时返利",
          detail:"fdsafads"
        },
       {
          title: "实时返利",
          detail:"fdsafads"
        },
      
      ]
    };
  }
};
</script>


<style scoped>

.item{ 
  /* height: 160px; */
  padding-bottom: 30px;
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
