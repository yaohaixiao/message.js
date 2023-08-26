import isArray from '../types/isArray'
import isString from '../types/isString'
import isSVG from '../types/isSVG'
import setAttributes from '../dom/setAttributes'

/**
 * 创建 SVG 图标 DOM 元素
 * ========================================================================
 * @method createElement
 * @param {String} name
 * @param {Object} [options]
 * @param {Number|Array} [options.size]
 * @param {String} [options.color]
 * @param {String} [options.iconSet]
 * @param {Object} [options.attrs] - （可选）给创建的 icons 元素设置的 HTML 属性对象
 * @returns {HTMLElement}
 */
const createElement = (name, options = {}) => {
  const size = options.size || 0
  const color = options.color || ''
  const iconSet = options.iconSet || 'mjs'
  const width = isArray(size) ? size[0] : size
  const height = isArray(size) ? size[1] : size
  const defaultRules = size ? `width:${width}px;height:${height}px;` : ''
  const cssRules = color ? defaultRules + `color:${color}` : defaultRules
  const $icon = document.createElement('i')
  const attrs = options.attrs || {}
  let binds = ''
  let svg = ''
  let $svg

  if (!isString(name)) {
    return null
  }

  if (isSVG(name)) {
    svg = name
  } else {
    binds =
      iconSet && iconSet !== 'icon'
        ? `xlink:href="#${iconSet}-icon-${name}"`
        : `xlink:href="#icon-${name}"`
    svg =
      `<svg aria-hidden="true" class="mjs-icon__svg" style="${cssRules}">` +
      `<use ${binds}></use>` +
      `</svg>`
  }

  if (attrs.className) {
    attrs.className = 'mjs-icon ' + attrs.className
  } else {
    attrs.className = 'mjs-icon'
  }

  setAttributes($icon, attrs)
  $icon.innerHTML = svg

  if (isSVG(name)) {
    $svg = $icon.querySelector('svg')
    setAttributes($svg, {
      'aria-hidden': true,
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'mjs-icon__svg',
      width: 200,
      height: 200,
      style: cssRules
    })
  }

  return $icon
}

export default createElement
