// 微信分享SDK
export default {
    install: function (Vue,opt) {
        /**
         * weixinSDK
         * @param {Object}   a   分享内容
         * @param {Object}   b   签名算法
         */
        Vue.prototype.wxShare = function(a,b) {
            wx.config({
                debug: false, // 
                appId: a.appId, // 必填，公众号的唯一标识
                timestamp: a.timestamp, // 必填，生成签名的时间戳
                nonceStr: a.nonceStr, // 必填，生成签名的随机串
                signature: a.signature, // 必填，签名
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
            });
    
            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: b.title,
                    link: b.linkUrl,
                    desc: b.desc,
                    imgUrl: b.imgUrl,
                    success: function () {},
                });
    
                wx.onMenuShareAppMessage({
                    title: b.title,
                    desc: b.desc,
                    link: b.linkUrl,
                    imgUrl: b.imgUrl,
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {},
                    cancel: function () {}
                });
    
                wx.onMenuShareQQ({
                    title: b.title,
                    desc: b.desc,
                    link: b.linkUrl,
                    imgUrl: b.imgUrl,
                    success: function () {},
                    cancel: function () {}
                });
    
                wx.onMenuShareQZone({
                    title: b.title,
                    desc: b.desc,
                    link: b.linkUrl,
                    imgUrl: b.imgUrl,
                    success: function () {},
                    cancel: function () {}
                });
            })
        },
        // 是否在微信端
        Vue.prototype.isWeixin = function() {
            let ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                console.log('在微信端');
                this.isWx = true;
    
            } else {
                console.log('不在微信端');
                this.isWx = false;
    
            }
        },
        
        Vue.prototype.shareBug = function() {
            let url = location.href;
            url.includes('?from') && (window.location.href = location.href.split('?from')[0] )
        },

        Vue.prototype.hideMobile = function(num) {
            typeof num !== 'string' && (num = String(num));
            return num = num.substr(0, 3) + "****" + num.substr(7)
        }
        
    }
}
