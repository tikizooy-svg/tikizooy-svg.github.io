import { profile } from '../data/portfolio.js'

export default function About() {
  return (
    <section className="section" id="about" aria-label="关于我">
      <div className="container">
        <p className="eyebrow eyebrow--dot">
          <span className="eyebrow__dot" aria-hidden="true" />
          {'{01}'} -关于我
        </p>
        <h2 className="about__title">ABOUT ME</h2>

        <div className="about__grid">
          {/* 左侧：深色信息卡 */}
          <div className="about__card about__card--dark" data-reveal>
            <div className="about__card-head">
              <h3 className="about__card-name">{profile.name}</h3>
              <span className="about__card-en">{profile.enName}</span>
            </div>
            <span className="about__watermark" aria-hidden="true">
              Zhang
            </span>
            <p className="about__edu">{profile.education}</p>
          </div>

          {/* 右侧：蓝色引言卡 */}
          <div className="about__card about__card--blue" data-reveal>
            <blockquote className="about__quote">
              <p>{profile.aboutQuote.join('，\n')}</p>
            </blockquote>
            <span className="about__quote-mark" aria-hidden="true">
              &rdquo;
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
