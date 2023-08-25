/**
 * 生成唯一 id 字符串的函数
 * ========================================================================
 * @method guid
 * @param {String} [prefix] - 生成 id 的前缀字符串
 * @return {String} 返回一个表示唯一 id 的字符串
 */
const guid = (() => {
  let id = 0

  return (prefix = 'guid-') => {
    id += 1

    return `${prefix + id}`
  }
})()

export default guid
