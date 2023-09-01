import isPlainObject from '@/utils/types/isPlainObject'

describe('isPlainObject() 方法：', () => {
  describe('基础数据类型：', () => {
    it(`isPlainObject(2), 返回：false`, () => {
      expect(isPlainObject(2)).toBe(false)
    })

    it(`isPlainObject('str'), 返回：false`, () => {
      expect(isPlainObject('str')).toBe(false)
    })

    it(`isPlainObject(false), 返回：false`, () => {
      expect(isPlainObject(false)).toBe(false)
    })

    it(`isPlainObject(null), 返回：false`, () => {
      expect(isPlainObject(null)).toBe(false)
    })

    it(`isPlainObject(), 返回：false`, () => {
      let udf
      expect(isPlainObject(udf)).toBe(false)
    })
  })

  describe('引用类型数据：', () => {
    it(`isPlainObject(new Function()), 返回：false`, () => {
      expect(isPlainObject(new Function())).toBe(false)
    })

    it(`isPlainObject(function(){}), 返回：false`, () => {
      const fn = function () {}
      expect(isPlainObject(fn)).toBe(false)
    })

    it(`isPlainObject(() => {}), 返回：false`, () => {
      const fn = () => {}
      expect(isPlainObject(fn)).toBe(false)
    })

    it(`isPlainObject(class{}), 返回：false`, () => {
      const fn = class {}
      expect(isPlainObject(fn)).toBe(false)
    })

    it(`isPlainObject(new class{}), 返回：true`, () => {
      const fn = class {}
      expect(isPlainObject(new fn())).toBe(true)
    })

    it(`isPlainObject({}), 返回：true`, () => {
      expect(isPlainObject({})).toBe(true)
    })

    it(`isPlainObject(Object.create(null)), 返回：true`, () => {
      expect(isPlainObject(Object.create(null))).toBe(true)
    })

    it(`isPlainObject(new Object()), 返回：true`, () => {
      const o = new Object()
      expect(isPlainObject(o)).toBe(true)
    })

    it(`isPlainObject([]), 返回：true`, () => {
      expect(isPlainObject([])).toBe(true)
    })

    it(`isPlainObject(/\\s+/ig), 返回：true`, () => {
      const pattern = /\s+/gi
      expect(isPlainObject(pattern)).toBe(true)
    })

    it(`isPlainObject(new String()), 返回：true`, () => {
      expect(isPlainObject(new String())).toBe(true)
    })

    it(`isPlainObject(new Number()), 返回：true`, () => {
      expect(isPlainObject(new Number())).toBe(true)
    })

    it(`isPlainObject(new Boolean()), 返回：true`, () => {
      expect(isPlainObject(new Boolean())).toBe(true)
    })

    it(`isPlainObject(new Array()), 返回：true`, () => {
      expect(isPlainObject(new Array())).toBe(true)
    })

    it(`isPlainObject(new Date()), 返回：true`, () => {
      expect(isPlainObject(new Date())).toBe(true)
    })
  })
})
