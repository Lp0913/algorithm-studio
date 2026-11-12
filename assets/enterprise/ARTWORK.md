# 城市模型品牌主视觉

- 生成方式：内置 `image_gen`，非 CLI/API 回退。
- 用途：志通达算法研发工作室官网的品牌概念插画。
- 性质：人工智能生成的建筑模型概念视觉，**不是实际算法输出、客户案例或真实城市测绘结果**。
- 原图：1448 × 1086，4:3；PNG 原件保存在本地设计档案 `artifacts/enterprise-hero/`，网站仓库仅收录网页版本。
- 网页版本：`hero-city-model.jpg`，JPEG 质量 80，保留相同尺寸与完整构图，未裁切或修改画面。
- 校验：已查看原始生成图，完整城市模型、白底、铜橙建筑、河流桥梁和边缘线框符合视觉 brief；无文字、界面、标志或水印。

## Final prompt

```text
Use case: stylized-concept. Asset type: premium enterprise algorithm R&D website hero visual, NOT a UI mockup. Primary request: an exquisite precision architectural scale model of a realistic compact city district, seen from a clean 35-degree elevated isometric view. A modest river crosses the district, with one practical bridge connecting a rational street grid, mixed mid-rise white buildings, a few taller office towers, and quiet urban blocks. White and very light warm-gray matte model materials, delicate physically plausible shadows, carefully modeled windows and edges, authentic architectural scale, refined architectural-studio model photography. A very small number of selected buildings are muted copper-orange; all other surfaces remain white/light gray. At the far edge of the model only, a restrained transition from fine gray wireframe and a sparse point cloud into solid city geometry hints at data becoming reality. No futuristic fantasy structures. Composition: horizontal 4:3 image; complete model fully inside frame with generous clean white breathing space, centered slightly to the right, no cropped buildings, model occupies about 74% of image width and 65% height. Seamless pure white studio background (#ffffff) and white floor naturally blending into web page. Soft daylight, crisp exceptional craftsmanship, calm, intelligent and credible. This is a conceptual architectural illustration, not an actual detection output. No text, no numbers, no labels, no charts, no interface overlays, no floating HUD, no logos, no watermark, no glow, no neon, no purple, no gradients, no dramatic black background. High resolution.
```
