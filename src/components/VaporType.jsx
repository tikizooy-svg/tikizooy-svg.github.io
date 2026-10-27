import { useEffect, useRef } from 'react'

/**
 * VaporType —— 等效复刻 ReactBits Pro「Vapor Type」动效
 * 文字从雾气中凝聚成形，再蒸发成粒子向上飘散，循环切换单词
 *
 * 默认参数对齐原版 Mist 预设：
 *   condense 1.8s · hold 2.4s · dissolve 2.0s · overlap 0.6 · sweep left
 *   density ~1 粒子/px² · particleSize 1.2px · rise ↑ · turbulence 0.8 · spread 1.2
 * 额外支持：点击文字立即蒸发切换（clickAdvance）、滚动进视口才启动（startOnView）
 */

const DPR_MAX = 2

export default function VaporType({
  words = ['IMAGINE', 'CREATE', 'INSPIRE'],
  color = '#FFFFFF',
  vaporColor = '#4150ff', // 原版为 #B19EEF，此处用站点蓝雾，可随时改回
  fontSize = 112,
  weight = 700,
  condense = 1.8,
  hold = 2.4,
  dissolve = 2.0,
  overlap = 0.6,
  sweep = 'left', // left | right | center | top | scatter
  stagger = 0.8,
  density = 1,
  particleSize = 1.2,
  spread = 1.2,
  rise = 1,
  turbulence = 0.8,
  clickAdvance = true,
  startOnView = true,
  className = '',
  style,
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const stateRef = useRef(null)
  const propsRef = useRef(null)
  propsRef.current = {
    words,
    color,
    vaporColor,
    condense,
    hold,
    dissolve,
    overlap,
    sweep,
    stagger,
    density,
    particleSize,
    spread,
    rise,
    turbulence,
  }

  // 挂载初始化 + 尺寸观察
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d', { alpha: true })
    ctxRef.current = ctx

    let raf = 0
    let timer = 0
    let active = false
    let wordIndex = 0
    let globalT = 0
    let last = performance.now()
    let samples = [] // 当前词采样点 [{x,y}]
    let samplesW = 0
    let samplesH = 0
    let dpr = 1
    let viewStarted = false
    let observer = null

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const buildSamples = (word, fs) => {
      const off = document.createElement('canvas')
      const octx = off.getContext('2d', { willReadFrequently: true })
      octx.font = `${weight} ${fs}px Manrope, sans-serif`
      const w = Math.ceil(octx.measureText(word).width) + 40
      const h = Math.ceil(fs * 1.4)
      off.width = Math.max(64, w)
      off.height = h
      octx.clearRect(0, 0, off.width, off.height)
      octx.fillStyle = '#fff'
      octx.textBaseline = 'alphabetic'
      octx.font = `${weight} ${fs}px Manrope, sans-serif`
      octx.fillText(word, 20, h - fs * 0.18)

      const img = octx.getImageData(0, 0, off.width, off.height).data
      const pts = []
      const step = Math.max(1, Math.round(1 / Math.max(0.1, density)))
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const a = img[(y * off.width + x) * 4 + 3]
          if (a > 120) pts.push({ x: x - 20, y: y - h / 2 })
        }
      }
      return { pts, w: w - 40, h }
    }

    const loadWord = (idx) => {
      const fs = currentFontSize()
      const s = buildSamples(propsRef.current.words[idx % propsRef.current.words.length], fs)
      samples = s.pts
      samplesW = s.w
      samplesH = s.h
    }

    const currentFontSize = () => {
      const cs = getComputedStyle(wrap)
      const f = parseFloat(cs.fontSize)
      return Number.isFinite(f) && f > 0 ? f : fontSize
    }

    const makeParticles = () => {
      const rng = seededRandom(wordIndex)
      return samples.map((p) => {
        const drift = (Math.random() - 0.5) * 2
        return {
          tx: p.x - samplesW / 2,
          ty: p.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          sx: drift * samplesW * 0.12,
          sy: -Math.random() * samplesH * 0.6 * spread - samplesH * 0.05,
          wave: Math.random() * Math.PI * 2,
          waveSpeed: 0.6 + Math.random() * 1.4,
          delay: sweepDelay(p.x),
          alpha: 0.5 + Math.random() * 0.5,
          size: particleSize * (0.7 + Math.random() * 0.7),
          seed: rng(),
        }
      })
    }

    const sweepDelay = (x) => {
      const { sweep: sw, stagger: st, dissolve: d, condense: c } = propsRef.current
      const f = () => 0
      let k = 0
      if (sw === 'center') k = Math.abs(x) / (samplesW / 2 || 1)
      else if (sw === 'top') k = 0
      else if (sw === 'scatter') k = Math.random()
      else k = x / (samplesW || 1) // left / right
      if (sw === 'right') k = 1 - k
      if (sw === 'top') k = (samples.length ? 0 : 0)
      return k * st * (d + c)
    }

    // 固定种子随机（避免每帧跳动）
    let seedCounter = 0
    const seededRandom = () => {
      let s = 123456789 + wordIndex * 7919 + seedCounter++
      return () => {
        s = (s * 16807) % 2147483647
        return (s - 1) / 2147483646
      }
    }

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      if (rect.width <= 0) return
      dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    // 粒子单次位置/颜色计算
    const renderParticles = (pts, timeInWord) => {
      const { color: c, vaporColor: vc, condense: cd, hold: hd, dissolve: dv, rise: rUp, turbulence: tr, spread: sp } =
        propsRef.current
      const cycle = cd + hd + dv
      const p = { x: 0, y: 0, a: 0, mix: 0 }
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.scale(dpr, dpr)

      let t = timeInWord
      let phase = 'hold'
      if (t < cd) phase = 'condense'
      else if (t >= cd + hd) phase = 'dissolve'
      else phase = 'hold'

      for (const pt of pts) {
        if (phase === 'condense') {
          const k = easeOutCubic(clamp01(t / cd))
          const d = pt.delay * 0.35
          const kk = easeOutCubic(clamp01((t - d) / (cd - d + 0.001)))
          p.x = pt.sx + (pt.tx - pt.sx) * kk
          p.y = pt.sy + (pt.ty - pt.sy) * kk
          p.a = 0.25 + 0.75 * kk
          p.mix = 1
        } else if (phase === 'dissolve') {
          const dt = t - (cd + hd)
          const k = easeInCubic(clamp01(dt / dv))
          const d = pt.delay * 0.5
          const kk = easeInCubic(clamp01((dt - d) / (dv - d + 0.001)))
          const angle = pt.wave + dt * pt.waveSpeed * 1.6
          const turb = Math.sin(angle) * tr * 6 + pt.vx * 3
          p.x = pt.tx + turb * kk + pt.sx * kk * 0.4
          p.y = pt.ty + pt.vy * 4 * kk - samplesH * 0.35 * rUp * kk * sp
          p.a = (1 - kk) * pt.alpha
          p.mix = 1 - kk
        } else {
          // hold
          p.x = pt.tx
          p.y = pt.ty
          p.a = pt.alpha
          p.mix = 1
        }
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        // 蒸发中的粒子混入 vapor 色
        if (p.mix < 0.999) {
          const vp = mixRgb(vc, p.a)
          ctx.fillStyle = `rgba(${vp.r},${vp.g},${vp.b},${p.a})`
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, pt.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    const mixRgb = (hex, alpha) => {
      const h = hex.replace('#', '')
      const full = h.length === 3 ? h.split('').map((x) => x + x).join('') : h
      return {
        r: parseInt(full.slice(0, 2), 16),
        g: parseInt(full.slice(2, 4), 16),
        b: parseInt(full.slice(4, 6), 16),
      }
    }

    const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    const easeInCubic = (t) => t * t * t

    let particles = []
    let nextParticles = []

    const frame = (now) => {
      if (!active) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      globalT += dt

      const { condense: cd, hold: hd, dissolve: dv, overlap: ov } = propsRef.current
      const cycle = cd + hd + dv
      const nextStart = cycle - ov * dv

      const render = (pts, t) => {
        if (t < 0) return
        renderParticles(pts, t)
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // 当前词
      const tCur = globalT % cycle
      render(particles, tCur)
      // 下一词（重叠阶段提前凝聚）
      const tNext = globalT - nextStart
      if (tNext >= 0 && tNext < cycle && nextParticles.length) {
        render(nextParticles, tNext)
      }

      // 轮换
      if (globalT >= nextStart) {
        if (globalT >= cycle) {
          globalT -= cycle
          wordIndex = (wordIndex + 1) % propsRef.current.words.length
          loadWord(wordIndex)
          particles = makeParticles()
          nextParticles = loadNext(wordIndex + 1)
        }
      }
      // 用 setTimeout 驱动（约 30fps）：不依赖页面可见性，任何环境稳定播放
      timer = setTimeout(tick, 33)
    }

    const tick = () => frame(performance.now())

    const loadNext = (idx) => {
      const prev = particles
      const fs = currentFontSize()
      const s = buildSamples(propsRef.current.words[idx % propsRef.current.words.length], fs)
      const saved = samples
      samples = s.pts
      samplesW = s.w
      samplesH = s.h
      const np = makeParticles()
      samples = saved
      return np
    }

    const start = () => {
      if (reduced) {
        // 减少动效：静态绘制第一个词
        loadWord(wordIndex)
        const fs = currentFontSize()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.scale(dpr, dpr)
        ctx.font = `${weight} ${fs}px Manrope, sans-serif`
        ctx.fillStyle = propsRef.current.color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(propsRef.current.words[0], canvas.width / dpr / 2, canvas.height / dpr / 2)
        ctx.restore()
        return
      }
      active = true
      loadWord(wordIndex)
      particles = makeParticles()
      nextParticles = loadNext(wordIndex + 1)
      last = performance.now()
      timer = setTimeout(tick, 0)
    }

    // 尺寸/字体变化
    const ro = new ResizeObserver(() => {
      resize()
      if (active) {
        // 重采样保持清晰
        loadWord(wordIndex)
        const fs = currentFontSize()
        const cur = particles
        particles = makeParticles()
        nextParticles = loadNext(wordIndex + 1)
      }
    })
    ro.observe(wrap)

    resize()
    if (startOnView && !reduced) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !viewStarted) {
            viewStarted = true
            start()
            observer.disconnect()
          }
        },
        { threshold: 0.3 },
      )
      observer.observe(wrap)
    } else {
      start()
    }

    // 点击推进：当前词立即蒸发并提前进入下一词
    const onPointer = (e) => {
      if (!clickAdvance || !active || reduced) return
      const { dissolve: dv, overlap: ov } = propsRef.current
      const tIn = globalT % (propsRef.current.condense + propsRef.current.hold + dv)
      globalT = globalT - tIn + propsRef.current.condense + propsRef.current.hold - 0.05
    }
    const wrapEl = wrap
    wrapEl.addEventListener('pointerdown', onPointer)

    return () => {
      active = false
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (observer) observer.disconnect()
      wrapEl.removeEventListener('pointerdown', onPointer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span
      ref={wrapRef}
      className={`vapor-type${className ? ` ${className}` : ''}`}
      style={{
        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        fontWeight: weight,
        ...style,
      }}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
    </span>
  )
}
