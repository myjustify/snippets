export default function onReachBottom(options) {
  if (!options) return
  this.status = false
  this.scrollTop = 0
  this.bottomDistance = options.bottomDistance || 10
  this.el = options.el || document.documentElement || document.body
  this.handleScroll = function() {
    if (this.status) return
    const scrollTop = this.el.scrollTop
    const clientHeight = this.el.clientHeight
    const scrollHeight = this.el.scrollHeight
    const flag = scrollTop > this.scrollTop
    this.scrollTop = scrollTop
    if (flag && scrollTop + clientHeight >= scrollHeight - this.bottomDistance) {
      // 触底后回滚 scrollTop 反而增加3到4
      this.scrollTop = scrollTop + 4
      if (options.success) {
        this.throttle(options.success)
      }
    }
  }.bind(this)

  this.throttle = function(fn, delay) {
    delay = delay || 500
    if (this.status) return
    this.status = true
    setTimeout(() => {
      this.status = false
    }, delay)
    fn()
  }

  this.open = function() {
    this.el.addEventListener('scroll', this.handleScroll, true)
  }

  this.close = function() {
    this.el.removeEventListener('scroll', this.handleScroll)
  }
}
