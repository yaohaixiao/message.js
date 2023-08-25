import Vue from 'vue'
import MjsMessage from './src/Message'

import guid from '../utils/lang/guid'
import isString from '../utils/types/isString'
import isVNode from '../utils/types/isVNode'
import close from '../utils/close'
import clear from '../utils/clear'
import TYPES from '../utils/enum'

const MessageConstructor = Vue.extend(MjsMessage)

let instances = []
let instance

const Message = function (options) {
  let beforeClose = options.beforeClose
  let id = guid('mjs-message-')
  let offset = options.offset || 30

  options = options || {}

  if (isString(options)) {
    options = {
      message: options
    }
  }
  options.id = id

  options.beforeClose = function () {
    Message.close(id, beforeClose, instances)
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
Message.close = close

// 关闭所有消息的静态方法
Message.clear = clear

export default Message
