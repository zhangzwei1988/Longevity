# 公众号排版融合对照成稿包｜V0.13

> 内部 Content ID：`C-20260802-001`  
> 状态：`LayoutTrial / NeedsCreatorReview / NeedsG2`  
> 发布正文：`../../wechat-article-v0.13-publish.md`  
> 试验规则：`content/wechat-gzh-layout-trial-v1.2.md`  
> 当前正式规范：`content/wechat-publication-standard-v1.0.md`  
> 生成日期：2026-08-03

## 本版只测试排版

- 正文文字、标题、加粗、emoji、图片位置和 Alt 与 V0.12 完全一致；
- 两张封面、六张正文图和配色文件与 V0.12 逐文件一致；
- 配色继续使用 V0.12 的官网对齐色盘；
- 只新增“健年刊读”组件排版、公众号兼容正文片段和一键复制预览；
- 官网、正式公众号规范和 `write-wechat-article` Skill 均未改变。

## 交付文件

| 用途 | 文件 | 说明 |
|---|---|---|
| 阅读与评审 | `wechat-preview.html` | 375px 正文舞台，含一键复制按钮 |
| 粘贴公众号 | `wechat-fragment.html` | 纯正文片段；内联样式；无预览脚本 |
| 发布正文 | `../../wechat-article-v0.13-publish.md` | V0.12 原文，仅更新素材路径 |
| 封面 | `cover-2.35x1.jpg`、`cover-1x1.jpg` | 与 V0.12 一致 |
| 正文图片 | `inline-01` 至 `inline-05`、`homework-card.png` | 与 V0.12 一致；无可见图注 |
| 主题源 | `../../../../wechat-themes/references/theme-jiannian-editorial.md` | 项目自有试验主题 |
| 渲染器 | `../../../../wechat-themes/render_jiannian_editorial.py` | 确定性生成正文片段与预览 |

## 排版节点

| 节点 | 数量 | 规则 |
|---|---:|---|
| 二级标题 | 7 | 暖橙实线 4 个、鼠尾草绿虚线 3 个 |
| 三级附录标题 | 1 | 独立低权重样式 |
| 原稿局部加粗 | 18 | 不新增重点；品牌绿＋薄荷绿轻标记 |
| 语义 emoji | 4 | 暂停、证据、记录、行动各 1 个 |
| 正文图片 | 6 | Alt 保留，可见图注 0 条 |
| 来源附录 | 1 | 深纸色、13px 次级文字、无 emoji |

## 已完成检查

- `gzh-design` 组件库源头检查：`ERROR 0 / WARN 0`；
- 公众号正文 HTML 校验：完全合规，122 处文字叶子节点；
- V0.12 与 V0.13 正文内容比对：一致；
- V0.12 与 V0.13 八张图片及 `palette.json` 哈希比对：一致；
- 6 张正文图片路径：全部可解析；
- 内部 Content ID、版本状态、制作说明：未进入公众正文或图片像素；
- 可见图注：0 条。

## 尚未替代的人工门

- 本地浏览器安全策略未允许自动接管 `file://` 预览，因此视觉优劣仍由创作者打开 `wechat-preview.html` 对照确认；
- 微信编辑器原生粘贴仍需执行一次平台检查；
- 本版没有获得新的 `VisualApproved`，不能替代当前正式规范；
- 统一内容包和证据包未改变，仍待 G2 事实、证据和专业边界审核。
