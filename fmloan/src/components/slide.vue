<template>
    <div class="slide">
        <div id="captcha" ></div>
    </div>
</template>

<script>

export default {
    name: '',
    props: {
        fun: {
            typeof: Function,
            default: ''
        },
        name: {
            typeof: String,
            default: ''
        }
    },
    mounted() {
       this.init();
    },
    methods: {
        init() {
            let _this = this;
            initNECaptcha({
                captchaId: "67c38dd53ef841ec9de41ad7433a917d",
                element: "#captcha",
                mode: "float",
                width: "100%",
                onVerify: function(err, ret) {
                    console.log(_this.name)
                    if (!err) {
                        if(!(/^1\d{10}$/.test(_this.name))){
                            _this.$toast('手机号格式有误！');
                            _this.init();
                            return false;
                    }
                    _this.fun();
                }
            },
            function(instance) {
                // 初始化成功后得到验证实例instance，可以调用实例的方法
                console.log('初始化成功')
            },
            function(err) {
                // 初始化失败后触发该函数，err对象描述当前错误信息
                console.log("初始化失败");
            }
          

            })
        },

    }
};
</script>

<style >
#captcha {
  width: 100%;
  height: 90px;
}
</style>
