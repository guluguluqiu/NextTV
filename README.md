# NextTV

<div align="center">
  <img src="./public/logo.png" alt="NextTV Logo" width="50" height="50" />

  <p><strong>现代化的视频流媒体播放平台</strong></p>

  <p>
    一个功能丰富的视频流媒体应用，支持多源搜索、智能播放、弹幕互动和历史记录管理
  </p>
</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.2-38bdf8?logo=tailwindcss)
![ArtPlayer](https://img.shields.io/badge/ArtPlayer-5.4.0-ff6b6b)
![HLS.js](https://img.shields.io/badge/HLS.js-1.6.15-ec407a)
![License](https://img.shields.io/badge/License-MIT-green)
![Docker Ready](https://img.shields.io/badge/Docker-ready-blue?logo=docker)

</div>

---

## 特性

- 🔒 **密码登录** - 支持密码登录
- 🎬 **多源视频搜索** - 支持自定义多个视频源 API，聚合搜索电影和电视剧
- 🎬 **预测速** - 支持自定义多个视频源 API，聚合搜索电影和电视剧
- 🎥 **高级播放器** - 基于 Artplayer，支持 HLS/M3U8 流媒体播放
- 💬 **弹幕系统** - 实时弹幕显示，支持多个弹幕源配置
- 🚀 **去广告功能** - 自动过滤 M3U8 流中的广告片段
- ⏭️ **智能跳过** - 自动跳过片头片尾，可自定义跳过时间点
- 📝 **播放历史** - 自动保存观看进度，随时继续观看
- ⭐ **收藏管理** - 收藏喜爱的视频，方便快速访问
- 🎯 **豆瓣推荐** - 集成豆瓣 API，展示热门和高分影视内容
- 🎯 **红果短剧推荐** - 基于红果短剧数据，展示热门和高分短剧内容
- 🔗 **自定义豆瓣代理** - 自定义豆瓣 API 代理和图片代理，防止连接问题
- ⚙️ **灵活配置** - 可视化管理视频源和弹幕源，支持导入导出
- ⌨️ **快捷键支持** - 丰富的键盘快捷键，提升观看体验
- 🔔 **首页剧集更新提醒** - 首页继续观看区域展示剧集更新提醒
- 🔗 **直链播放** - 支持直链播放(尝试使用openlist的链接播放高清视频)，支持 FLV、TS、MP4 等多种格式
- 🔗 **视频源探索** - 直接探索视频源内容

---

<details>
  <summary>点击查看项目截图</summary>
  <img src="https://tncache1-f1.v3mh.com/image/2026/01/16/3c7155e313df3bdae29b66815a42b3db.png" alt="主页截图" style="max-width:600px">
  <img src="https://tncache1-f1.v3mh.com/image/2026/01/16/778e5b27c569b953924f7c803d788e83.png" alt="搜索截图" style="max-width:600px">
  <img src="https://tncache1-f1.v3mh.com/image/2026/01/16/0d13d14d462d7c9d7cb250e072f1fdea.png" alt="播放截图" style="max-width:600px">
  <img src="https://tncache1-f1.v3mh.com/image/2026/01/16/fc1aaa5124285bf4d02fc8df8193821c.png" alt="设置截图" style="max-width:600px">
</details>

---

---

### 重要说明：

- **本项目为空壳播放器，自带唯一播放源不稳定，仅供学习使用，请自行更换播放源**
- **本项目不添加用户登录以及认证功能**
- **本项目完全由 Claude Code 生成，仅作为学习参考，请勿用于商业用途**

---

## 技术栈

### 核心框架

- **Next.js** 16.2.1 - React 服务端渲染框架
- **React** 19.2.4 - 用户界面构建库
- **Tailwind CSS** 4.1.18 - 现代化 CSS 框架

### 播放器相关

- **Artplayer** 5.4.0 - 功能丰富的 HTML5 视频播放器
- **HLS.js** 1.6.15 - HTTP Live Streaming 支持
- **artplayer-plugin-danmuku** 5.3.0 - 弹幕插件

### 状态管理

- **Zustand** 5.0.10 - 轻量级状态管理库

使用 EdgeOne 部署

添加密码登录功能
## 致谢

- [Artplayer](https://github.com/zhw2590582/ArtPlayer) - 优秀的 HTML5 视频播放器
- [LunaTV](https://github.com/SzeMeng76/LunaTV) - 功能复杂的 Next.js 的播放器
- [LibreTV](https://github.com/LibreSpark/LibreTV) - 简易但不简单的播放器，本项目修改自 LibreTV
- [豆瓣](https://movie.douban.com/) - 提供影视推荐数据
- [CMLiussss](https://github.com/cmliu) - 感谢 CMLiussss 的 douban 代理
- [Next.js](https://nextjs.org/) - React 服务端渲染框架
- [Tailwind CSS](https://tailwindcss.com/) - 现代化 CSS 框架

---

<div align="center">
  <p>Made with ❤️ by Xiaoguang </p>
</div>
