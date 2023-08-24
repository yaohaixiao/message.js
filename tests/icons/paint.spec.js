/**
 * @jest-environment jsdom
 */
import paint from '@/utils/icons/paint'
import getSymbols from '@/utils/icons/getSymbols'
import count from '@/utils/icons/count'

describe('paint() 方法：', () => {
  const NPM =
    '<symbol id="rdc-icon-npm" viewBox="0 0 2500 2500"><path d="M0 0h2500v2500H0z" fill="#c00"/><path d="M1241.5 268.5h-973v1962.9h972.9V763.5h495v1467.9h495V268.5z" fill="#fff"/></symbol>'
  const ICONS = [
    '<symbol id="dev-icon-tips" viewBox="0 0 1024 1024"><path d="M594.659556 516.380444c27.192889-73.329778-7.566222-92.899556-40.049778-92.899555-43.804444 0-83.114667 21.902222-113.322667 50.631111-9.841778 9.784889-43.064889 41.472-43.064889 55.068444 0 4.551111 4.551111 9.841778 9.841778 9.841778 13.596444 0 49.834667-65.706667 77.767111-65.706666 6.087111 0 12.856889 6.826667 7.566222 20.366222l-52.849777 132.949333c-5.290667 12.856889-31.004444 74.808889-31.004445 111.047111 0 28.672 18.887111 41.528889 46.08 41.528889 76.288 0 164.693333-93.696 164.693333-115.598222 0-6.826667-5.290667-11.320889-9.045333-11.320889-10.581333 0-52.110222 64.227556-74.808889 64.227556-6.087111 0-9.045333-5.290667-9.045333-10.581334 0-12.060444 8.305778-30.947556 12.856889-42.325333l54.385778-147.228445z m-9.102223-120.149333c33.962667 0 62.691556-25.656889 62.691556-60.416 0-30.947556-21.902222-51.370667-52.110222-51.370667-33.223111 0-61.952 27.192889-61.952 60.416 0 31.004444 20.423111 51.370667 51.370666 51.370667zM512 967.111111A455.111111 455.111111 0 1 1 512 56.888889a455.111111 455.111111 0 0 1 0 910.222222z"></path></symbol>',
    '<symbol id="rdc-icon-delete-step" viewBox="0 0 1024 1024"><path d="M509.44 0c281.408 0 509.44 229.248 509.44 512s-228.032 512-509.44 512S0 794.752 0 512s228.032-512 509.44-512z m214.336 469.76H300.992a42.24 42.24 0 1 0 0 84.48h422.72a42.24 42.24 0 1 0 0-84.48z"></path></symbol>'
  ]

  it(`paint(), 将绘制默认的图标：`, () => {
    let $icons
    let symbols

    paint()
    $icons = document.querySelector('#mjs-icons')
    symbols = getSymbols()

    expect($icons.id).toEqual('mjs-icons')
    expect($icons.querySelectorAll('symbol').length).toEqual(symbols.length)
  })

  it(`paint(${NPM}), 返回：true`, () => {
    let $icons
    let symbols

    paint(`${NPM}`)
    $icons = document.querySelector('#mjs-icons')
    symbols = getSymbols()

    expect($icons.querySelectorAll('symbol').length).toEqual(symbols.length)
    expect(count()).toEqual(9)
  })

  it(`paint(${ICONS}), 返回：true`, () => {
    let $icons
    let symbols
    let $tips

    paint(ICONS)

    $icons = document.querySelector('#mjs-icons')
    symbols = getSymbols()
    $tips = getSymbols('tips', 'dev')

    expect($icons.querySelectorAll('symbol').length).toEqual(symbols.length)
    expect(count()).toEqual(11)
    expect($tips).toEqual(ICONS[0])
  })
})
