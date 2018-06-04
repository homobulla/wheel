// 首先需要定义一个virtual dom,virtual dom是将DOM的主要属性抽象出来的js对象，形式如下

let vNode = {
    type, // String，DOM 节点的类型，如 'div'/'span'
    data, // Object，包括 props，style等等 DOM 节点的各种属性
    children // Array，子节点（子 vnode）
  }

const VNODE_TYPE = Symbol('virtual-dom');   // symbol 保证DOM 唯一性

/**
 * 生成 vnode
 * @param  {String} type     类型，如 'div'
 * @param  {String} key      key   帮助检测是否一致性
 * @param  {Object} data     data，包括属性，事件等等
 * @param  {Array} children 子 vnode
 * @param  {String} text     文本
 * @param  {Element} elm      对应的 dom
 * @return {Object}          vnode
 */

function vnode(type, key, data, children, text, elm){
    const ele = {
        _type: VNODE_TYPE,
        type, key, data, children, text, elm    // es6 解构赋值
    }

    return ele
}

/**
 * 校验是不是 vnode，主要检查 __type。
 * @param  {Object}  vnode 要检查的对象
 * @return {Boolean}       是则 true，否则 false
 */
function isVnode(vnode) {
    return vnode && vnode.__type === VNODE_TYPE
}

  /**
   * 
   * @param {object} oldVnode  //前一个node
   * @param {object} vnode     //后一个node
   * @return {Boolean}     是则 true, 否则 false.
   */
function isSameVnode(oldVnode, vnode) {
    return oldVnode.key === vnode.key && oldVnode.type === vnode.type
}
