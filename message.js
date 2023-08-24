import isString from './utils/types/isString'
import isObject from './utils/types/isObject'
import hasOwn from './utils/lang/hasOwn'
import extend from './utils/lang/extend'
import stripScripts from './utils/lang/stripScripts'
import encodeHTML from './utils/lang/encodeHTML'
import createElement from './utils/dom/createElement'
import addClass from './utils/dom/addClass'
import icon from './utils/icons/icon'
import later from '@/utils/lang/later'
import isFunction from '@/utils/types/isFunction'

class Message {
  constructor(options) {
    this.attrs = {}
    this.id = 0
    this.closed = true
    this.$el = null
    this.timer = null

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    this.attr(options).render().addListeners()
    return this
  }

  attr(prop, value) {
    const attrs = this.attrs

    if (isString(prop)) {
      // 只能扩展 attrs 中已有的属性
      if (value && hasOwn(attrs, prop)) {
        // 更新单个配置信息
        attrs[prop] = value
        return this
      }

      // 只传递 prop 参数，则返回对应的属性值
      return attrs[prop]
    } else if (isObject(prop)) {
      // 批量更新配置信息
      extend(attrs, prop)

      return this
    } else if (arguments.length === 0) {
      // 不传递参数，直接返回整个
      return attrs
    }

    return this
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  startTimer(duration) {
    this.timer = later(() => {
      this.close()
    }, duration * 1000)
  }

  render() {
    const type = this.attr('type')
    const message = this.attr('message')
    const effect = this.attr('effect')
    const round = this.attr('round')
    const offset = this.attr('offset')
    const closable = this.attr('closable')
    const visible = this.attr('visible')
    const dangerouslyUseHTMLString = this.attr('dangerouslyUseHTMLString')
    const customClass = this.attr('customClass')
    const iconName = effect === 'light' ? `circle-${type}` : type
    const top = visible ? offset : -50
    const cssRules = `top:${top}px;`
    const className = [
      'mjs-message',
      `mjs-message_${type}`,
      `mjs-message_${effect}`
    ]
    const children = []
    let iconSize = round ? 20 : 16
    let $type
    let $message
    let $text
    let $close
    let $el

    if(round) {
      className.push('mjs-message_round')

      if (effect === 'default') {
        iconSize = 12
      }
    }

    if(!closable) {
      className.push('mjs-message_full-width')
    }

    if(visible) {
      className.push('mjs-message_visible')
    }

    if(customClass) {
      className.push(customClass)
    }

    if(effect !== 'plain') {
      $type = icon(iconName, {
        size: iconSize
      })
      addClass($type, 'mjs-message__icon')
      children.push($type)
    }

    if(!dangerouslyUseHTMLString){
      $text = document.createTextNode(encodeHTML(stripScripts(message)))
    } else {
      $text = document.createDocumentFragment()
      $text.innerHTML = message
    }
    $message = createElement('p', {
      className: 'mjs-message__content'
    }, [$text])
    children.push($message)

    if(closable) {
      $close = icon('close', { size: 18 })
      addClass($type, 'mjs-message__close')
      children.push($close)
    }

    $el = createElement('div', {
      className: className.join(' ')
    }, children)
    $el.style.cssText = cssRules
    this.$el = $el

    document.body.appendChild(this.$el)

    return this
  }

  open() {
    const duration = this.attr('duration')

    this.clearTimer()

    later(() => {
      this.closed = false
      this.visible = true

      if (duration > 0) {
        this.startTimer(duration)
      }
    }, 100)
  }

  close() {
    const beforeClose = this.attr('beforeClose')

    this.closed = true

    if (isFunction(beforeClose)) {
      beforeClose(this)
    }

    this.visible = false

    later(() => {
      this.remove()
    }, 500)
  }

  remove() {
    this.destroy()
  }

  destroy() {
    this.removeListeners()
    document.body.removeChild(this.$el)

    return this
  }

  reload(options) {
    this.destroy().initialize(this.attr(options))
    return this
  }

  onMouseEnter() {
    this.clearTimer()
  }

  onMouseLeave() {
    const duration = this.attr('duration')
    const delay = this.attr('delay')

    if (duration <= 0) {
      return false
    }

    this.startTimer(delay)
  }

  onClose() {
    this.clearTimer()
    this.close()
  }

  addListeners() {
    return this
  }

  removeListeners() {
    return this
  }
}

Message.DEFAULTS = {
  type: 'info',
  effect: 'default',
  offset: 30,
  duration: 6,
  delay: 2,
  message: '',
  customClass: '',
  round: false,
  closable: true,
  visible: false,
  dangerouslyUseHTMLString: false,
  beforeClose: null
}

export default Message
