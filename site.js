const $ = id => document.getElementById(id);

const openMedia = [
  {
    "id": "traffic-tracking",
    "file": "traffic.gif",
    "title": "交通目标持续追踪",
    "desc": "在道路视频中关联目标标识，展示车辆运动与轨迹。",
    "repo": "tryolabs/norfair",
    "license": "BSD-3-Clause",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/traffic.gif",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "repository": "https://github.com/tryolabs/norfair",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/README.md",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "traffic-tracking.mp4",
    "poster": "traffic-tracking.jpg",
    "original_sha256": "1f7bd15d1ad0451864646eba04270b5463d13e0c00a1f95417bda7dfc4b742cc",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "prompt-matting",
    "title": "提示式图像抠图",
    "desc": "通过提示选择目标，展示前景与背景分离。",
    "repo": "shi-labs/Matting-Anything",
    "commit": "eb01e1c1f0016e2a4d00615b115f3b5ddcd031e4",
    "url": "https://raw.githubusercontent.com/shi-labs/Matting-Anything/eb01e1c1f0016e2a4d00615b115f3b5ddcd031e4/assets/teaser.gif",
    "source_page": "https://github.com/shi-labs/Matting-Anything/blob/eb01e1c1f0016e2a4d00615b115f3b5ddcd031e4/assets/teaser.gif",
    "license": "MIT",
    "license_file": "licenses/MATTING-ANYTHING-MIT.txt",
    "video": "prompt-matting.mp4",
    "poster": "prompt-matting.jpg",
    "original_sha256": "684f501b4512fb0a07cee9ac59952ff41edafab04ebb3ab40f681f3929cfd05c",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  },
  {
    "id": "visual-annotations",
    "file": "annotation.mp4",
    "title": "多类型视觉结果标注",
    "desc": "直观看到检测框、轮廓与标签等算法输出的表达方式。",
    "repo": "roboflow/supervision",
    "license": "MIT",
    "url": "https://github.com/roboflow/supervision/assets/26109316/691e219c-0565-4403-9218-ab5644f39bce",
    "commit": "50b4f2a7b2fc08e365c771e9ce43f47244bb056f",
    "repository": "https://github.com/roboflow/supervision",
    "source_page": "https://github.com/roboflow/supervision/blob/50b4f2a7b2fc08e365c771e9ce43f47244bb056f/README.md",
    "license_file": "licenses/SUPERVISION-MIT.txt",
    "video": "visual-annotations.mp4",
    "poster": "visual-annotations.jpg",
    "original_sha256": "e47d3d715453be6c123e6619b517d55f5c82a8544691d5be9082822023ba2172",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "tracking-3d",
    "file": "3d.gif",
    "title": "三维目标追踪",
    "desc": "在三维空间中关联目标位置，观察轨迹与持续跟踪结果。",
    "repo": "tryolabs/norfair",
    "license": "BSD-3-Clause",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/3d.gif",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "repository": "https://github.com/tryolabs/norfair",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/README.md",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "tracking-3d.mp4",
    "poster": "tracking-3d.jpg",
    "original_sha256": "bfbbd79e5b3c919b779119e6b2f36f7f8a48422328393647153499dfc64a19b8",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "pose-tracking",
    "file": "alphapose.gif",
    "title": "人体关键点追踪",
    "desc": "通过连续关键点展示姿态变化和跨帧关联。",
    "repo": "tryolabs/norfair",
    "license": "BSD-3-Clause",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/alphapose.gif",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "repository": "https://github.com/tryolabs/norfair",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/README.md",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "pose-tracking.mp4",
    "poster": "pose-tracking.jpg",
    "original_sha256": "6b6d0dab50ee3cd8c899ea81660b2e88c6ed0c222869d1d23ff59486c410af59",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "camera-motion",
    "file": "camera_stabilization.gif",
    "title": "运动相机下的目标追踪",
    "desc": "在相机移动的画面中观察稳定的目标关联。",
    "repo": "tryolabs/norfair",
    "license": "BSD-3-Clause",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/camera_stabilization.gif",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "repository": "https://github.com/tryolabs/norfair",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/README.md",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "camera-motion.mp4",
    "poster": "camera-motion.jpg",
    "original_sha256": "08d1daf2438088be54d2567bd8ffd1a5ca1c2423886fad071e591afb6062a7f8",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "pedestrian-tracking",
    "title": "行人目标追踪",
    "desc": "连续画面中的行人检测与编号。",
    "repo": "tryolabs/norfair",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/yolov5_pedestrian.gif",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/yolov5_pedestrian.gif",
    "license": "BSD-3-Clause",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "pedestrian-tracking.mp4",
    "poster": "pedestrian-tracking.jpg",
    "original_sha256": "5c8d5bf550d8a926f42dc33de6910b616c39cfc41a3dea12f33c497d85964059",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  },
  {
    "id": "pose-frame-skipping",
    "title": "间隔帧姿态追踪",
    "desc": "跳帧条件下的人体关键点关联。",
    "repo": "tryolabs/norfair",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/openpose_skip_3_frames.gif",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/openpose_skip_3_frames.gif",
    "license": "BSD-3-Clause",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "pose-frame-skipping.mp4",
    "poster": "pose-frame-skipping.jpg",
    "original_sha256": "885f0973460edc0eded0ceb23bdc0eb3f9b1e2c79fe2174c244461e962337970",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  },
  {
    "id": "traffic-mmdet",
    "title": "交通检测与轨迹关联",
    "desc": "基于 MMDetection 检测结果的道路目标追踪。",
    "repo": "tryolabs/norfair",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/traffic_mmdet.gif",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/traffic_mmdet.gif",
    "license": "BSD-3-Clause",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "traffic-mmdet.mp4",
    "poster": "traffic-mmdet.jpg",
    "original_sha256": "672c6ba9e61aa4d140d2362f4c1f95c84c10162d91079907db160cc9a96e0106",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  },
  {
    "id": "traffic-yolov7",
    "title": "道路车辆追踪",
    "desc": "车辆检测结果在连续帧中的关联。",
    "repo": "tryolabs/norfair",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/yolov7_cars.gif",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/yolov7_cars.gif",
    "license": "BSD-3-Clause",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "traffic-yolov7.mp4",
    "poster": "traffic-yolov7.jpg",
    "original_sha256": "d0e9b5b09b04f5f2aeadd07d52e37e467d45a71daf2ffa88b55e2c0fe50d505e",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  }
];
const mediaById=new Map(openMedia.map(item=>[item.id,item]));

