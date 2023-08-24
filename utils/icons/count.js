import getSymbols from './getSymbols'

/**
 * 获取图标集图标数量
 * =============================================================
 * @method count
 * @return {number}
 */
const count = () => {
  return getSymbols().length
}

export default count
