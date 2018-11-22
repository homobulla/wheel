const errorMsg = {
    name: '用户名',
    passwd: '密码',
    moblie: '手机号码',
    email: '邮箱地址'
}
const vali = validator({}, validators, errorMsg)
let registerForm = document.querySelector('#registerForm')
registerForm.addEventListener(
    'submit',
    function() {
        let validatorNext = function*() {
            yield (vali.name = registerForm.userName.value)
            yield (vali.passwd = registerForm.passWord.value)
            yield (vali.moblie = registerForm.phoneNumber.value)
            yield (vali.email = registerForm.emailAddress.value)
        }
        let validator = validatorNext()
        validator.next()
        !vali.name || validator.next() //上一步的校验通过才执行下一步
        !vali.passwd || validator.next()
        !vali.moblie || validator.next()
    },
    false
)
