import { profile, heroTags } from '../data/portfolio.js'

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Hero() {
  return (
    <section className="hero" aria-label="自我介绍">
      <div className="container hero__grid">
        {/* 左侧：人像 + 认证印章（照片下方） */}
        <div className="hero__media" data-reveal>
          <div className="hero__portrait">
            <img
              src={profile.portrait}
              alt="Tina 头像"
              loading="eager"
            />
          </div>
          <span className="hero__tag-label" role="img" aria-label="PERSONAL PORTFOLIO TINA">
            <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
              <defs>
                <path
                  id="tagRing"
                  d="M 66,66 m -46.3,0 a 46.3,46.3 0 1,1 92.6,0 a 46.3,46.3 0 1,1 -92.6,0"
                />
                <path
                  id="tagLogo"
                  d="M143.666667,56.6666667 L143.666667,70 L137,70 L137,63.3333333 L137.000969,63.2185035 C137.061606,59.6281818 139.960453,56.7289361 143.550618,56.6676564 L143.666667,56.6666667 Z M136.666667,50 C136.666667,53.6435452 133.743757,56.6044083 130.11483,56.6656976 L130,56.6666667 L130,50 L136.666667,50 Z M150,50 L150,56.6666667 L143.333333,56.6666667 C139.689788,56.6666667 136.728925,53.7437571 136.667636,50.1148298 L136.666667,50 L150,50 Z"
                />
              </defs>
              {/* 底部白色圆：20% 透明，铺满毛玻璃圆（比圆环更大一圈），模糊由容器 backdrop-filter 提供 */}
              <circle cx="66" cy="66" r="66" fill="rgba(255, 255, 255, 0.2)" />
              {/* 双层圆环 */}
              <circle
                cx="66"
                cy="66"
                r="60"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="1"
              />
              <circle
                cx="66"
                cy="66"
                r="40"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="1"
              />
              {/* 环形文字：整圈 */}
              <text
                fill="#ffffff"
                fontSize="12"
                fontWeight="600"
                letterSpacing="2.2"
                fontFamily="Manrope, sans-serif"
                xmlSpace="preserve"
              >
                <textPath href="#tagRing">
                  PERSONAL  ✦  PORTFOLIO  ✦  TINA  ✦
                </textPath>
              </text>
              {/* 中心 logo（替换手绘 T） */}
              <use
                href="#tagLogo"
                transform="translate(48, 48) scale(1.8) translate(-130, -50)"
                fill="#ffffff"
              />
            </svg>
          </span>
        </div>

        {/* 右侧：标题 + 简介 + 标签 + CTA */}
        <div className="hero__content">
          <h1 className="hero__title" data-reveal>
            Hi, I&rsquo;m <em>{profile.enName}</em>
          </h1>
          <p className="hero__intro" data-reveal>
            {profile.intro}
          </p>
          <div className="hero__tags" data-reveal>
            {heroTags.slice(1).map((tag) => (
              <span className="hero__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="hero__cta-row" data-reveal>
            <a href="#works" className="btn btn--primary">
              查看我的作品
              <span className="btn__icon" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
