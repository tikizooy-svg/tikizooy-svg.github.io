import { useState } from 'react'
import { profile } from '../data/portfolio.js'

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

const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent)
const isWeChat = /MicroMessenger/i.test(navigator.userAgent)

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const openResume = (e) => {
    // 微信：打开图片预览页（WebView 无法预览/下载 PDF），引导右上角跳浏览器
    if (isWeChat) {
      e.preventDefault()
      window.open('/resume-preview.html', '_blank', 'noopener')
      return
    }
    // iOS 忽略 download 属性，改为新标签预览，避免 0B 下载
    if (isIOS) {
      e.preventDefault()
      window.open('/resume.pdf', '_blank', 'noopener')
    }
  }

  const copyEmail = async () => {
    const text = profile.email
    let ok = false

    // 首选：异步剪贴板 API（仅 secure context：localhost / https）
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        ok = true
      }
    } catch {
      ok = false
    }

    // 降级：非安全上下文（局域网 http）使用 execCommand
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
    <footer className="footer" id="contact" aria-label="合作邀约">
      <div className="container">
        <div className="footer__main">
          {/* 左侧：邀约语 + 大标题 */}
          <div className="footer__left">
            <p className="footer__lead" data-reveal>
              期待与你携手共创
            </p>
            <h2 className="footer__title" data-reveal>
              LET&rsquo;S WORK
              <br />
              <em>
                TOGETHER
                <span className="footer__dot" aria-hidden="true" />
              </em>
            </h2>
          </div>

          {/* 右侧：个人信息卡 */}
          <div className="footer__card" data-reveal>
            <div className="footer__card-head">
              <div className="footer__avatar" aria-hidden="true">
                <svg width="36" height="36" viewBox="130 50 20 20" fill="none">
                  <path
                    d="M143.666667,56.6666667 L143.666667,70 L137,70 L137,63.3333333 L137.000969,63.2185035 C137.061606,59.6281818 139.960453,56.7289361 143.550618,56.6676564 L143.666667,56.6666667 Z M136.666667,50 C136.666667,53.6435452 133.743757,56.6044083 130.11483,56.6656976 L130,56.6666667 L130,50 L136.666667,50 Z M150,50 L150,56.6666667 L143.333333,56.6666667 C139.689788,56.6666667 136.728925,53.7437571 136.667636,50.1148298 L136.666667,50 L150,50 Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
              <div className="footer__card-id">
                <span className="footer__name">{profile.name}</span>
                <span className="footer__role">UI/UX Designer</span>
              </div>
            </div>

            <div className="footer__row">
              <span className="footer__row-label">EMAIL</span>
              <div className="footer__mail-row">
                <a
                  className="footer__mail"
                  href={`mailto:${profile.email}`}
                  aria-label={`发送邮件至 ${profile.email}`}
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  className={`footer__copy${copied ? ' footer__copy--done' : ''}`}
                  onClick={copyEmail}
                  aria-label={copied ? '已复制' : '复制邮箱'}
                  title={copied ? '已复制' : '复制邮箱'}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>

            <div className="footer__row">
              <span className="footer__row-label">RESUME</span>
              <a
                href="/resume.pdf"
                download
                className="footer__mail footer__resume"
                onClick={openResume}
              >
                简历下载
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 TINA. ALL RIGHTS RESERVED.</span>
          <a
            href="#top"
            className="footer__top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>

      {copied && (
        <span className="footer__copy-toast" role="status">
          复制成功
        </span>
      )}
    </footer>
  )
}
