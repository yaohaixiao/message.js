import Outline from '@yaohaixiao/outline.js/outline'
import Message from '../../message'

const defaults = Outline.DEFAULTS

defaults.parentElement = '#aside'
defaults.scrollElement = '#main'
defaults.articleElement = '#article'
defaults.selector = 'h2,h3'
defaults.title = false
defaults.showCode = false
defaults.position = 'sticky'
defaults.reader = {
  target: '#article',
  title: document.querySelector('.main__h1'),
  allowSpeak: true
}
defaults.chapterTextFilter = true
defaults.anchorLinkFilter = (tag, title, id) => {
  return `${tag}-${title}-${id}`
}
defaults.git = 'https://github.com/yaohaixiao/message.js'
defaults.tags = 'https://github.com/yaohaixiao/message.js/tags'
defaults.issues = 'https://github.com/yaohaixiao/message.js/issues'
defaults.chapterTextFilter = (text) => {
  return text.replace(/\(.*?\)/, '()')
}

new Outline(defaults)

Message.info({
  destroyAfterClosed: false,
  duration: 5,
  message: 'message.js - 一个小巧实用的 JavaScript 提示信息工具库。'
})

setTimeout(() => {
  Message.success({
    round: true,
    message: 'message.js - 一个小巧实用的 JavaScript 提示信息工具库。'
  })
}, 2000)

setTimeout(() => {
  Message.warning({
    effect: 'light',
    message: 'message.js - 一个小巧实用的 JavaScript 提示信息工具库。'
  })
}, 4000)

setTimeout(() => {
  Message.error({
    effect: 'plain',
    message: 'message.js - 一个小巧实用的 JavaScript 提示信息工具库。'
  })
}, 6000)
