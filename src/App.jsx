import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Works from './components/Works.jsx'
import Footer from './components/Footer.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import Preloader from './components/Preloader.jsx'
import { works } from './data/portfolio.js'

export default function App() {
  const [detail, setDetail] = useState(null)
  const [intro, setIntro] = useState(true)

  // hash 兼容：#/work/:id → 直接打开详情弹窗（不替换页面）
  useEffect(() => {
    const onHash = () => {
      const m = window.location.hash.match(/^#\/work\/([^/]+)$/)
      const w = m ? works.find((x) => x.id === m[1]) : null
      if (w) setDetail(w)
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const closeDetail = () => {
    setDetail(null)
    if (window.location.hash.startsWith('#/work/')) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }

  // 滚动显现动画：元素进入视口时添加 is-visible
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {intro && <Preloader onDone={() => setIntro(false)} />}
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Works onSelect={setDetail} />
      </main>
      <Footer />
      {detail && <ProjectDetail work={detail} onClose={closeDetail} onSelect={setDetail} />}
    </>
  )
}
