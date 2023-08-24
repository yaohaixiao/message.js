<template>
  <div
    ref="wrapper"
    :class="className"
    :style="cssRules"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave">
    <i
      ref="icon"
      class="mjs-message__icon">
      <icon
        :name="iconName"
        :size="iconSize" />
    </i>
    <p
      v-if="!dangerouslyUseHTMLString"
      ref="content"
      class="mjs-message__content">
      <slot>{{ message }}</slot>
    </p>
    <p
      v-else
      ref="content"
      class="mjs-message__content"
      v-html="message"></p>
    <i
      v-if="closable"
      ref="close"
      class="mjs-message__close"
      @click="onClose">
      <icon
        name="close"
        :size="18" />
    </i>
  </div>
</template>

<script>
import Icon from './Icon'

import isFunction from '../../utils/types/isFunction'
import later from '../../utils/lang/later'

const TYPES = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

export default {
  name: 'MjsMessage',
  componentName: 'MjsMessage',
  components: {
    Icon
  },
  data() {
    return {
      id: 1,
      timer: null,
      type: 'info',
      round: false,
      effect: 'default',
      duration: 6,
      delay: 2,
      message: '',
      beforeClose: null,
      closable: true,
      customClass: '',
      offset: 30,
      visible: false,
      dangerouslyUseHTMLString: false,
      closed: true
    }
  },
  computed: {
    icon() {
      return TYPES[this.type]
    },
    iconName() {
      const icon = this.icon

      return this.effect === 'light' ? `circle-${icon}` : icon
    },
    iconSize() {
      return this.effect === 'default' && this.round ? 12 : this.round ? 20 : 16
    },
    className() {
      const type = this.type
      const effect = this.effect
      const round = this.round
      const closable = this.closable
      const visible = this.visible

      return [
        'mjs-message',
        `mjs-message_${type}`,
        `mjs-message_${effect}`,
        {
          'mjs-message_round': round,
          'mjs-message_full-width': !closable,
          'mjs-message_visible': visible
        },
        this.customClass
      ]
    },
    cssRules() {
      const visible = this.visible
      const top = visible ? this.offset : -50

      return {
        top: `${top}px`
      }
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    const $wrapper = this.$el

    $wrapper.removeEventListener('mouseenter', this.onMouseEnter)
    $wrapper.removeEventListener('mouseleave', this.onMouseLeave)

    if ($wrapper) {
      $wrapper.parentNode.removeChild($wrapper)
    }

    this.clearTimer()
  },
  methods: {
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    startTimer(duration) {
      this.timer = later(() => {
        this.close()
      }, duration * 1000)
    },
    open() {
      const duration = this.duration

      this.clearTimer()

      later(() => {
        this.closed = false
        this.visible = true

        if (duration > 0) {
          this.startTimer(this.duration)
        }
      }, 100)
    },
    close() {
      const beforeClose = this.beforeClose

      this.closed = true

      if (isFunction(beforeClose)) {
        beforeClose(this)
      }

      this.visible = false

      later(() => {
        this.remove()
      }, 500)
    },
    remove() {
      this.$destroy()
    },
    onMouseEnter() {
      this.clearTimer()
    },
    onMouseLeave() {
      const duration = this.duration

      if (duration <= 0) {
        return false
      }

      this.startTimer(this.delay)
    },
    onClose() {
      this.clearTimer()
      this.close()
    }
  }
}
</script>

<style lang="less">
@import './message';
</style>