const algorithmDetails = {
  "0-0": {
    "title": "建筑物提取",
    "description": "从卫星或航拍影像中提取建筑物轮廓，形成建筑分布结果。",
    "input": "卫星或航拍影像",
    "output": "建筑物轮廓与位置",
    "application": "城市底图更新、建筑资源调查、园区资产管理",
    "visual": {
      "src": "./assets/algorithm-effects/web/building.jpg",
      "alt": "建筑影像、参考标注与建筑预测掩膜对照",
      "caption": "将建筑从背景中分离，输出可查看的区域掩膜。"
    }
  },
  "0-1": {
    "title": "地块提取",
    "description": "根据影像中的边界与纹理划分地块，辅助地块调查与管理。",
    "input": "遥感影像",
    "output": "地块边界与分布",
    "application": "地块调查、农业地块管理、用地范围统计",
    "visual": {
      "src": "./assets/algorithm-effects/web/field-segmentation.jpg",
      "alt": "农田影像与地块语义及实例分割结果对照",
      "caption": "区分相邻地块，输出地块范围与独立边界。"
    }
  },
  "0-2": {
    "title": "水体提取",
    "description": "识别河流、湖泊等水域，提取水体范围与边界。",
    "input": "遥感影像",
    "output": "水体范围与边界",
    "application": "水域调查、水面变化监测、河湖巡查",
    "visual": {
      "src": "./assets/algorithm-effects/web/water-segmentation.jpg",
      "alt": "水体影像、参考掩膜与预测掩膜对照。",
      "caption": "对遥感影像中的水域进行像素级分割，输出水体范围与边界。"
    }
  },
  "0-3": {
    "title": "林地提取",
    "description": "识别影像中的林地覆盖范围，辅助森林资源调查。",
    "input": "遥感影像",
    "output": "林地范围与分布",
    "application": "森林资源调查、林地覆盖统计、生态监测",
    "visual": {
      "src": "./assets/algorithm-effects/web/tree-species.jpg",
      "alt": "包含林木类别与草地等地物的像素级分类结果。",
      "caption": "以像素级分类呈现林木覆盖与树种空间分布。"
    }
  },
  "0-4": {
    "title": "大棚提取",
    "description": "提取农业大棚的位置与轮廓，辅助设施农业调查。",
    "input": "高分辨率遥感影像",
    "output": "大棚轮廓与分布",
    "application": "设施农业调查、大棚分布统计、农业用地管理",
    "visual": {
      "src": "./assets/algorithm-effects/web/greenhouse.jpg",
      "alt": "农业大棚提取轮廓叠加在航拍影像上",
      "caption": "用轮廓标出集中分布的农业大棚，便于核查位置与覆盖范围。"
    }
  },
  "0-5": {
    "title": "光伏提取",
    "description": "识别集中式与分布式光伏区域，提取设施的位置与范围。",
    "input": "高分辨率遥感影像",
    "output": "光伏区域轮廓与位置",
    "application": "光伏资源调查、设施分布统计、能源资产管理",
    "visual": {
      "src": "./assets/algorithm-effects/web/solar-panel-detection-segmentation.jpg",
      "alt": "光伏影像、参考掩膜和预测分割结果对照",
      "caption": "从影像中分离光伏组件区域，输出对应的分割掩膜。"
    }
  },
  "1-0": {
    "title": "无人机识别",
    "description": "识别图像或视频中的无人机目标，标记目标位置。",
    "input": "图像或视频帧",
    "output": "无人机类别与位置",
    "application": "空域目标观察、低空巡查、无人机目标定位",
    "visual": {
      "src": "./assets/algorithm-effects/web/uav.jpg",
      "alt": "红外与可见光无人机目标跟踪画面",
      "caption": "在连续画面中定位无人机目标并持续跟踪位置。"
    }
  },
  "1-1": {
    "title": "飞机检测",
    "description": "检测影像中的飞机目标，形成位置标注。",
    "input": "航空或卫星影像",
    "output": "飞机目标位置",
    "application": "机场设施调查、航空影像解译、飞机目标统计",
    "visual": {
      "src": "./assets/algorithm-effects/web/dota-rotated-detections.jpg",
      "alt": "遥感目标检测图中下方的飞机检测结果",
      "caption": "用旋转检测框标出飞机位置与朝向。"
    }
  },
  "1-2": {
    "title": "舰船检测",
    "description": "从海面、港口等场景影像中检测舰船目标。",
    "input": "卫星或航拍影像",
    "output": "舰船目标位置",
    "application": "港口调查、海面目标观察、舰船分布统计",
    "visual": {
      "src": "./assets/algorithm-effects/web/dota-rotated-detections.jpg",
      "alt": "遥感目标检测图中右上方的舰船检测结果",
      "caption": "沿舰船方向标出旋转检测框，区分密集停泊目标。"
    }
  },
  "1-3": {
    "title": "火焰检测",
    "description": "识别画面中的火焰区域，为后续人工复核提供位置线索。",
    "input": "图像或视频帧",
    "output": "疑似火焰区域",
    "application": "现场视频巡查、火情线索发现、重点区域复核",
    "visual": {
      "src": "./assets/algorithm-effects/web/fire-detection.jpg",
      "alt": "多种场景中的火焰检测框结果",
      "caption": "标出疑似火焰区域，提供位置与类别线索。"
    }
  },
  "1-4": {
    "title": "车辆追踪",
    "description": "在连续视频帧中关联车辆，记录同一目标的运动轨迹。",
    "input": "连续视频帧",
    "output": "车辆位置、标识与轨迹",
    "application": "交通流观察、车辆轨迹分析、道路运行统计",
    "visual": {
      "src": "./assets/algorithm-effects/web/traffic-tracking.jpg",
      "alt": "道路车辆检测标识与连续运动轨迹",
      "caption": "为同一辆车关联标识，观察跨帧位置与运动轨迹。"
    }
  },
  "1-5": {
    "title": "桥梁识别",
    "description": "识别影像中的桥梁目标，辅助设施调查与定位。",
    "input": "遥感或航拍影像",
    "output": "桥梁目标位置",
    "application": "交通设施调查、桥梁定位、基础设施管理",
    "visual": {
      "src": "./assets/algorithm-effects/web/dota-rotated-detections.jpg",
      "alt": "遥感目标检测图中右下方的桥梁检测结果",
      "caption": "沿桥梁走向标出目标位置与覆盖范围。"
    }
  },
  "2-0": {
    "title": "建筑物变化检测",
    "description": "对比同一区域的不同时期影像，标出建筑新增、拆除等变化。",
    "input": "对齐的多期遥感影像",
    "output": "建筑变化区域",
    "application": "城市更新调查、建筑新增与拆除核查",
    "visual": {
      "src": "./assets/algorithm-effects/web/building-height-13.jpg",
      "alt": "同一区域双期建筑密度与高度变化分布图",
      "caption": "用正负差值区分建筑密度与高度的变化区域。"
    }
  },
  "2-1": {
    "title": "地物变化检测",
    "description": "对比多期影像，定位地物覆盖发生变化的区域。",
    "input": "对齐的多期遥感影像",
    "output": "地物变化区域",
    "application": "区域变化调查、用地变化复核、专题制图",
    "visual": {
      "src": "./assets/algorithm-effects/web/vegas-1999.jpg",
      "alt": "同一区域的两期卫星影像",
      "caption": "对比两期影像，观察建成区扩展与水域范围变化。",
      "secondSrc": "./assets/algorithm-effects/web/vegas-2024.jpg"
    }
  },
  "2-2": {
    "title": "时序分析",
    "description": "分析同一区域的连续观测，呈现目标随时间的变化趋势。",
    "input": "连续多期影像或观测数据",
    "output": "时序变化曲线与区域",
    "application": "区域发展观察、植被时序分析、长期变化统计",
    "visual": {
      "src": "./assets/algorithm-effects/web/satellite-timeseries-map.jpg",
      "alt": "NDVI 变化曲线与时间序列地表类别对照",
      "caption": "沿时间轴查看植被指数变化及对应的地表覆盖类别。"
    }
  },
  "2-3": {
    "title": "建筑物高度估计",
    "description": "结合可用影像和空间信息，估计建筑物高度。",
    "input": "影像及可用空间信息",
    "output": "建筑物高度估计值",
    "application": "城市三维分析、建筑高度分布调查",
    "visual": {
      "src": "./assets/algorithm-effects/web/building-height-0.jpg",
      "alt": "建筑密度与建筑高度米制空间分布对照",
      "caption": "以颜色呈现建筑高度估计值，查看空间分布与密度差异。"
    }
  },
  "2-4": {
    "title": "光伏选址",
    "description": "结合地形、地物和项目约束，筛选光伏建设的候选区域。",
    "input": "遥感影像、地形与约束数据",
    "output": "候选区域与筛选结果",
    "application": "候选区域筛选、光伏资源调查、建设条件评价",
    "visual": {
      "src": "./assets/algorithm-effects/web/solar-site-suitability.jpg",
      "alt": "光伏选址适宜性评分与候选地块",
      "caption": "按适宜性评分区分区域，并勾勒候选建设地块。"
    }
  },
  "3-0": {
    "title": "影像超分",
    "description": "提高低分辨率影像的显示细节，为后续查看和分析提供输入。",
    "input": "低分辨率影像",
    "output": "超分辨率影像",
    "application": "低分辨率影像处理、历史图像细节改善",
    "visual": {
      "src": "./assets/algorithm-effects/web/super-resolution.jpg",
      "alt": "超分辨率处理前后的图像细节对照。",
      "caption": "超分辨率处理前后的图像细节对照。"
    }
  },
  "3-1": {
    "title": "影像增强",
    "description": "调整亮度、对比度等影像表现，改善数据的可读性。",
    "input": "待增强影像",
    "output": "增强后的影像",
    "application": "低对比度图像处理、图像细节增强",
    "visual": {
      "src": "./assets/algorithm-effects/web/contrast-enhancement.jpg",
      "alt": "增强局部对比度，呈现暗部与细节信息。",
      "caption": "增强局部对比度，呈现暗部与细节信息。"
    }
  },
  "3-2": {
    "title": "影像配准",
    "description": "对齐不同时间或来源的影像，为变化分析和数据融合做准备。",
    "input": "参考影像与待配准影像",
    "output": "对齐影像与配准参数",
    "application": "多期影像对齐、多源数据融合准备",
    "visual": {
      "src": "./assets/algorithm-effects/web/image-registration.jpg",
      "alt": "对照配准前后地物边界的位置变化。",
      "caption": "对照配准前后地物边界的位置变化。"
    }
  },
  "3-3": {
    "title": "影像分割",
    "description": "按目标或类别划分影像像素，形成区域级识别结果。",
    "input": "待分割影像",
    "output": "区域掩膜或分类图",
    "application": "场景要素识别、目标区域划分、专题图制作",
    "visual": {
      "src": "./assets/algorithm-effects/web/semantic-segmentation.jpg",
      "alt": "按像素区分道路、车辆、建筑等区域。",
      "caption": "按像素区分道路、车辆、建筑等区域。"
    }
  },
  "3-4": {
    "title": "影像镶嵌",
    "description": "拼接多幅具有重叠区域的影像，形成连续覆盖的图像。",
    "input": "多幅重叠影像",
    "output": "拼接影像",
    "application": "航拍图像拼接、区域影像整合",
    "visual": {
      "src": "./assets/algorithm-effects/web/image-mosaic.jpg",
      "alt": "多张重叠影像匹配后融合为连续画面。",
      "caption": "多张重叠影像匹配后融合为连续画面。"
    }
  },
  "3-5": {
    "title": "匀光匀色",
    "description": "统一多幅影像的亮度与色彩表现，减少拼接处的视觉差异。",
    "input": "多幅待处理影像",
    "output": "色调一致的影像",
    "application": "多幅图像色彩统一、拼接过渡优化",
    "visual": {
      "src": "./assets/algorithm-effects/web/color-before.jpg",
      "alt": "上图为补偿前，下图为曝光补偿后的拼接结果。",
      "caption": "上图为补偿前，下图为曝光补偿后的拼接结果。",
      "secondSrc": "./assets/algorithm-effects/web/color-after.jpg",
      "secondAlt": "曝光补偿后的拼接画面。"
    }
  },
  "4-0": {
    "title": "农作物分类",
    "description": "识别影像中的作物类别，呈现种植类型与空间分布。",
    "input": "遥感影像及标注样本",
    "output": "作物类别与分布",
    "application": "种植结构调查、农作物分布统计、农业监测",
    "visual": {
      "src": "./assets/algorithm-effects/web/crop-classification.jpg",
      "alt": "以不同颜色区分作物类别，并提取农田地块边界。",
      "caption": "以不同颜色区分作物类别，并提取农田地块边界。"
    }
  },
  "4-1": {
    "title": "树木分类",
    "description": "结合影像特征区分树木类别，辅助林业调查。",
    "input": "航拍或地面影像",
    "output": "树木类别与位置",
    "application": "林业调查、树种分布分析、生态资源管理",
    "visual": {
      "src": "./assets/algorithm-effects/web/tree-species.jpg",
      "alt": "树种分类结果以不同颜色呈现树木类型及空间分布。",
      "caption": "树种分类结果以不同颜色呈现树木类型及空间分布。"
    }
  },
  "4-2": {
    "title": "病虫害检测",
    "description": "识别作物或树木上的疑似病虫害表现，标出复核目标。",
    "input": "作物或树木图像",
    "output": "疑似病虫害类别与区域",
    "application": "农业巡查、叶片病害筛查、样本辅助复核",
    "visual": {
      "src": "./assets/algorithm-effects/web/plant-disease-explainability.jpg",
      "alt": "病叶原图、分类模型热图与热图叠加结果对照。",
      "caption": "展示叶片病害分类结果的模型关注区域。"
    }
  },
  "4-3": {
    "title": "羊群检测",
    "description": "检测画面中的羊只，辅助群体定位和数量统计。",
    "input": "图像或视频帧",
    "output": "羊只位置与计数",
    "application": "牧场巡查、羊群目标统计、航拍监测",
    "visual": {
      "src": "./assets/algorithm-effects/web/sheep-detection.jpg",
      "alt": "在航拍画面中标出羊只位置，辅助群体计数。",
      "caption": "在航拍画面中标出羊只位置，辅助群体计数。"
    }
  },
  "4-4": {
    "title": "牛群检测",
    "description": "检测画面中的牛只，辅助群体定位和数量统计。",
    "input": "图像或视频帧",
    "output": "牛只位置与计数",
    "application": "牧场巡查、牛群目标定位、养殖统计",
    "visual": {
      "src": "./assets/algorithm-effects/web/cow-detection.jpg",
      "alt": "在牧场影像中标出牛只的位置。",
      "caption": "在牧场影像中标出牛只的位置。"
    }
  },
  "4-5": {
    "title": "水面垃圾识别",
    "description": "识别水面的疑似漂浮垃圾，为清理与巡查提供位置线索。",
    "input": "水面巡查图像或视频",
    "output": "疑似垃圾位置与类别",
    "application": "河湖巡查、漂浮物定位、清理作业辅助",
    "visual": {
      "src": "./assets/algorithm-effects/web/floating-trash.jpg",
      "alt": "水面漂浮瓶类垃圾的检测结果，检测框标出了目标位置",
      "caption": "定位水面漂浮垃圾，标记目标类别与位置。"
    }
  },
  "5-0": {
    "title": "输电线路隐患检测",
    "description": "分析输电线路巡检影像，标出疑似设施隐患与周边风险。",
    "input": "输电线路巡检影像",
    "output": "疑似隐患位置与类别",
    "application": "输电设施巡检、绝缘子缺陷复核、线路维护",
    "visual": {
      "src": "./assets/algorithm-effects/web/insulator-defects.jpg",
      "alt": "定位绝缘子上的闪络、破损和缺片等异常位置。",
      "caption": "定位绝缘子上的闪络、破损和缺片等异常位置。"
    }
  },
  "5-1": {
    "title": "光伏缺陷检测",
    "description": "分析可见光或热成像数据，标出疑似光伏组件缺陷。",
    "input": "光伏巡检图像",
    "output": "疑似缺陷区域与类别",
    "application": "光伏组件巡检、疑似缺陷定位、运维辅助",
    "visual": {
      "src": "./assets/algorithm-effects/web/pv-thermal-defects-confirmed.jpg",
      "alt": "光伏组件缺陷的红外、灰度与伪彩色分析对照",
      "caption": "通过红外与图像处理结果定位组件热点，辅助复核故障单元。"
    }
  },
  "5-2": {
    "title": "安全帽识别",
    "description": "检测作业人员及安全帽佩戴情况，标出需要复核的目标。",
    "input": "作业现场图像或视频",
    "output": "人员位置与佩戴识别结果",
    "application": "作业现场巡查、安全帽佩戴识别",
    "visual": {
      "src": "./assets/algorithm-effects/web/helmet-demo.jpg",
      "alt": "标出作业人员头部的安全帽佩戴情况。",
      "caption": "标出作业人员头部的安全帽佩戴情况。"
    }
  },
  "5-3": {
    "title": "焊接件缺陷检测",
    "description": "识别焊接件图像中的疑似缺陷，辅助工业质量检查。",
    "input": "焊接件检测图像",
    "output": "疑似缺陷位置与类别",
    "application": "焊接质量检查、X 光图像分析、缺陷辅助复核",
    "visual": {
      "src": "./assets/algorithm-effects/web/weld-defects.jpg",
      "alt": "在焊缝影像中标记缺陷位置，并提取缺陷轮廓。",
      "caption": "在焊缝影像中标记缺陷位置，并提取缺陷轮廓。"
    }
  },
  "5-4": {
    "title": "齿轮瑕疵检测",
    "description": "分析齿轮表面图像，标出疑似瑕疵区域。",
    "input": "齿轮表面图像",
    "output": "疑似瑕疵区域",
    "application": "齿轮表面检查、缺损与划痕识别",
    "visual": {
      "src": "./assets/algorithm-effects/web/gear-defects.jpg",
      "alt": "不同转角下齿轮表面暗斑缺陷的检测结果",
      "caption": "在不同角度的齿轮表面标记暗斑缺陷位置。"
    }
  },
  "5-5": {
    "title": "道路裂缝检测",
    "description": "提取道路表面的裂缝位置与轮廓，辅助路面巡检。",
    "input": "路面图像",
    "output": "裂缝轮廓或分割掩膜",
    "application": "道路养护巡查、路面病害定位、裂缝轮廓提取",
    "visual": {
      "src": "./assets/algorithm-effects/web/crack-input.jpg",
      "alt": "道路原图与裂缝分割掩膜对照。",
      "caption": "从路面图像中提取裂缝轮廓，输出像素级分割结果。",
      "secondSrc": "./assets/algorithm-effects/web/crack-mask.jpg"
    }
  }
};

