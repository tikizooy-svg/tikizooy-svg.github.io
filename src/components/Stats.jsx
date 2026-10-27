import { stats } from '../data/portfolio.js'

export default function Stats() {
  // 复制一份用于无缝循环
  const items = [...stats, ...stats]

  return (
    <section className="stats" aria-label="数据统计">
      <div className="stats__marquee">
        <div className="stats__track">
          {items.map((item, i) => (
            <div
              className={`stats__item${item.value ? '' : ' stats__item--text'}`}
              key={`${item.label}-${i}`}
            >
              {item.value && <span className="stats__num">{item.value}</span>}
              {item.value && <span className="stats__sep">/</span>}
              <span className="stats__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
