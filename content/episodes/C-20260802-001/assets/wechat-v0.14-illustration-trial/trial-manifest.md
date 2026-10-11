# 配图方法试验清单｜V0.14

> 日期：2026-08-07  
> 状态：`IllustrationTrial / Generated / NeedsCreatorReview`  
> 不影响：V0.13、公众号正式规范 V1.0、已确认配色与现有图片

## 已完成

- 建立第一方 Skill：`/Users/john/.codex/skills/create-jiannian-illustrations`；
- Skill 结构校验通过，并设为仅显式调用；
- 固化“认知锚点 → 配图任务 → 准确性分流 → 品牌处理 → QA”流程；
- 完成两张候选图的视觉 Brief、Alt、公开边界和正式提示词；
- 建立 `compose_explainer_rail.py`，用于把无文字视觉主体与准确中文标签、品牌署名确定性合成；
- 使用现有图片完成脚本冒烟测试，输出为 1536×1024，四个中文节点全部准确且未裁切。
- 2026-08-07 重试内置生图成功，生成付款暂停场景与论文核对编辑模型各一张；
- 两张原始图均为 1536×1024、无内部编号、无机构和产品标识，并已按纯视觉场景规则叠加 `多活十年 Lab` 署名；
- 付款暂停场景进入 V0.15 对照稿，替换原付款停顿图；论文核对编辑模型进入 V0.15，替换原确定性关系图，准确结论仍由正文和 Alt 承担。

## 尚未完成

- 两张新图仍需创作者与 V0.13 原图作 A/B 视觉判断；
- 论文核对图包含一个用于表达“结果仍待确认”的问号图形，需确认是否符合品牌克制度；
- 本轮只有单主题试验，不更新公众号 Skill 或正式规范。

## 文件与后续入口

1. 无署名原图为 `inline-payment-pause-generated.png`、`inline-evidence-path-generated.png`；
2. 署名成图为 `inline-payment-pause-branded.png`、`inline-evidence-path-branded.png`；
3. 生成提示词继续保存在 `prompts.md`；
4. 先完成 V0.13 与 V0.15 的人工 A/B 判断，再决定是否把这类编辑模型插画写入正式配图规则。