const algorithmDialog = $('algorithm-dialog');

const directoryTabs = [...document.querySelectorAll('.directory-index [role="tab"]')];
const directoryPanels = [...document.querySelectorAll('.directory-panel')];
const categoryOverviews = new Map(directoryPanels.map(panel => [panel.id, {
 title: panel.querySelector('.directory-info h3').textContent,
 description: panel.querySelector('.directory-info > p:last-child').textContent,
 input: panel.querySelectorAll('.directory-details dd')[0].textContent,
 output: panel.querySelectorAll('.directory-details dd')[1].textContent
}]));

function selectAlgorithm(panel, link) {
 const details = link.dataset.algorithm === 'overview'
  ? categoryOverviews.get(panel.id)
  : algorithmDetails[link.dataset.algorithm];
 for (const item of panel.querySelectorAll('[data-algorithm]')) {
  if (item === link) item.setAttribute('aria-current', 'page');
  else item.removeAttribute('aria-current');
 }
 const category = $(panel.getAttribute('aria-labelledby')).querySelector('span:nth-child(2)').textContent;
 panel.querySelector('.directory-overline').textContent = category + ' / ' + link.textContent;
 panel.querySelector('.directory-info h3').textContent = details.title;
 panel.querySelector('.directory-info > p:last-child').textContent = details.description;
 const outputs = panel.querySelectorAll('.directory-details dd');
 outputs[0].textContent = details.input;
 outputs[1].textContent = details.output;
}

