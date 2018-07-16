<template>
    <div id='getMoneyRecord'>
        <div class="itemList">
            <div class="item" v-for="(item,key) in list" :key="item.name" >
                <div class="item-data">{{key}}</div>
                <div  v-for= "o in item" :key="o.name">
                    <div class="itme-cont">
                        <div>
                            <p class="item-title">{{o.rebateName}}</p>
                            <p class="item-ll">{{o.inviteTime}}</p>
                        </div>
                        <div class="itme-money">{{o.amount}}</div>
                    </div>  
                </div>
            </div>   
         </div>
         <footer>
             累计总金额：<span>{{$route.query.money}}</span>元
         </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: {}
        }
    },
    created(){
        this.getInviteLIst();
    },
    methods:{
        getInviteLIst(){
            this.$axios({
                data: {
                    transcode: '1114',
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
                    this.list = this.changeArr(data.body.totalAmountList);
                    this.hasData = 1;
                } else if (data.header.errCode == 'C0112') {
                    this.hasData = 0;
                } else {
                    this.$toast(data.header.errMsg)
                }
            }).catch(err=>{
                this.$toast('请求失败')
            })
        },
        changeArr(arr){
            var obj = {};
            arr.forEach(i => {
                if (!obj[i.inviteTime.substring(0, 7)]) {
                    obj[i.inviteTime.substring(0, 7)] = [i.inviteTime.substring(0, 7)];
                }
            });
            arr.forEach(i => {
                if (i.inviteTime.substring(0, 7) == obj[i.inviteTime.substring(0, 7)][0]) {
                    obj[i.inviteTime.substring(0, 7)].push(i);
                }
            });
            for ( let i in obj) {
                obj[i].shift();
            }
            return obj
        }
    }
};
</script>

<style lang="scss" scoped>
#getMoneyRecord {
    width: 100%;
    min-height: 100%;
    background: #f5f6f7;
}
.item{ 

  .item-data {
      @include boxSizing(30px);
      color: #b3b3b3;
      font-size: 28px;
      height: 60px;
      line-height: 60px;
      background: #f5f6f7;
  }
  .itme-cont {
      @include boxSizing(30px);
      @include myflex;
      justify-content:space-between;
      height: 130px;
      background: #fff;
    .item-title {
        font-size: 30px;
        padding-bottom: 10px;
        font-weight: 500;
        text-align: left;
    }
    .item-ll {
        font-size: 24px;
        color: #b6b6b6;
    }
    .itme-money {
        font-size: 48px;
        font-weight: 500;
        
    }

  } 

}
    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 99px;
        line-height: 99px;
        padding-left: 30px;
        font-size: 32px;
        background: #fff;

        span {
            color: $baseColor;
            margin: 0 10px;
        }
    }
</style>
