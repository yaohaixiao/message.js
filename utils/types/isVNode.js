import hasOwn from '../lang/hasOwn'
import isObject from './isObject'

/**
 * 判断是否未 VNode 对象
 * =============================================================
 * @method isVNode
 * @param {Object} node - 要检测的数据
 * @returns {Boolean} 'val' 是 VNode 类型，返回 true，否则返回 false
 */
const isVNode = (node) => {
  return node !== null && isObject(node) && hasOwn(node, 'componentOptions')
}

export default isVNode
