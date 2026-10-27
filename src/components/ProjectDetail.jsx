import { useEffect, useRef } from 'react'
import { works } from '../data/portfolio.js'

export default function ProjectDetail({ work, onClose, onSelect }) {
  const panelRef = useRef(null)

  // 切换项目时滚动回弹窗顶部
  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0
  }, [work.id])

  // 弹窗：ESC 关闭 / 锁定页面滚动
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="work-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${work.name} ${work.title} 项目详情`}
      onClick={onClose}
    >
      <button
        type="button"
        className="work-modal__close"
        onClick={onClose}
        aria-label="关闭项目详情"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={`work-modal__panel${work.id === 'dongzheng' ? ' work-modal__panel--site' : ''}`}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="detail__head work-modal__head">
          <span className="detail__title-sub">{work.fullTitle || `${work.name}——${work.title}`}</span>
          <div className="detail__types">
            {work.type.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <p className="detail__desc">{work.desc}</p>
        </header>

        <div className="detail__gallery work-modal__gallery">
          {work.id === 'dongzheng' && (
            <>
              <div className="work-site-window">
                <div className="work-site-bar">
                  <span className="work-site-bar__dots" aria-hidden="true">
                    <i className="work-site-bar__dot work-site-bar__dot--r" />
                    <i className="work-site-bar__dot work-site-bar__dot--y" />
                    <i className="work-site-bar__dot work-site-bar__dot--g" />
                  </span>
                  <span className="work-site-bar__url">https://www.dongzhengafc.com/</span>
                </div>
                {work.images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${work.name} 设计稿 ${i + 1}`}
                    loading="lazy"
                    className="detail__img work-site-img"
                  />
                ))}
              </div>
              <div className="work-site-block">
                <a
                  className="btn btn--primary work-site-btn"
                  href="https://www.dongzhengafc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  访问官网
                  <span className="btn__icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14m-6-6 6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </>
          )}
          {work.id !== 'dongzheng' &&
            work.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${work.name} 设计稿 ${i + 1}`}
                loading="lazy"
                className="detail__img"
              />
            ))}

          <div className="work-others">
            <div className="work-others__head">
              <h3 className="work-others__title">其他项目</h3>
            </div>
            <div className="work-others__grid">
              {works
                .filter((o) => o.id !== work.id)
                .map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className="work-others__card"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelect(o)
                    }}
                  >
                    <span className="work-others__cover">
                      <img src={o.cover} alt={o.title} loading="lazy" />
                    </span>
                    <span className="work-others__meta">
                      <span className="work-others__name">{o.name}</span>
                      <span className="work-others__sub">{o.title}</span>
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
