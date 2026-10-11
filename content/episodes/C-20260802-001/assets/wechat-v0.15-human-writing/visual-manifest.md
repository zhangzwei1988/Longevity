# 公众号活人感写作对照成稿包｜V0.15

> 内部 Content ID：`C-20260802-001`  
> 状态：`ExpressionAndIllustrationTrial / NeedsCreatorReview / NeedsG2`  
> 发布正文：`../../wechat-article-v0.15-human-writing-trial.md`  
> 事实源：`../../unified-content-package-v0.1.md`  
> 表达源：`../../narrative-master-v0.2.md`  
> 生成日期：2026-08-07

## 本版测试什么

- 使用已安装的 `human-writing` 1.1.0 优化 V0.13 的自然中文、段落推进和说话位置；
- 保留四问框架、结论强度、法规范围、医学边界、互动收束和来源附录；
- 沿用 V0.13 的封面、直播场景、验收图、责任图和健康功课单；
- 新增两张内置生图候选，分别替换付款停顿图与论文核对图；
- 继续使用健年官网对齐色盘和“健年刊读”公众号主题，不采用外部 Skill 的默认视觉。

## human-writing 融合边界

- 采用材料先行、段落新增信息、主语与动作前置、长短句错落、减少机械连词和直接下判断；
- 不采用故意错别字、虚构亲历、无来源精确细节、粗口或网络梗来模仿人工写作；
- `human-writing` 的表达规则服从统一内容包、证据包、医疗与隐私边界、公众号正式规范和创作者已确认语气；
- 本次只形成单篇对照稿，不把第三方规则静默写入健年长期 Skill。

## 交付文件

| 用途 | 文件 | 说明 |
|---|---|---|
| 阅读与评审 | `wechat-preview.html` | 375px 正文舞台，含复制按钮 |
| 粘贴公众号 | `wechat-fragment.html` | 纯正文片段，内联样式 |
| 发布正文 | `../../wechat-article-v0.15-human-writing-trial.md` | 独立对照稿，不覆盖 V0.13 |
| 封面 | `cover-2.35x1.jpg`、`cover-1x1.jpg` | 沿用 V0.13 |
| 新配图 | `inline-02-payment-pause.png`、`inline-03-evidence-path.png` | 内置 imagegen 生成，项目脚本加署名 |
| 沿用配图 | `inline-01-livestream.png`、`inline-04-acceptance-mismatch.png`、`inline-05-responsibility-map.png`、`homework-card.png` | 沿用 V0.13 |

## 自动检查

- human-writing 检查器：硬禁项 0；
- gzh-design HTML 校验：`ERROR 0 / WARNING 0`；
- 正文图片 6 张，均有 Alt；可见图注 0；
- 两张新增图片均已检查手部、裁切、署名、安全边距和公开文字；
- 统一内容包、证据包和 Claim ID 映射未修改；
- 应用内浏览器安全策略不允许自动打开 `file://` 预览，最终视觉仍需创作者打开本地预览确认。

## 人工门

- 比较 V0.13 与 V0.15 的声音，确认 human-writing 的规则是否让文章更像具体的人，又没有削弱健年的品牌锋芒；
- 比较两张新配图与旧图，确认编辑模型风格与品牌配色是否适合作为后续候选；
- 本版仍待 G2 事实、法律与专业边界审核，不代表可发布。
