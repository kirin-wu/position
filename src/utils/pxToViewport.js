export const pxToVw = css => {
  const options = {
    viewportWidth: 1920,
    unitPrecision: 5,
    viewportUnit: 'vw',
    selectorBlackList: [],
    minPixelValue: 1,
    mediaQuery: false,
  }

  const res = pxToViewport(css, options)
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = res
  document.head.appendChild(style)
}
