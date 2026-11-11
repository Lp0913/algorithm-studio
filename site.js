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
    "example": {
      "name": "Looking Glass · 建筑物分割",
      "repository": "developmentseed/looking-glass-pub",
      "repositoryUrl": "https://github.com/developmentseed/looking-glass-pub",
      "exampleUrl": "https://github.com/developmentseed/looking-glass-pub/blob/master/docker_pred_example.ipynb",
      "summary": "用 DeepLabV3+ 将卫星影像分成建筑与背景，提供预测 Notebook 与边界距离输出。",
      "requirements": "按仓库准备 TensorFlow 环境、卫星瓦片和预训练模型。",
      "license": "MIT"
    }
  },
  "0-1": {
    "title": "地块提取",
    "description": "根据影像中的边界与纹理划分地块，辅助地块调查与管理。",
    "input": "遥感影像",
    "output": "地块边界与分布",
    "example": {
      "name": "FTW · 农田地块边界",
      "repository": "fieldsoftheworld/ftw-baselines",
      "repositoryUrl": "https://github.com/fieldsoftheworld/ftw-baselines",
      "exampleUrl": "https://github.com/fieldsoftheworld/ftw-baselines/blob/main/README.md",
      "summary": "提供农田边界分割的基线模型、训练配置与推理工具，输出地块边界结果。",
      "requirements": "使用 ftw-tools，按说明下载样本和对应模型权重。",
      "license": "MIT"
    }
  },
  "0-2": {
    "title": "水体提取",
    "description": "识别河流、湖泊等水域，提取水体范围与边界。",
    "input": "遥感影像",
    "output": "水体范围与边界",
    "example": {
      "name": "eo-learn · 水体监测",
      "repository": "sentinel-hub/eo-learn",
      "repositoryUrl": "https://github.com/sentinel-hub/eo-learn",
      "exampleUrl": "https://github.com/sentinel-hub/eo-learn/blob/master/README.md",
      "summary": "示例将卫星影像处理成水体掩膜，并统计水面范围，展示完整处理链。",
      "requirements": "部分示例需要 Sentinel Hub 账号与影像访问配置。",
      "license": "MIT"
    }
  },
  "0-3": {
    "title": "林地提取",
    "description": "识别影像中的林地覆盖范围，辅助森林资源调查。",
    "input": "遥感影像",
    "output": "林地范围与分布",
    "example": {
      "name": "Dynamic World · 林木覆盖",
      "repository": "google/dynamicworld",
      "repositoryUrl": "https://github.com/google/dynamicworld",
      "exampleUrl": "https://github.com/google/dynamicworld/blob/master/single_image_runner.ipynb",
      "summary": "运行九类土地覆盖模型，从 trees 类别概率或标签中提取林木覆盖区域。",
      "requirements": "需要 TensorFlow 与符合模型波段要求的 Sentinel-2 数据。",
      "license": "Apache-2.0"
    }
  },
  "0-4": {
    "title": "大棚提取",
    "description": "提取农业大棚的位置与轮廓，辅助设施农业调查。",
    "input": "高分辨率遥感影像",
    "output": "大棚轮廓与分布",
    "example": {
      "name": "U-Net · 农业大棚提取",
      "repository": "LFilipePacheco/greenhouse-detection-unet",
      "repositoryUrl": "https://github.com/LFilipePacheco/greenhouse-detection-unet",
      "exampleUrl": "https://github.com/LFilipePacheco/greenhouse-detection-unet/blob/main/README.md",
      "summary": "包含大棚影像分割、训练与推理流程，并展示提取轮廓覆盖在原图上的结果。",
      "requirements": "使用 TensorFlow、rasterio 和 GeoPandas，按说明准备影像与标注。",
      "license": "MIT"
    }
  },
  "0-5": {
    "title": "光伏提取",
    "description": "识别集中式与分布式光伏区域，提取设施的位置与范围。",
    "input": "高分辨率遥感影像",
    "output": "光伏区域轮廓与位置",
    "example": {
      "name": "DeepSolar · 光伏设施识别",
      "repository": "wangzhecheng/DeepSolar",
      "repositoryUrl": "https://github.com/wangzhecheng/DeepSolar",
      "exampleUrl": "https://github.com/wangzhecheng/DeepSolar/blob/master/README.md",
      "summary": "从高分辨率影像中识别光伏设施，仓库提供模型训练、定位与结果整理流程。",
      "requirements": "需按项目说明准备训练影像、标签和相应的 TensorFlow 环境。",
      "license": "MIT"
    }
  },
  "1-0": {
    "title": "无人机识别",
    "description": "识别图像或视频中的无人机目标，标记目标位置。",
    "input": "图像或视频帧",
    "output": "无人机类别与位置",
    "example": {
      "name": "Anti-UAV · 无人机目标定位",
      "repository": "ZhaoJ9014/Anti-UAV",
      "repositoryUrl": "https://github.com/ZhaoJ9014/Anti-UAV",
      "exampleUrl": "https://github.com/ZhaoJ9014/Anti-UAV/blob/master/README.md",
      "summary": "提供可见光与红外无人机目标的跟踪基线、数据说明和评估代码。",
      "requirements": "根据所选基线下载 Anti-UAV 数据与模型，检测和持续跟踪任务需区分。",
      "license": "MIT"
    }
  },
  "1-1": {
    "title": "飞机检测",
    "description": "检测影像中的飞机目标，形成位置标注。",
    "input": "航空或卫星影像",
    "output": "飞机目标位置",
    "example": {
      "name": "MMRotate · 飞机旋转框检测",
      "repository": "open-mmlab/mmrotate",
      "repositoryUrl": "https://github.com/open-mmlab/mmrotate",
      "exampleUrl": "https://github.com/open-mmlab/mmrotate/blob/main/README.md",
      "summary": "DOTA 类别包含 plane，可使用仓库配置训练并展示飞机目标的旋转框检测。",
      "requirements": "需准备 DOTA 数据、对应配置与模型权重，以及匹配的 MMRotate 环境。",
      "license": "Apache-2.0"
    }
  },
  "1-2": {
    "title": "舰船检测",
    "description": "从海面、港口等场景影像中检测舰船目标。",
    "input": "卫星或航拍影像",
    "output": "舰船目标位置",
    "example": {
      "name": "MMRotate · 舰船旋转框检测",
      "repository": "open-mmlab/mmrotate",
      "repositoryUrl": "https://github.com/open-mmlab/mmrotate",
      "exampleUrl": "https://github.com/open-mmlab/mmrotate/blob/main/README.md",
      "summary": "提供 DOTA 的 ship 类别与 HRSC 舰船数据支持，用于舰船旋转框检测实验。",
      "requirements": "按仓库的数据准备说明选择 HRSC 或 DOTA 舰船样本与训练配置。",
      "license": "Apache-2.0"
    }
  },
  "1-3": {
    "title": "火焰检测",
    "description": "识别画面中的火焰区域，为后续人工复核提供位置线索。",
    "input": "图像或视频帧",
    "output": "疑似火焰区域",
    "example": {
      "name": "YOLO · 火焰检测",
      "repository": "spacewalk01/yolov5-fire-detection",
      "repositoryUrl": "https://github.com/spacewalk01/yolov5-fire-detection",
      "exampleUrl": "https://github.com/spacewalk01/yolov5-fire-detection/blob/main/README.md",
      "summary": "提供火焰图像训练说明和视频检测示例，输出画面中的火焰检测框。",
      "requirements": "下载项目注明的权重或用火焰标注数据训练，依赖版本按仓库设置。",
      "license": "MIT"
    }
  },
  "1-4": {
    "title": "车辆追踪",
    "description": "在连续视频帧中关联车辆，记录同一目标的运动轨迹。",
    "input": "连续视频帧",
    "output": "车辆位置、标识与轨迹",
    "example": {
      "name": "Norfair · 车辆持续追踪",
      "repository": "tryolabs/norfair",
      "repositoryUrl": "https://github.com/tryolabs/norfair",
      "exampleUrl": "https://github.com/tryolabs/norfair/blob/master/README.md",
      "summary": "将目标检测结果关联为车辆轨迹，仓库包含交通视频演示与运行示例。",
      "requirements": "需要目标检测器、Norfair 和输入视频，按示例配置检测模型。",
      "license": "BSD-3-Clause"
    }
  },
  "1-5": {
    "title": "桥梁识别",
    "description": "识别影像中的桥梁目标，辅助设施调查与定位。",
    "input": "遥感或航拍影像",
    "output": "桥梁目标位置",
    "example": {
      "name": "MMRotate · 桥梁目标检测",
      "repository": "open-mmlab/mmrotate",
      "repositoryUrl": "https://github.com/open-mmlab/mmrotate",
      "exampleUrl": "https://github.com/open-mmlab/mmrotate/blob/main/README.md",
      "summary": "DOTA 中包含 bridge 类别，可用旋转框检测配置训练和定位桥梁目标。",
      "requirements": "需使用含桥梁标注的 DOTA 数据和匹配配置，遥感尺度需与训练数据对应。",
      "license": "Apache-2.0"
    }
  },
  "2-0": {
    "title": "建筑物变化检测",
    "description": "对比同一区域的不同时期影像，标出建筑新增、拆除等变化。",
    "input": "对齐的多期遥感影像",
    "output": "建筑变化区域",
    "example": {
      "name": "Open-CD · 建筑物变化检测",
      "repository": "likyoo/open-cd",
      "repositoryUrl": "https://github.com/likyoo/open-cd",
      "exampleUrl": "https://github.com/likyoo/open-cd/blob/main/README.md",
      "summary": "提供 LEVIR-CD 等双时相建筑变化数据的训练配置和评估流程。",
      "requirements": "准备配准后的双期影像、变化标签以及对应配置和权重。",
      "license": "Apache-2.0"
    }
  },
  "2-1": {
    "title": "地物变化检测",
    "description": "对比多期影像，定位地物覆盖发生变化的区域。",
    "input": "对齐的多期遥感影像",
    "output": "地物变化区域",
    "example": {
      "name": "Open-CD · 地物变化检测",
      "repository": "likyoo/open-cd",
      "repositoryUrl": "https://github.com/likyoo/open-cd",
      "exampleUrl": "https://github.com/likyoo/open-cd/blob/main/README.md",
      "summary": "支持 SECOND 等地物变化数据与变化检测模型，形成两期影像的变化区域。",
      "requirements": "根据所选数据集准备双时相影像及标签，按仓库说明配置训练环境。",
      "license": "Apache-2.0"
    }
  },
  "2-2": {
    "title": "时序分析",
    "description": "分析同一区域的连续观测，呈现目标随时间的变化趋势。",
    "input": "连续多期影像或观测数据",
    "output": "时序变化曲线与区域",
    "example": {
      "name": "sits · 卫星影像时序分析",
      "repository": "e-sensing/sits",
      "repositoryUrl": "https://github.com/e-sensing/sits",
      "exampleUrl": "https://github.com/e-sensing/sits/blob/master/README.md",
      "summary": "在 R 中组织卫星影像时间序列，进行样本分类、时序分析与结果制图。",
      "requirements": "需要 R、sits 及可访问的时序影像数据，示例按数据立方配置执行。",
      "license": "GPL-2.0"
    }
  },
  "2-3": {
    "title": "建筑物高度估计",
    "description": "结合可用影像和空间信息，估计建筑物高度。",
    "input": "影像及可用空间信息",
    "output": "建筑物高度估计值",
    "example": {
      "name": "TEMPO · 建筑密度与高度",
      "repository": "microsoft/buildings",
      "repositoryUrl": "https://github.com/microsoft/buildings",
      "exampleUrl": "https://github.com/microsoft/buildings/blob/main/README.md",
      "summary": "提供建筑密度与高度估计的训练说明、推理代码和公开结果数据。",
      "requirements": "复现实验需按训练说明准备数据，模型训练涉及 Planet 季度影像访问。",
      "license": "MIT"
    }
  },
  "2-4": {
    "title": "光伏选址",
    "description": "结合地形、地物和项目约束，筛选光伏建设的候选区域。",
    "input": "遥感影像、地形与约束数据",
    "output": "候选区域与筛选结果",
    "example": {
      "name": "QGIS · 光伏选址分析",
      "repository": "pperillav/solar_site_suitability",
      "repositoryUrl": "https://github.com/pperillav/solar_site_suitability",
      "exampleUrl": "https://github.com/pperillav/solar_site_suitability/blob/main/README.md",
      "summary": "通过坡度、朝向、太阳辐照与土地覆盖进行 AHP 多指标评价，提取候选区域。",
      "requirements": "需要 QGIS、DEM、土地覆盖和辐照数据，并设置项目的筛选约束。",
      "license": "GPL-3.0"
    }
  },
  "3-0": {
    "title": "影像超分",
    "description": "提高低分辨率影像的显示细节，为后续查看和分析提供输入。",
    "input": "低分辨率影像",
    "output": "超分辨率影像",
    "example": {
      "name": "Real-ESRGAN · 图像超分",
      "repository": "xinntao/Real-ESRGAN",
      "repositoryUrl": "https://github.com/xinntao/Real-ESRGAN",
      "exampleUrl": "https://github.com/xinntao/Real-ESRGAN/blob/master/README.md",
      "summary": "提供单张图像超分与推理示例，可观察增强前后的细节变化。",
      "requirements": "下载对应模型权重并安装依赖，遥感影像的效果需用实际数据验证。",
      "license": "BSD-3-Clause"
    }
  },
  "3-1": {
    "title": "影像增强",
    "description": "调整亮度、对比度等影像表现，改善数据的可读性。",
    "input": "待增强影像",
    "output": "增强后的影像",
    "example": {
      "name": "OpenCV · 对比度增强",
      "repository": "opencv/opencv",
      "repositoryUrl": "https://github.com/opencv/opencv",
      "exampleUrl": "https://github.com/opencv/opencv/blob/4.x/doc/py_tutorials/py_imgproc/py_histograms/py_histogram_equalization/py_histogram_equalization.markdown",
      "summary": "展示直方图均衡与 CLAHE 局部对比度增强，可对照处理前后的图像表现。",
      "requirements": "安装 OpenCV 并准备输入图片，示例为图像增强方法演示。",
      "license": "Apache-2.0"
    }
  },
  "3-2": {
    "title": "影像配准",
    "description": "对齐不同时间或来源的影像，为变化分析和数据融合做准备。",
    "input": "参考影像与待配准影像",
    "output": "对齐影像与配准参数",
    "example": {
      "name": "AROSICS · 遥感影像配准",
      "repository": "GFZ/arosics",
      "repositoryUrl": "https://github.com/GFZ/arosics",
      "exampleUrl": "https://github.com/GFZ/arosics/blob/main/README.rst",
      "summary": "提供遥感影像全局与局部配准流程，校正参考影像与目标影像的空间偏移。",
      "requirements": "需准备有重叠范围的地理参考影像，并按说明安装 GDAL 等依赖。",
      "license": "Apache-2.0"
    }
  },
  "3-3": {
    "title": "影像分割",
    "description": "按目标或类别划分影像像素，形成区域级识别结果。",
    "input": "待分割影像",
    "output": "区域掩膜或分类图",
    "example": {
      "name": "MMSegmentation · 语义分割",
      "repository": "open-mmlab/mmsegmentation",
      "repositoryUrl": "https://github.com/open-mmlab/mmsegmentation",
      "exampleUrl": "https://github.com/open-mmlab/mmsegmentation/blob/main/README.md",
      "summary": "提供图像分割配置、推理演示与可视化，将图像划分为目标类别区域。",
      "requirements": "下载与配置对应的模型权重，遥感专题任务需匹配标签与训练数据。",
      "license": "Apache-2.0"
    }
  },
  "3-4": {
    "title": "影像镶嵌",
    "description": "拼接多幅具有重叠区域的影像，形成连续覆盖的图像。",
    "input": "多幅重叠影像",
    "output": "拼接影像",
    "example": {
      "name": "OpenCV · 多图拼接",
      "repository": "opencv/opencv",
      "repositoryUrl": "https://github.com/opencv/opencv",
      "exampleUrl": "https://github.com/opencv/opencv/blob/4.x/samples/python/stitching_detailed.py",
      "summary": "详细拼接示例包含特征匹配、相机估计、接缝处理与多图融合。",
      "requirements": "需要有重叠区域的图片，示例输出全景图，地理坐标处理需另行配置。",
      "license": "Apache-2.0"
    }
  },
  "3-5": {
    "title": "匀光匀色",
    "description": "统一多幅影像的亮度与色彩表现，减少拼接处的视觉差异。",
    "input": "多幅待处理影像",
    "output": "色调一致的影像",
    "example": {
      "name": "OpenCV · 曝光补偿与融合",
      "repository": "opencv/opencv",
      "repositoryUrl": "https://github.com/opencv/opencv",
      "exampleUrl": "https://github.com/opencv/opencv/blob/4.x/samples/python/stitching_detailed.py",
      "summary": "拼接示例提供曝光补偿与融合步骤，可观察多幅图像接缝处亮度差异的处理。",
      "requirements": "使用重叠图片运行 stitching_detailed 示例，并设置曝光补偿参数。",
      "license": "Apache-2.0"
    }
  },
  "4-0": {
    "title": "农作物分类",
    "description": "识别影像中的作物类别，呈现种植类型与空间分布。",
    "input": "遥感影像及标注样本",
    "output": "作物类别与分布",
    "example": {
      "name": "U-TAE / PaPs · 作物分类",
      "repository": "VSainteuf/utae-paps",
      "repositoryUrl": "https://github.com/VSainteuf/utae-paps",
      "exampleUrl": "https://github.com/VSainteuf/utae-paps/blob/main/README.md",
      "summary": "利用卫星时序影像进行农田语义与全景分割，PASTIS 标签对应作物类型。",
      "requirements": "下载 PASTIS 数据与模型配置，在 PyTorch 环境中运行训练或推理。",
      "license": "MIT"
    }
  },
  "4-1": {
    "title": "树木分类",
    "description": "结合影像特征区分树木类别，辅助林业调查。",
    "input": "航拍或地面影像",
    "output": "树木类别与位置",
    "example": {
      "name": "DeepTreeAttention · 树种分类",
      "repository": "weecology/DeepTreeAttention",
      "repositoryUrl": "https://github.com/weecology/DeepTreeAttention",
      "exampleUrl": "https://github.com/weecology/DeepTreeAttention/blob/main/README.md",
      "summary": "针对 NEON 树种预测提供多模态数据处理、模型训练与结果分析流程。",
      "requirements": "需按项目准备高光谱、RGB 和冠层高度等数据，并调整数据路径。",
      "license": "MIT"
    }
  },
  "4-2": {
    "title": "病虫害检测",
    "description": "识别作物或树木上的疑似病虫害表现，标出复核目标。",
    "input": "作物或树木图像",
    "output": "疑似病虫害类别与区域",
    "example": {
      "name": "Plant Disease · 叶片病害分类",
      "repository": "darpanhh/plant-disease-detection",
      "repositoryUrl": "https://github.com/darpanhh/plant-disease-detection",
      "exampleUrl": "https://github.com/darpanhh/plant-disease-detection/blob/main/README.md",
      "summary": "提供叶片疾病分类的训练 Notebook 与交互演示，覆盖病虫害识别中的病害分类。",
      "requirements": "需安装 TensorFlow、下载项目模型并准备叶片图片，昆虫检测需另设任务。",
      "license": "MIT（README 声明）"
    }
  },
  "4-3": {
    "title": "羊群检测",
    "description": "检测画面中的羊只，辅助群体定位和数量统计。",
    "input": "图像或视频帧",
    "output": "羊只位置与计数",
    "example": {
      "name": "ICAERUS · 羊群检测与计数",
      "repository": "ICAERUS-EU/UC3_Livestock_Monitoring",
      "repositoryUrl": "https://github.com/ICAERUS-EU/UC3_Livestock_Monitoring",
      "exampleUrl": "https://github.com/ICAERUS-EU/UC3_Livestock_Monitoring/blob/main/README.md",
      "summary": "提供航拍羊只检测模型、视频计数脚本和示例数据，关联目标完成羊只统计。",
      "requirements": "选择仓库中的模型版本，下载权重，并配置视频和计数区域。",
      "license": "GPL-3.0"
    }
  },
  "4-4": {
    "title": "牛群检测",
    "description": "检测画面中的牛只，辅助群体定位和数量统计。",
    "input": "图像或视频帧",
    "output": "牛只位置与计数",
    "example": {
      "name": "Ultralytics · COCO 牛只检测",
      "repository": "ultralytics/ultralytics",
      "repositoryUrl": "https://github.com/ultralytics/ultralytics",
      "exampleUrl": "https://github.com/ultralytics/ultralytics/blob/main/docs/en/datasets/detect/coco.md",
      "summary": "COCO 模型包含 cow 类别，可对牛群图片执行检测并按类别筛选目标。",
      "requirements": "使用 COCO 预训练权重与牛群图片，航拍或遮挡场景需专门验证与适配。",
      "license": "AGPL-3.0"
    }
  },
  "4-5": {
    "title": "水面垃圾识别",
    "description": "识别水面的疑似漂浮垃圾，为清理与巡查提供位置线索。",
    "input": "水面巡查图像或视频",
    "output": "疑似垃圾位置与类别",
    "example": {
      "name": "A2ANet · 水面漂浮垃圾",
      "repository": "badamsbadiu/A2ANet-Floating-Debris-Detection",
      "repositoryUrl": "https://github.com/badamsbadiu/A2ANet-Floating-Debris-Detection",
      "exampleUrl": "https://github.com/badamsbadiu/A2ANet-Floating-Debris-Detection/blob/main/README.md",
      "summary": "提供面向 D_six 与 FloW-Img 的漂浮垃圾检测模型、数据配置及训练验证流程。",
      "requirements": "需下载相应数据集并训练权重，仓库 README 注明权重另行发布安排。",
      "license": "MIT（README 声明）"
    }
  },
  "5-0": {
    "title": "输电线路隐患检测",
    "description": "分析输电线路巡检影像，标出疑似设施隐患与周边风险。",
    "input": "输电线路巡检影像",
    "output": "疑似隐患位置与类别",
    "example": {
      "name": "TLINet · 绝缘子缺陷检测",
      "repository": "mazilishang/TLINet",
      "repositoryUrl": "https://github.com/mazilishang/TLINet",
      "exampleUrl": "https://github.com/mazilishang/TLINet/blob/main/README.md",
      "summary": "针对输电线路绝缘子缺陷提供模型和实验流程，覆盖线路巡检中的设备隐患识别。",
      "requirements": "按仓库说明准备绝缘子数据、标签与模型配置。",
      "license": "Apache-2.0"
    }
  },
  "5-1": {
    "title": "光伏缺陷检测",
    "description": "分析可见光或热成像数据，标出疑似光伏组件缺陷。",
    "input": "光伏巡检图像",
    "output": "疑似缺陷区域与类别",
    "example": {
      "name": "Solar Panel · 光伏缺陷检测",
      "repository": "yugeshsivakumar/Solar-Panel-Defect-Detection",
      "repositoryUrl": "https://github.com/yugeshsivakumar/Solar-Panel-Defect-Detection",
      "exampleUrl": "https://github.com/yugeshsivakumar/Solar-Panel-Defect-Detection/blob/main/README.md",
      "summary": "提供可见光和热成像光伏缺陷的预处理、训练与检测 Notebook。",
      "requirements": "示例数据需向作者申请或自行准备，环境按对应图像分支配置。",
      "license": "MIT"
    }
  },
  "5-2": {
    "title": "安全帽识别",
    "description": "检测作业人员及安全帽佩戴情况，标出需要复核的目标。",
    "input": "作业现场图像或视频",
    "output": "人员位置与佩戴识别结果",
    "example": {
      "name": "Construction-PPE · 安全帽识别",
      "repository": "ultralytics/ultralytics",
      "repositoryUrl": "https://github.com/ultralytics/ultralytics",
      "exampleUrl": "https://github.com/ultralytics/ultralytics/blob/main/docs/en/datasets/detect/construction-ppe.md",
      "summary": "官方示例包含 helmet 与 no_helmet 类别，提供训练、验证与推理用法。",
      "requirements": "使用 Construction-PPE 数据配置，下载数据并训练或加载匹配权重。",
      "license": "AGPL-3.0"
    }
  },
  "5-3": {
    "title": "焊接件缺陷检测",
    "description": "识别焊接件图像中的疑似缺陷，辅助工业质量检查。",
    "input": "焊接件检测图像",
    "output": "疑似缺陷位置与类别",
    "example": {
      "name": "GDXray · 焊缝缺陷分支",
      "repository": "maxkferg/metal-defect-detection",
      "repositoryUrl": "https://github.com/maxkferg/metal-defect-detection",
      "exampleUrl": "https://github.com/maxkferg/metal-defect-detection/blob/master/gdxray.py",
      "summary": "gdxray.py 包含 Welding 数据加载与检测类别，可用于焊缝 X 光缺陷训练实验。",
      "requirements": "该项目使用较早的 Python 与 Mask R-CNN 环境，需准备焊缝数据并训练权重。",
      "license": "NIST 使用许可"
    }
  },
  "5-4": {
    "title": "齿轮瑕疵检测",
    "description": "分析齿轮表面图像，标出疑似瑕疵区域。",
    "input": "齿轮表面图像",
    "output": "疑似瑕疵区域",
    "example": {
      "name": "Gear Defects · 齿轮表面检测",
      "repository": "Yuli-Ya/Detecting-Gear-Surface-Defects",
      "repositoryUrl": "https://github.com/Yuli-Ya/Detecting-Gear-Surface-Defects",
      "exampleUrl": "https://github.com/Yuli-Ya/Detecting-Gear-Surface-Defects/blob/master/README.md",
      "summary": "提供齿轮缺陷实验流程，针对断裂、缺损、划痕和正常样本进行 YOLOv3 训练。",
      "requirements": "按 README 准备齿轮图片与标签，并配置 Darknet、类别与预训练权重。",
      "license": "MIT"
    }
  },
  "5-5": {
    "title": "道路裂缝检测",
    "description": "提取道路表面的裂缝位置与轮廓，辅助路面巡检。",
    "input": "路面图像",
    "output": "裂缝轮廓或分割掩膜",
    "example": {
      "name": "U-Net · 道路裂缝分割",
      "repository": "yakhyo/Crack-Segmentation",
      "repositoryUrl": "https://github.com/yakhyo/Crack-Segmentation",
      "exampleUrl": "https://github.com/yakhyo/Crack-Segmentation/blob/main/README.md",
      "summary": "使用 PyTorch U-Net 提取道路裂缝掩膜，提供损失函数、训练与推理实现。",
      "requirements": "准备道路裂缝图像、像素标注与匹配权重，按仓库说明运行训练或分割。",
      "license": "MIT"
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
 const example = details.example;
 const category = $(panel.getAttribute('aria-labelledby')).querySelector('span:nth-child(2)').textContent;
 $('algorithm-breadcrumb').textContent = category + ' / 算法详情';
 $('algorithm-title').textContent = details.title;
 $('algorithm-description').textContent = details.description;
 $('algorithm-input').textContent = details.input;
 $('algorithm-output').textContent = details.output;
 $('algorithm-example-title').textContent = example.name;
 $('algorithm-example-summary').textContent = example.summary;
 $('algorithm-example-requirements').textContent = example.requirements;
 $('algorithm-license').textContent = example.license;
 $('algorithm-example-link').href = example.exampleUrl;
 $('algorithm-repository-link').href = example.repositoryUrl;
 $('algorithm-example-credit').textContent = example.repository + ' · 来源已核对';
 algorithmDialog.dataset.hash = link.hash;
 algorithmDialog.dataset.category = panel.getAttribute('aria-labelledby');
 if (!algorithmDialog.open) algorithmDialog.showModal();
}

$('algorithm-close').addEventListener('click', () => algorithmDialog.close());
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
  $('screening-source').href = media.source_page;
  $('screening-source').textContent = media.repo + ' ↗';
  $('screening-license').href = './assets/github/' + media.license_file;
  $('screening-license').textContent = media.license;
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
