import { isArray, isPrimitive, flattenArray } from './utils'
import vnode from './vnode'

const hasOwnProperty = Object.prototype.hasOwnProperty
const RESERVED_PROPS = {
  key: true,
  __self: true,
  __source: true
}

export default h

/**
 @param {object} 参数名 
 *
 @return {boolean} 返回值说明 如果参数的key不为undfined,则true,否则false
 */
function hasValidKey(config) {
  return config.key !== undefined
}

/**
 @param {type}     
 @param {config}    Object
 @param {children}  扩展运算符 剩余传入的所有参数
 *
 @return {boolean} 返回值说明 如果参数的key不为undfined,则true,否则false
 */
function h(type, config, ...children) {
  const props = {}

  let key = null

  // 获取 key，填充 props 对象
  if (config != null) {
    if (hasValidKey(config)) {
      key = '' + config.key
    }

    for (let propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS[propName]) {
        props[propName] = config[propName]
      }
    }
  }

  return vnode(
    type,
    key,
    props,
    flattenArray(children).map(c => {
      return isPrimitive(c) ? vnode(undefined, undefined, undefined, undefined, c) : c
    })
  )
}
