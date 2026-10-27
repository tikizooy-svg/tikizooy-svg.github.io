import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio.js'
import StrokeText from './StrokeText.jsx'

/**
 * 进入网站时的全屏加载动画：黑色背景 + 描边手绘文字
 * HELLO 轮廓从左到右手绘描边出现 → wipe 填充 → 淡出进入页面
 * 手机屏（<768px）字号自动调小
 */
const getFontSize = () => {
  if (typeof window === 'undefined') return 128
  return window.innerWidth < 768 ? 80 : 128
}

export default function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000)
    return () => clearTimeout(t)
  }, [onDone])

  const [fontSize, setFontSize] = useState(getFontSize)
  useEffect(() => {
    const onResize = () => setFontSize(getFontSize())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <StrokeText
          text="HELLO"
          strokeColor="#423fff"
          fillColor="#ffffff"
          strokeWidth={1.4}
          drawDuration={1.6}
          fillDelay={0.1}
          stagger={0}
          fillMode="wipe"
          wipeFrom="left"
          fontSize={fontSize}
          fontWeight={800}
          letterSpacing={-4}
          hoverRedraw={false}
        />
        <span className="preloader__sub">欢迎来到我的视觉空间</span>
      </div>
    </div>
  )
}
