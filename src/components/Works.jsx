import { works } from '../data/portfolio.js'

const stats = [
  {
    value: '10+',
    label: 'Years\nof Experience',
    theme: 'blue',
    deco: '/images/stat-circle.png',
  },
  {
    value: '0-1',
    label: 'Product \nBuild  Experience',
    theme: 'dark',
    deco: '/images/stat-triangle.png',
  },
  {
    value: '20+',
    label: 'Projects\ncompleted',
    theme: 'white',
    deco: '/images/stat-snow.png',
  },
]

export default function Works({ onSelect }) {
  return (
    <>
      <section className="section" aria-label="数据亮点">
        <div className="container">
          <div className="stats-cards">
            {stats.map((s, i) => (
              <div
                className={`stat-card stat-card--${s.theme}`}
                key={i}
                data-reveal
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="stat-card__value">{s.value}</span>
                <span className="stat-card__label">
                  {s.label.split('\n').map((line, j) => (
                    <span key={j}>{line}</span>
                  ))}
                </span>
                <span className="stat-card__deco" aria-hidden="true">
                  <img src={s.deco} alt="" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section works-section" id="works" aria-label="我的作品">
        <div className="container">
          <p className="eyebrow eyebrow--dot" data-reveal>
            <span className="eyebrow__dot" aria-hidden="true" />
            {'{03}'} -作品展示
          </p>

          <div className="works-head" data-reveal>
            <h2 className="works-title">MY PORTFOLIO</h2>
          </div>

          <div className="works-grid">
            {works.map((w, i) => (
              <a
                className="work-card"
                href={`#/work/${w.id}`}
                key={w.id}
                data-reveal
                style={{ transitionDelay: `${(i % 2) * 120}ms` }}
                aria-label={`查看 ${w.name} ${w.title} 项目详情`}
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(w)
                }}
              >
                <div className="work-card__cover">
                  <img src={w.cover} alt={`${w.name} ${w.title} 封面`} loading="lazy" />
                  <span className="work-card__year">{w.year}</span>
                </div>
                <div className="work-card__body">
                  <h3 className="work-card__name">{w.name}</h3>
                  <div className="work-card__title">
                    {w.title}
                  </div>
                  <div className="work-card__types">
                    {w.type.filter((t) => !/^\d{4}$/.test(t)).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
