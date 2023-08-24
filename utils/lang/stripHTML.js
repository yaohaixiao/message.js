/**
 * 移除字符串中的 HTML 代码
 * ====================================================
 * @param {String} str - 要处理的字符串
 * @returns {String}
 */
const stripHTML = (str) => {
  let pattern = /(<([^>]+)>)/ig

  return str.replace(pattern, '')
}

export default stripHTML
