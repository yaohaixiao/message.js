import Vue from 'vue'
import MjsMessage from './src/Message'

import isFunction from '../utils/types/isFunction'
import isString from '../utils/types/isString'
import isVNode from '../utils/types/isVNode'

const TYPES = ['success', 'warning', 'info', 'error']
const MessageConstructor = Vue.extend(MjsMessage)

let instances = []
let seed = 1
let instance

const Message = function (options) {
  let beforeClose = options.beforeClose
  let id = 'message_' + seed++
  let offset = options.offset || 30

  options = options || {}
  options.id = id

  if (isString(options)) {
    options = {
      message: options
    }
  }

  options.beforeClose = function () {
    Message.close(id, beforeClose)
  }

  instance = new MessageConstructor({
    data: options
  })

  // 如果时
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message]
    instance.message = null
  }

  instance.$mount()
  instances.forEach((item) => {
    offset += item.$el.offsetHeight + 16
  })
  instance.offset = offset
  instance.open()
  instances.push(instance)

  return instance
}

// 创建 info、warning、success 和 error 中 4 个静态方法
// 分辨用于显示 4 中类型的消息提示
TYPES.forEach((type) => {
  Message[type] = (options) => {
    if (isString(options)) {
      options = {
        message: options
      }
    }

    options.type = type

    return Message(options)
  }
})

// 关闭指定 id 消息的静态方法
Message.close = (id, beforeClose) => {
  let len = instances.length
  let index = -1
  let removedHeight

  instances.forEach((instance, i) => {
    // 在 instances 中通过 id 找到要关闭的消息
    if (id === instance.id) {
      removedHeight = instance.$el.offsetHeight
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

  // 界面中的消息逐个向上收起
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el

    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
  }
}

// 关闭所有消息的静态方法
Message.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default Message