function openAlgorithmWindow(panel, link) {
 const details = algorithmDetails[link.dataset.algorithm];
 const visual = details.visual;
 const category = $(panel.getAttribute('aria-labelledby')).querySelector('span:nth-child(2)').textContent;
 $('algorithm-breadcrumb').textContent = category + ' / 算法详情';
 $('algorithm-title').textContent = details.title;
 $('algorithm-description').textContent = details.description;
 $('algorithm-input').textContent = details.input;
 $('algorithm-output').textContent = details.output;
 $('algorithm-application').textContent = details.application;
 const image = $('algorithm-effect-image');
 image.src = visual.src;
 image.alt = visual.alt;
 const second = $('algorithm-effect-second');
 second.hidden = !visual.secondSrc;
 if (visual.secondSrc) {
  second.src = visual.secondSrc;
  second.alt = visual.secondAlt;
 } else {
  second.removeAttribute('src');
 }
 $('algorithm-effect-caption').textContent = visual.caption;
 algorithmDialog.dataset.hash = link.hash;
 algorithmDialog.dataset.category = panel.getAttribute('aria-labelledby');
 if (!algorithmDialog.open) algorithmDialog.showModal();
}

$('algorithm-close').addEventListener('click', () => algorithmDialog.close());
$('algorithm-contact').addEventListener('click', event => {
 event.preventDefault();
 setDirectoryHash('#contact');
 algorithmDialog.close();
 $('contact').scrollIntoView();
});
algorithmDialog.addEventListener('click', event => {
 if (event.target === algorithmDialog) algorithmDialog.close();
});
algorithmDialog.addEventListener('close', () => {
 if (algorithmDialog.open || location.hash !== algorithmDialog.dataset.hash) return;
 const category = $(algorithmDialog.dataset.category);
 history.replaceState(null, '', '#' + category.id);
 selectCapability(category);
});

