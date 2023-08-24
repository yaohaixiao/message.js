import DEFAULTS from './defaults'
import SYMBOLS from './symbols'

/**
 * (重置)清理图标集，恢复到默认图标集
 * =============================================================
 * @method clear
 */
const clear = () => {
  const $icons = document.querySelector('#ijs-icons')

  if ($icons) {
    $icons.parentNode.removeChild($icons)
  }

  SYMBOLS.length = 0
  DEFAULTS.forEach((symbol) => {
    SYMBOLS.push(symbol)
  })
}

export default clear
