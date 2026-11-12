# 志通达算法研发工作室

官方网站：所想，皆可抵达。静态 HTML / CSS / JavaScript，无需构建或安装依赖。

## 本地预览

在仓库目录运行：

```sh
python3 -m http.server 8855
```

打开 `http://localhost:8855/`。GitHub Pages 可直接从 `main` 分支根目录发布。

## 主要文件

- `index.html`：首页、35 项算法示例、10 个视频的数据和展示内容。
- `studio.css`：炭黑、雾白和橙色视觉体系，桌面、平板、手机布局及动效。
- `studio.js`：影像对比、目录搜索与筛选、视频切换、移动导航和滚动交互。
- `assets/studio-mark.svg`：当前品牌图形。
- `assets/项目需求清单.txt`：访客可下载的需求整理模板。

此前的样式与脚本保留在仓库中；当前首页只加载 `studio.css` 和 `studio.js`。

## 后续添加联系方式

在 `index.html` 中查找 `data-contact-slot`，填入实际邮箱、微信或其他对外联系渠道，并移除该元素的 `hidden`。目前未设置虚构联系方式。

## 内容维护

算法卡片保留 `algorithm-分类序号-项目序号` 的稳定 ID，便于分享具体位置。新增或删除算法时同步更新目录数量、分类数量和页面文案。视频信息在 `#media-data` JSON 内，需提供实际宽高以避免黑边。

效果图片与视频的许可及出处记录保留在各资产目录中的 `NOTICE.md`、JSON 和 licenses 文件中。修改或分发素材时保留相应声明；页面中的演示不代表已交付的客户项目或约定的模型指标。

## 动效设计参考

参考 [Lenis](https://github.com/darkroomengineering/lenis)、[Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) 和 [Satus](https://github.com/darkroomengineering/satus) 的原生滚动、统一帧更新和渐进增强思路。本页采用原生实现，没有引入上述库。

支持键盘操作影像对比，遵循系统“减少动态效果”设置；默认完整展示算法内容。
