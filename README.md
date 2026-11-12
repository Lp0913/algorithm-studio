# 志通达算法研发工作室

企业官网：面向遥感调查、视觉巡检与视频分析，展示从样本验证、算法研发到部署集成的服务能力。静态 HTML / CSS / JavaScript，无需构建或安装依赖。

## 当前页面

- 行业方案：遥感调查与空间分析、工业巡检与缺陷识别、视频识别与目标追踪。
- 应用效果：大幅展示农业大棚提取、道路裂缝分割、双期影像与色彩处理对比，并提供 10 段视频演示。
- 算法能力：6 个方向、35 行目录默认完整展开，逐项说明用途、输入和输出，支持关键词搜索与分类筛选。
- 交付与合作：说明交付内容、验收关注点和项目推进流程。
- 需求准备：访客可填写场景、业务目标、数据情况和部署需求，在浏览器中生成 TXT 需求摘要，也可下载空白清单。

## 本地预览

在仓库目录运行：

```sh
python3 -m http.server 8855
```

打开 `http://localhost:8855/`。GitHub Pages 可直接从 `main` 分支根目录发布。

## 主要文件

- `index.html`：行业方案、应用效果、35 行算法目录、交付与合作内容，以及 10 个视频的数据。
- `studio.css`：白色主体、石墨色文字和铜橙强调色，桌面、平板、手机布局及动效。
- `studio.js`：影像对比、目录搜索与筛选、视频切换、移动导航、滚动交互和本地需求文件生成。
- `assets/studio-mark.svg`：当前品牌图形。
- `assets/enterprise/`：首页城市建筑模型概念视觉、网页图片、生成提示词和素材说明。
- `assets/项目需求清单.txt`：访客可下载的需求整理模板。

此前的样式与脚本保留在仓库中；当前首页只加载 `studio.css` 和 `studio.js`。

## 后续添加联系方式

在 `index.html` 中查找 `data-contact-slot`，填入实际邮箱、微信或其他对外联系渠道，并移除该元素的 `hidden`。目前未设置虚构联系方式。

## 内容维护

算法目录行保留 `algorithm-分类序号-项目序号` 的稳定 ID，便于分享具体位置。新增或删除算法时同步更新目录数量、分类数量和页面文案。每行的“查看示例”指向对应效果素材。视频信息在 `#media-data` JSON 内，需提供实际宽高以避免黑边。

需求表单位于 `#project-brief`，仅在客户端生成带 UTF-8 BOM 的中文 TXT 文件；不会上传、发送或持久保存输入内容。业务目标必填且不超过 240 个字符，数据说明不超过 1000 个字符。提交按钮初始禁用，由脚本安装本地下载逻辑后启用；禁用 JavaScript 时仍可下载空白需求清单。

`assets/enterprise/hero-city-model.jpg` 为首页使用的城市建筑模型概念插画；提示词与说明保留在该目录，原始 PNG 保存在本地设计档案。该视觉由人工智能生成，不是实际算法输出、客户案例或真实城市测绘结果。详见 [素材说明](assets/enterprise/ARTWORK.md)。

效果图片与视频的许可及出处记录保留在各资产目录中的 `NOTICE.md`、JSON 和 licenses 文件中。修改或分发素材时保留相应声明；页面中的演示不代表已交付的客户项目或约定的模型指标。

## 设计与动效参考

版式与信息层级参考 [IBM Design Language](https://www.ibm.com/design/language/layout/overview/) 和 [Carbon for IBM.com](https://github.com/carbon-design-system/carbon-for-ibm-dotcom) 的网格与营销页面组织原则。本页没有引入 Carbon 组件库。

参考 [Lenis](https://github.com/darkroomengineering/lenis)、[Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) 和 [Satus](https://github.com/darkroomengineering/satus) 的原生滚动、统一帧更新和渐进增强思路。本页采用原生实现，没有引入上述库。

支持键盘操作影像对比，遵循系统“减少动态效果”设置；默认完整展示算法内容。
