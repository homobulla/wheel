<template>
    <div id="toast" :class="{'hidden': !visiable}">
        <div class="main">
            <div>
                {{message}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'toast',
    data(){
        return {
            message: '',
           
        }
    },
    props:{
        visiable: {
            typeof: Boolean,
            default: true
        }  
    },

    methods:{

    }
}
</script>

<style lang="scss" scoped>
    #toast {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        @include myflex;
        .main {
            background: #999;
            padding: 20px 40px;
            border-radius: 10px;
            color: #fff;
            font-size: 30px;
        }
       
    }
    
    .hidden {
        transform: scale(0);
        transition: 0.3s;
    }
</style>
