import { useEffect, useState } from 'react'
import { profile, navLinks, works } from '../data/portfolio.js'

const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent)
const isWeChat = /MicroMessenger/i.test(navigator.userAgent)

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
)

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 12.5l5 5L20 6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // 滚动超过阈值后切换毛玻璃态（参考站效果：顶部透明 → 滚动出现玻璃）
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 菜单打开时锁定背景滚动
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  const copyEmail = async () => {
    const text = profile.email
    let ok = false

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        ok = true
      }
    } catch {
      ok = false
    }

    if (!ok) {
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        ta.setSelectionRange(0, text.length)
        ok = document.execCommand('copy')
        document.body.removeChild(ta)
      } catch {
        ok = false
      }
    }

    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <header
      className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}
      id="top"
    >
      <div className="container">
        <div className="nav__pill">
          <a href="#top" className="nav__logo" aria-label="返回首页" onClick={close}>
            <span className="nav__logo-dot" aria-hidden="true">
              <svg width="16" height="16" viewBox="130 50 20 20" fill="none" aria-hidden="true">
                <path
                  d="M143.666667,56.6666667 L143.666667,70 L137,70 L137,63.3333333 L137.000969,63.2185035 C137.061606,59.6281818 139.960453,56.7289361 143.550618,56.6676564 L143.666667,56.6666667 Z M136.666667,50 C136.666667,53.6435452 133.743757,56.6044083 130.11483,56.6656976 L130,56.6666667 L130,50 L136.666667,50 Z M150,50 L150,56.6666667 L143.333333,56.6666667 C139.689788,56.6666667 136.728925,53.7437571 136.667636,50.1148298 L136.666667,50 L150,50 Z"
                  fill="#ffffff"
                />
              </svg>
            </span>
            <span className="nav__logo-text">{profile.logo}</span>
          </a>

          <a href="#contact" className="nav__cta">
            联系我
            <span className="btn__icon" aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>

          <button
            type="button"
            className={`nav__toggle${open ? ' nav__toggle--open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="nav__burger" aria-hidden="true">
              <span className="nav__burger-line nav__burger-line--top" />
              <span className="nav__burger-line nav__burger-line--mid" />
              <span className="nav__burger-line nav__burger-line--bot" />
            </span>
          </button>
        </div>

        <nav className="nav__links" aria-label="主导航">
          {navLinks.map((link, i) =>
            i === navLinks.length - 1 ? null : (
              <a key={link.href} href={link.href} className="nav__link">
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* 移动端全屏菜单（复刻 MUGEN 弹窗：Menu 标题 + 大字号菜单项 + Let's Talk + Socials + 页脚） */}
        {open && (
          <div className="nav__menu" id="mobile-menu">
            <div className="nav__menu-head">
              <span className="nav__menu-title">Menu</span>
            </div>

            <div className="nav__menu-body">
              <nav className="nav__menu-links" aria-label="移动端导航">
                {navLinks.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="nav__menu-link"
                    onClick={close}
                    style={{ animationDelay: `${0.06 + i * 0.06}s` }}
                  >
                    {link.label}
                    {link.href === '#works' && (
                      <span className="nav__menu-count">[{works.length}]</span>
                    )}
                  </a>
                ))}
              </nav>

              <div className="nav__menu-info">
                <div className="nav__menu-block">
                  <span className="nav__menu-eyebrow">EMAIL</span>
                  <div className="nav__menu-mail-row">
                    <a
                      href={`mailto:${profile.email}?subject=合作邀约`}
                      className="nav__menu-mail"
                      onClick={close}
                    >
                      {profile.email}
                    </a>
                    <button
                      type="button"
                      className={`nav__menu-copy${copied ? ' nav__menu-copy--done' : ''}`}
                      onClick={copyEmail}
                      aria-label={copied ? '已复制' : '复制邮箱'}
                      title={copied ? '已复制' : '复制邮箱'}
                    >
                      {copied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </div>
                </div>

                <div className="nav__menu-block">
                  <span className="nav__menu-eyebrow">RESUME</span>
                  <a
                    href="/resume.pdf"
                    download
                    className="nav__menu-mail nav__menu-resume"
                    onClick={(e) => {
                      // 微信：打开图片预览页（WebView 无法预览/下载 PDF），引导右上角跳浏览器
                      if (isWeChat) {
                        e.preventDefault()
                        window.open('/resume-preview.html', '_blank', 'noopener')
                      } else if (isIOS) {
                        // iOS 忽略 download 属性，改为新标签预览，避免 0B 下载
                        e.preventDefault()
                        window.open('/resume.pdf', '_blank', 'noopener')
                      }
                      close()
                    }}
                  >
                    简历下载
                  </a>
                </div>
              </div>
            </div>

            <div className="nav__menu-foot">
              <span>© 2026 TINA. ALL RIGHTS RESERVED.</span>
            </div>
          </div>
        )}

        {copied && (
          <span className="footer__copy-toast" role="status">
            复制成功
          </span>
        )}
      </div>
    </header>
  )
}
