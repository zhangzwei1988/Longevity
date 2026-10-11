# 公众号开源排版方案简评

> 日期：2026-08-03  
> 用途：为健年公众号排版 V0.1 选择实现方法，不作为第三方产品采购结论

## 调研结论

当前最值得借鉴的不是某套现成主题，而是一条已经被多种工具验证的技术链路：

```text
Markdown 内容
→ 结构化 HTML
→ 将样式写入每个元素的 style 属性
→ 375px 手机宽度预览
→ 以 text/html 复制到公众号编辑器
```

微信官方草稿接口会移除 JavaScript，并要求正文图片使用微信上传接口返回的 URL；封面支持 2.35:1、1:1 和 16:9 等裁切比例。因此本项目先生成本地、可审核的完整成稿包，不自动发布，也不把本地图片已经进入微信素材库当成既成事实。

## 代表性方案

| 方案 | 当前观察 | 值得借鉴 | 本项目决定 |
|---|---|---|---|
| [doocs/md](https://github.com/doocs/md) | 约 1.3 万 Star，2026-08-02 仍有更新；支持自定义主题、图片上传、导出和微信场景 | 成熟的 Markdown 编辑、主题和导出链路 | 借鉴方法，不复制主题；避免把大型编辑器整体引入当前轻量工作流 |
| [mdnice/markdown-nice](https://github.com/mdnice/markdown-nice) | 约 4600 Star；GPL-3.0；公开仓库最近推送为 2023-10-06 | 主题化设计和跨平台预览思路 | 只作设计参考，不复制 GPL 主题代码 |
| [md2wechat-lite](https://github.com/geekjourneyx/md2wechat-lite) | MIT；提供 CLI、主题和草稿创建；需要第三方 API Key、公众号 AppID/AppSecret 和公网图片 URL | “一条命令产出草稿”的工作流目标 | 当前不接入外部服务或公众号凭据；待本地流程稳定后再单独评估 |
| 新近轻量编辑器 | 多数采用 CSS 内联、手机预览和富文本剪贴板 | 进一步印证兼容路径 | 不以仓库新或主题多作为采用理由 |

## 健年选择

1. 建立自己的视觉规范，不套用第三方成品主题；
2. 使用本地、确定性的轻量渲染器生成内联样式 HTML 和手机预览；
3. AI 生图只负责无文字的场景底图；中文标题、品牌角标和健康功课单由程序准确绘制；
4. 每期输出文章、封面、配图、排版稿、预览和素材清单；
5. 发布前仍由人把图片上传到微信素材库并完成 G4 检查；未经单独授权，不保存公众号密钥，不自动发布。

## 来源

- [微信官方：新增草稿接口](https://developers.weixin.qq.com/doc/subscription/api/draftbox/draftmanage/api_draft_add)
- [doocs/md](https://github.com/doocs/md)
- [mdnice/markdown-nice](https://github.com/mdnice/markdown-nice)
- [md2wechat-lite](https://github.com/geekjourneyx/md2wechat-lite)

Star 和更新日期为 2026-08-03 调研快照，只用于判断项目成熟度与活跃度，不作为质量保证。
