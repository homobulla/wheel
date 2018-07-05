import toast from './toast.vue'
const Toast = {
  install: function(Vue, options = {}) {
    const ToastController = Vue.extend(toast)
    // 实现toast的关闭方法
    ;(ToastController.prototype.close = function() {
      this.visiable = false
      // 从dom树上删除toast节点，其实从优化角度考虑，最好是先判断有没有toast节点，第二次toast时直接修改文字，减少DOM操作
      var parent = document.getElementsByTagName('body')[0]
      var child = document.getElementById('toast')
      parent.removeChild(child)
    }),
      (Vue.prototype.$toast = (option = {}) => {
        // toast实例挂载到刚创建的div
        var instance = new ToastController().$mount(document.createElement('div'))
        // 显示时间默认2s,message无默认
        let duration = option.duration || options.duration || 2000
        instance.message = typeof option === 'string' ? option : option.message
        // 将toast的DOM挂载到body上
        document.body.appendChild(instance.$el)

        // 自动关闭功能的实现
        setTimeout(function() {
          instance.close()
        }, duration)
      })
  }
}
export default Toast
