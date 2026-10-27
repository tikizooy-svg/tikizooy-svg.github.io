import { useEffect, useRef } from 'react'
import { experience } from '../data/portfolio.js'

const MIN_OPACITY = 0 // 被覆盖时完全透明，向上滚动时淡入

export default function Experience() {
  const stackRef = useRef(null)

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return
    const cards = [...stack.querySelectorAll('.experience__card')]
    if (cards.length < 2) return

    let ticking = false

    const update = () => {
      // 动态读取 sticky top（桌面 120px / 移动端 84px）
      const stickyTop = parseFloat(getComputedStyle(cards[0]).top) || 120

      cards.forEach((card, i) => {
        const inner = card.querySelector('.experience__card-inner')
        const badge = card.querySelector('.experience__badge')
        if (!inner) return

        // 最后一张始终全亮
        if (i >= cards.length - 1) {
          inner.style.opacity = '1'
          inner.style.transform = ''
          if (badge) {
            badge.style.opacity = '1'
            badge.style.transform = ''
          }
          return
        }

        const next = cards[i + 1]
        const cardRect = card.getBoundingClientRect()
        const nextRect = next.getBoundingClientRect()

        // 覆盖进度：0 = 未覆盖, 1 = 完全覆盖
        const coverStart = cardRect.bottom
        const coverEnd = stickyTop
        const range = coverStart - coverEnd
        const rawProgress =
          range > 0
            ? (coverStart - nextRect.top) / range
            : nextRect.top <= stickyTop
              ? 1
              : 0
        // 第二张卡片（index 1）变暗速度 x1.8
        const dimSpeed = i === 1 ? 1.2 : 1
        const progress = Math.max(0, Math.min(1, rawProgress * dimSpeed))

        const opacity = 1 - progress * (1 - MIN_OPACITY)
        const ty = progress * 16
        inner.style.opacity = String(opacity)
        inner.style.transform = `translateY(${ty}px)`
        if (badge) {
          badge.style.opacity = String(opacity)
          badge.style.transform = `translateY(${ty}px)`
        }
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="section experience-section" id="experience" aria-label="工作经历">
      <div className="container">
        <p className="eyebrow eyebrow--dot">
          <span className="eyebrow__dot" aria-hidden="true" />
          {'{02}'} -工作经历
        </p>
        <h2 className="about__title">WORK EXPERIENCE</h2>
      </div>

      <div className="experience__stack" ref={stackRef}>
        {experience.map((item, i) => (
          <article
            className="experience__card"
            key={item.num}
            style={{ zIndex: i + 1 }}
          >
            <div className="container experience__card-wrap">
              <span className="experience__badge" aria-hidden="true">
                {item.num}
              </span>

              <div className="experience__card-inner">
                <span className="experience__year" aria-hidden="true">
                  {item.year}
                </span>

                <div className="experience__card-body">
                  <p className="experience__period">{item.period}</p>
                  <h3 className="experience__role">{item.role}</h3>
                  <p className="experience__company">{item.company}</p>
                  {item.desc ? (
                    <p className="experience__desc">{item.desc}</p>
                  ) : (
                    <ul className="experience__bullets">
                      {item.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
