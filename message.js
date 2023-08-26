import isString from './utils/types/isString'
import isObject from './utils/types/isObject'
import isFunction from './utils/types/isFunction'
import hasOwn from './utils/lang/hasOwn'
import extend from './utils/lang/extend'
import later from './utils/lang/later'
import stripScripts from './utils/lang/stripScripts'
import encodeHTML from './utils/lang/encodeHTML'
import cloneDeep from './utils/lang/cloneDeep'
import guid from './utils/lang/guid'
import createElement from './utils/dom/createElement'
import addClass from './utils/dom/addClass'
import removeClass from './utils/dom/removeClass'
import icon from './utils/icons/icon'
import paint from './utils/icons/paint'
import on from './utils/event/on'
import off from './utils/event/off'

const TYPES = ['info', 'success', 'warning', 'error']
const instances = []
let instance

paint()

class Message {
  constructor(options) {
    this.attrs = cloneDeep(Message.DEFAULTS)

    this.id = ''
    this.closed = false
    this.visible = false
    this.offset = -50
    this.timer = null
    this.$el = null

    if (options) {
      this.initialize(options)
    }
  }

  initialize(options) {
    this.attr(options)
    this.id = this.attr('id')
    this.offset = this.attr('offset') || -50

    this.render().addListeners()

    if (this.attr('visible')) {
      this.open()
    }

    return this
  }

  /**
   *
   * @param {String|Object} [prop]
   * @param {*} [value]
   * @return {*|{}|Message}
   */
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

  isClosed() {
    return this.closed
  }

  render() {
    const type = this.attr('type')
    const message = this.attr('message')
    const effect = this.attr('effect')
    const round = this.attr('round')
    const closable = this.attr('closable')
    const visible = this.attr('visible')
    const dangerouslyUseHTMLString = this.attr('dangerouslyUseHTMLString')
    const customClass = this.attr('customClass')
    const iconName = effect === 'light' ? `circle-${type}` : type
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

    if (round) {
      className.push('mjs-message_round')

      if (effect === 'default') {
        iconSize = 12
      }
    }

    if (!closable) {
      className.push('mjs-message_full-width')
    }

    if (visible) {
      className.push('mjs-message_visible')
    }

    if (customClass) {
      className.push(customClass)
    }

    if (effect !== 'plain') {
      $type = icon(iconName, {
        iconSet: 'mjs',
        size: iconSize
      })
      addClass($type, 'mjs-message__icon')
      children.push($type)
    }

    if (!dangerouslyUseHTMLString) {
      $text = document.createTextNode(encodeHTML(stripScripts(message)))
    } else {
      $text = document.createDocumentFragment()
      $text.innerHTML = message
    }
    $message = createElement(
      'p',
      {
        className: 'mjs-message__content'
      },
      [$text]
    )
    children.push($message)

    if (closable) {
      $close = icon('close', {
        iconSet: 'mjs',
        size: 18
      })
      addClass($close, 'mjs-message__close')
      children.push($close)
    }

    $el = createElement(
      'div',
      {
        className: className.join(' ')
      },
      children
    )
    $el.style.cssText = `top:-50px;`
    this.$el = $el

    document.body.appendChild(this.$el)

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

  open() {
    const $el = this.$el
    const offset = this.attr('offset')
    const duration = this.attr('duration')
    const top = offset && offset >= this.offset ? offset : this.offset
    const cssRules = `top:${top}px;`

    this.clearTimer()

    later(() => {
      this.visible = true

      addClass($el, 'mjs-message_visible')
      $el.style.cssText = cssRules

      if (duration > 0) {
        this.startTimer(duration)
      }
    }, 100)
  }

  close() {
    const $el = this.$el
    const beforeClose = this.attr('beforeClose')
    const cssRules = `top:-50px;`

    if (isFunction(beforeClose)) {
      beforeClose(this)
    }

    $el.style.cssText = cssRules
    removeClass($el, 'mjs-message_visible')

    this.visible = false
    this.closed = true

    later(() => {
      this.destroy()
    }, 500)

    return this
  }

  destroy() {
    this.removeListeners()
    document.body.removeChild(this.$el)

    this.attr(Message.DEFAULTS)
    this.id = ''
    this.closed = true
    this.visible = false
    this.offset = -50
    this.timer = null
    this.$el = null

    return this
  }

  reload(options) {
    this.destroy().initialize(this.attr(options))
    return this
  }

  onMouseEnter() {
    this.clearTimer()
    return this
  }

  onMouseLeave() {
    const duration = this.attr('duration')
    const delay = this.attr('delay')

    if (duration <= 0) {
      return false
    }

    this.startTimer(delay)

    return this
  }

  onClose() {
    this.clearTimer()
    this.close()
    return this
  }

  addListeners() {
    const $el = this.$el

    on(
      $el,
      '.mjs-message__content',
      'mouseenter',
      this.onMouseEnter,
      this,
      true
    )
    on(
      $el,
      '.mjs-message__content',
      'mouseleave',
      this.onMouseLeave,
      this,
      true
    )
    on($el, '.mjs-message__close', 'click', this.onClose, this, true)

    return this
  }

  removeListeners() {
    const $el = this.$el

    off($el, 'mouseenter', this.onMouseEnter)
    off($el, 'mouseleave', this.onMouseLeave)
    off($el, 'click', this.onClose)

    return this
  }
}

Message.DEFAULTS = {
  id: '',
  type: 'info',
  effect: 'default',
  round: false,
  offset: 30,
  duration: 6,
  delay: 2,
  message: '',
  customClass: '',
  closable: true,
  visible: true,
  dangerouslyUseHTMLString: false,
  beforeClose: null
}

TYPES.forEach((type) => {
  Message[type] = (options) => {
    const id = guid(`mjs-message-`)
    const beforeClose = options.beforeClose
    let offset = options.offset || 30

    options = options || {}

    if (isString(options)) {
      options = {
        message: options
      }
    }
    options.id = id
    options.type = type
    options.offset = offset
    options.visible = false
    options.beforeClose = () => {
      Message.close(id, beforeClose, instances)
    }

    instance = new Message(options)

    instances.forEach((item) => {
      offset += item.$el.offsetHeight + 16
    })
    instance.offset = offset
    instance.open()
    instances.push(instance)

    return instance
  }
})

// 关闭指定 id 消息的静态方法
Message.close = (id, beforeClose) => {
  const len = instances.length
  let index = -1
  let i
  let offsetHeight

  instances.forEach((instance, i) => {
    // 在 instances 中通过 id 找到要关闭的消息
    if (id === instance.id) {
      offsetHeight = instance.$el.offsetHeight
      index = i

      // 关闭消息
      if (isFunction(beforeClose)) {
        beforeClose(instance)
      }

      instances.splice(i, 1)
    }
  })

  if (len <= 1 || index === -1 || index > instances.length - 1) {
    return false
  }

  i = index

  // 界面中的消息逐个向上收起
  for (; i < len - 1; i += 1) {
    const dom = instances[i].$el

    dom.style['top'] = parseInt(dom.style['top'], 10) - offsetHeight - 16 + 'px'
  }
}

// 关闭所有消息的静态方法
Message.clear = () => {
  let i = instances.length - 1
  for (; i >= 0; i--) {
    instances[i].close()
  }
}

export default Message
