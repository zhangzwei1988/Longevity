# 公众号配图方法 A/B 试验｜V0.14

> 状态：`IllustrationTrial / NeedsVisualAssets`  
> 基线：`../wechat-v0.13/inline-02-payment-pause.png`、`../wechat-v0.13/inline-03-evidence-path.png`  
> 试验范围：只替换两张候选配图，不修改正文、V0.13、正式公众号规范或配色系统

## 付款前的手指悬停

- Placement：第一问末尾，进入“论文证据”模块之前
- Reader job：把付款前的冲动和销售倒计时变成一个有生活气、略带讽刺的决策现场
- Production mode：satirical editorial scene
- One-sentence visual idea：夜晚书桌上，一只手悬在手机付款按钮上，旁边的巨大礼物蝴蝶结和即将漏完的沙漏把普通付款包装成“错过就亏掉十年”的荒诞仪式
- Facts or relationships that must remain exact：只表达销售紧迫感和付款暂停，不暗示具体项目、疗效或真实机构
- Exact labels：无
- Aspect ratio and target display：3:2，公众号正文约 375px 宽
- Palette source：`../wechat-v0.13/palette.json`
- Brand-mark mode：overlay
- Alt text：深夜书桌上，手指悬在健康项目付款按钮前，旁边的倒计时和夸张礼物包装制造紧迫感
- Visible caption：none
- Reference or provenance note：AI 生成的文学化组合场景，不对应真实机构、人物或产品
- Avoid：可读界面文字、Logo、医院、药物、白大褂、衰老恐惧、黑金广告、嘲笑消费者
- Status：NeedsVisualAssets（内置生图两次网络请求失败）

## 从论文到眼前项目的四道核对

- Placement：第二问中，“有论文，只能说明有论文”之后
- Reader job：让读者一眼看到，研究结论到个人关心的结果之间还有四道不能跳过的核对
- Production mode：hybrid explainer
- One-sentence visual idea：暖纸色编辑桌面上，研究论文、产品模型、使用路径和结果标记组成一条物理检查线，每一站都像必须人工核验的关卡
- Facts or relationships that must remain exact：从研究结论依次核对是否为同一产品、同一用法和读者关心的结果；不能画成论文直接推出疗效
- Exact labels：`研究说了什么`、`是不是同一产品`、`是不是同一用法`、`是不是你关心的结果`
- Aspect ratio and target display：3:2，公众号正文约 375px 宽
- Palette source：`../wechat-v0.13/palette.json`
- Brand-mark mode：deterministic label rail
- Alt text：研究论文、具体产品、使用方法和个人关心结果之间需要逐步核对的四道关系
- Visible caption：none
- Reference or provenance note：上半部由 AI 生成抽象物理模型；中文标签与品牌署名由程序确定性绘制
- Avoid：生成中文、论文标题、医学结论、数字、Logo、DNA、器官、医疗蓝、论文直接通向疗效的捷径
- Status：NeedsVisualAssets（等待无文字视觉主体）