function selectCapability(selected) {
 for (const tab of directoryTabs) {
  const active = tab === selected;
  const panel = $(tab.getAttribute('aria-controls'));
  tab.setAttribute('aria-selected', String(active));
  tab.tabIndex = active ? 0 : -1;
  if (!active && !panel.hidden) panel.querySelector('video')?.pause();
  panel.hidden = !active;
 }
 const panel = $(selected.getAttribute('aria-controls'));
 selectAlgorithm(panel, panel.querySelector('[data-algorithm="overview"]'));
}

function setDirectoryHash(hash) {
 if (location.hash !== hash) history.pushState(null, '', hash);
}

directoryTabs.forEach((tab, index) => {
 tab.addEventListener('click', () => {
  selectCapability(tab);
  setDirectoryHash('#' + tab.id);
 });
 tab.addEventListener('keydown', event => {
  const offsets = {ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1};
  let next = index;
  if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = directoryTabs.length - 1;
  else if (event.key in offsets) next = (index + offsets[event.key] + directoryTabs.length) % directoryTabs.length;
  else return;
  event.preventDefault();
  const selected = directoryTabs[next];
  selectCapability(selected);
  setDirectoryHash('#' + selected.id);
  selected.focus();
 });
});

document.querySelectorAll('[data-algorithm]').forEach(link => {
 link.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  selectAlgorithm(link.closest('.directory-panel'), link);
  setDirectoryHash(link.hash);
  if (link.dataset.algorithm !== 'overview') openAlgorithmWindow(link.closest('.directory-panel'), link);
 });
});

