import isFunction from './types/isFunction'

const close = (id, beforeClose, instances) => {
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

export default close
