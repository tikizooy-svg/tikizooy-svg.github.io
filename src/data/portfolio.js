/**
 * 站点内容数据（后续迭代中只需修改此文件即可更新页面内容）
 */

export const profile = {
  logo: 'TINA',
  name: '张婷婷',
  enName: 'Tina',
  role: 'UI/UX 设计师',
  email: '743602103@qq.com',
  portrait: '/images/hero-portrait.jpg',
  tagIcon: '/images/tag-label.png',
  intro:
    'UI/UX体验设计师，十余年设计深耕，沉淀30+完整项目实践，横跨B端工具产品、C端小程序、网站与H5多元数字领域，于美学秩序与用户体验之间，打磨每一处数字表达',
  aboutQuote: [
    '不追逐浮华的视觉',
    '在商业目标、用户逻辑与设计美学之间，寻找恰如其分的平衡',
    '让界面好用，亦耐得住审视',
  ],
  education: '南京艺术学院  ·  平面设计专业  ·  本科',
  footerLine: '十年设计经验 · 30+ 项目交付 · 一个人从 0 到 1 全程负责。',
}

export const navLinks = [
  { label: '首页', href: '#top' },
  { label: '关于我', href: '#about' },
  { label: '工作经历', href: '#experience' },
  { label: '我的作品', href: '#works' },
  { label: '联系我', href: '#contact' },
]

export const heroTags = ['UI/UX', '0-1全链路', 'UI/UX设计', '设计规范', '组件库搭建']

export const stats = [
  { value: null, label: 'Design-System Delivered' },
  { value: '10+', label: 'years of Experience' },
  { value: '20+', label: 'Completed Projects' },
]

export const experience = [
  {
    num: '/01',
    period: '2020.12 - 2026.07',
    role: 'UI/UX 设计师',
    company: '上海东正汽车金融股份有限公司',
    year: '2026',
    bullets: [
      '负责汽车金融业务链路 UI&UX 设计，完成 APP、小程序、后台系统多端从 0-1 视觉与交互搭建，输出标准化交互与视觉规范文档',
      '重构信贷业务操作流程，精简业务操作步骤，提升业务处理效率，降低一线客户经理操作成本',
      '联动产品、前端推进设计系统与组件库落地，提升设计复用率，降低跨项目迭代设计成本',
      '运用 AIGC 辅助梳理业务痛点，快速输出多版交互方案，缩短需求方案输出周期',
    ],
  },
  {
    num: '/02',
    period: '2016.03 - 2020.09',
    role: 'UI 设计师',
    company: '上海亘岩网络科技有限公司',
    year: '2020',
    bullets: [
      '主导 B 端 SaaS 电子合同平台全链路 UX 设计，完成 Web、APP、H5 多终端从 0-1 交互架构搭建，输出标准化交互与设计规范文档',
      '重构核心签署业务流程，删减冗余操作步骤，提升用户任务完成率，降低客户咨询反馈',
      '联动产品、前端推进组件体系落地，提升组件复用率，降低后续迭代设计成本',
      '协同研发严格把控还原度，保障设计方案高质量落地上线',
    ],
  },
  {
    num: '/03',
    period: '2015.07 - 2016.03',
    role: '视觉设计师',
    company: '上海鸣时文化传播有限公司',
    year: '2016',
    desc: '参与多商业品牌数字视觉项目，覆盖网站、移动端 APP、H5、PC 系统，落地 20+ 商业客户项目',
  },
]

export const works = [
  {
    id: 'shoudanxia',
    name: '收单侠',
    title: '汽车贷款进件App体验升级',
    year: '2026',
    period: '2026.01~2026.06',
    type: ['2026', 'TO B', '汽车金融', 'IP设计', '工具型产品'],
    cover: '/images/projects/shou-dan-xia.jpg',
    images: Array.from({ length: 24 }, (_, i) => `/images/projects/shou-dan-xia/${String(i + 1).padStart(2, '0')}.jpg`),
    desc: '收单侠是一款汽车金融外勤业务员专用贷款进件 App。面向常驻 4S 店、车行、汽贸店的一线业务员，支持车贷进件、资料采集与订单全流程跟踪，助力线下门店移动展业',
    num: '02',
    sub: 'WEBSITE',
  },
  {
    id: 'dongzheng',
    name: '东正汽车金融',
    title: '企业官网 Redesign',
    year: '2025',
    type: ['2025', '官网设计', '品牌视觉'],
    cover: '/images/projects/dong-zheng-cover.jpg',
    images: ['/images/projects/dong-zheng/02.png'],
    desc: '东正汽车金融品牌官网设计，重构信息架构与视觉体系。',
    num: '02',
    sub: 'WEBSITE',
  },
  {
    id: 'douguo',
    name: '豆果美食',
    title: '豆果美食App Redesign',
    year: '2021',
    type: ['2021', 'TO C', 'APP 改版', 'IP设计', '个人练习'],
    cover: '/images/projects/dou-guo.jpg',
    images: Array.from({ length: 38 }, (_, i) => `/images/projects/dou-guo/${String(i + 1).padStart(2, '0')}.jpg`),
    desc: '以内容为主要分发方向，以电商为辅助，是一个以交流，互动为主的美食社区。提供菜谱查询、生活笔记交流、课堂、电商商城等服务板块，可在线获取做菜的视频、图文教程，甚至可以通过商城直接获得菜谱中所需食材。',
    num: '02',
    sub: 'APP',
  },
  {
    id: 'qianysuo',
    name: '契约锁',
    title: '电子签约工具App V4.2 项目升级',
    fullTitle: '契约锁 App V4.2项目升级',
    year: '2020',
    type: ['2020', 'TO B', 'SAAS', '界面优化', '工具型产品', '品牌符号'],
    cover: '/images/projects/qian-shou.jpg',
    images: Array.from({ length: 38 }, (_, i) => `/images/projects/qian-shou/${String(i + 1).padStart(2, '0')}.jpg`),
    desc: '契约锁是一款面向企业及个人提供电子签约服务的工具型产品，为企业提供合法有效的电子印章、在线签署与合同管理一体化服务。',
    num: '02',
    sub: 'PRODUCT',
  },
]