function openLinkedCapability() {
 if (location.hash === '#light' || !location.hash) {
  selectCapability(directoryTabs[0]);
  if (algorithmDialog.open) algorithmDialog.close();
  return;
 }
 const target = $(location.hash.slice(1));
 if (!target) {
  if (algorithmDialog.open) algorithmDialog.close();
  return;
 }
 if (directoryTabs.includes(target)) {
  selectCapability(target);
  if (algorithmDialog.open) algorithmDialog.close();
 } else if (target.matches('[data-algorithm]')) {
  const panel = target.closest('.directory-panel');
  selectCapability($(panel.getAttribute('aria-labelledby')));
  selectAlgorithm(panel, target);
  if (target.dataset.algorithm !== 'overview') openAlgorithmWindow(panel, target);
  else if (algorithmDialog.open) algorithmDialog.close();
 } else if (algorithmDialog.open) {
  algorithmDialog.close();
 }
}

document.querySelectorAll('[data-capability]').forEach(link => {
 link.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const tab = $(link.dataset.capability);
  selectCapability(tab);
  setDirectoryHash(link.hash);
  tab.focus({preventScroll: true});
  const section = matchMedia('(max-width: 680px)').matches ? tab : $('light');
  section.scrollIntoView();
 });
});
window.addEventListener('hashchange', openLinkedCapability);
window.addEventListener('popstate', openLinkedCapability);
openLinkedCapability();

