<template>
    <div class="pop" v-show="show" @touchmove.prevent>
        <div class="pop-cont">
            <div class="pop-head">
                {{title}}
                <img src="../assets/cha.png" alt="" @click="hidePop">
            </div>
            <div class="pop-my">
                <slot>
            
                </slot>
            </div>
            <div class="pop-btn" v-show="popBtn">
                <div class="btn-left" @click="hidePop">取消</div>
                <div class="btn-right" @click="bingBank">立即绑定</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pop',
    data() {
       return {
           isPop: true
       } 
    },
    props: {
        title: {
            typeof: String,
            default: '提示'
        },
        show: {
            typeof: Boolean,
            default: false
        },
        // content: {
        //     typeof: String,
        //     default: '内容'
        // },
        popBtn: {
            typeof: Boolean,
            default: false
        }
        
    },
  
    methods: {
        hidePop() {
             this.$emit('hidePop');
           
        },
        bingBank() {
            this.$router.push('/openAccount')
        }
    }
}
</script>

<style lang="scss" scoped>

    .pop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, .6);

        .pop-cont {
            width: 500px;
            border-radius: 10px;
            background: #fff;

            .pop-head {
                @include boxSizing(40px);
                @include myflex;
                justify-content: space-between;
                font-size: 36px;
                height: 95px;
                font-weight: bold;
                border-bottom: 1px solid #eee;

                img {
                    width: 28px;
                    float: right;
                }
            }

            .pop-my {
                margin: 50px 0;
                font-size: 28px;
                @include boxSizing(40px);
            }

            .pop-btn {
                @include myflex;
                border-top: 1px solid $baseColor;

                 div {
                     flex: 1;
                     height: 76px;
                     line-height: 76px;
                     font-size: 30px;
                     font-weight: bold;
                 }
                 .btn-left {
                     color: $baseColor;
                 }
                 .btn-right {
                     background: $baseColor;
                     color: #fff;
                 }
            }
        }

    }
</style>