const screeningVideo = $('screening-video');
const screeningButtons = [...document.querySelectorAll('[data-screening]')];
const screeningError = $('screening-error');
function showScreeningError() {
 screeningError.hidden = false;
}
screeningVideo.addEventListener('error', showScreeningError);
screeningVideo.querySelector('source').addEventListener('error', showScreeningError);
screeningVideo.addEventListener('loadeddata', () => { screeningError.hidden = true; });
screeningButtons.forEach(button => {
 button.addEventListener('click', () => {
  const media = mediaById.get(button.dataset.screening);
  for (const choice of screeningButtons) {
   choice.setAttribute('aria-pressed', String(choice === button));
  }
  screeningVideo.poster = './assets/github/' + media.poster;
  const videoPath = './assets/github/' + media.video;
  screeningError.hidden = true;
  $('screening-download').href = videoPath;
  screeningVideo.querySelector('source').src = videoPath;
  screeningVideo.setAttribute('aria-label', media.title);
  $('screening-title').textContent = media.title;
  $('screening-description').textContent = media.desc;
  const playerBounds = screeningVideo.getBoundingClientRect();
  const headerBottom = document.querySelector('.masthead').getBoundingClientRect().bottom;
  if (playerBounds.bottom <= headerBottom || playerBounds.top >= innerHeight) {
   screeningVideo.scrollIntoView({block: 'center', behavior: 'instant'});
  }
  screeningVideo.load();
  screeningVideo.play().catch(() => {});
 });
});
const fieldCompare = $('field-compare');
const fieldRange = $('field-range');
const yearBefore = fieldCompare.querySelector('.field-year-before');
const yearAfter = fieldCompare.querySelector('.field-year-after');
function updateFieldSplit() {
 const split = Number(fieldRange.value);
 fieldCompare.style.setProperty('--split', split + '%');
 yearBefore.hidden = split < 12;
 yearAfter.hidden = split > 88;
 fieldRange.setAttribute('aria-valuetext', `1999 年影像占 ${split}%，2024 年影像占 ${100 - split}%`);
}
fieldRange.addEventListener('input', updateFieldSplit);
updateFieldSplit();
fieldRange.hidden = false;

const pageVideos = [...document.querySelectorAll('main video[controls]')];
const videoVisibility = new IntersectionObserver(entries => {
 for (const entry of entries) {
  if (!entry.isIntersecting) entry.target.pause();
 }
});
pageVideos.forEach(video => {
 videoVisibility.observe(video);
 video.addEventListener('play', () => {
  for (const other of pageVideos) {
   if (other !== video) other.pause();
  }
 });
});
document.addEventListener('visibilitychange', () => {
 if (document.hidden) pageVideos.forEach(video => video.pause());
});
