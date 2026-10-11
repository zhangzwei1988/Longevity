# 健年选题来源登记

> 版本：V0.3  
> 更新日期：2026-08-02  
> 用途：记录来源标识、访问方式、成本、可信度边界和当前状态

## 一、来源规则

- 趋势、对标账号和社交讨论是选题信号，不是医学证据；
- 指南、公共卫生机构、专业学会和学术论文才是证据研究入口；
- 无法访问或无法平台原生核验时标记“待核验”，不补猜数据；
- 不抓取受版权保护的书籍全文，不收集个人病历或可识别健康资料；
- 凭据只从 macOS 钥匙串读取，不写入仓库。

## 二、YouTube 首批频道

| 能力模块 | 频道 | Handle | Channel ID | Uploads Playlist ID | 状态 |
|---|---|---|---|---|---|
| 争议证据处理 | Nutrition Made Simple! | `@NutritionMadeSimple` | `UCosmc75v-B2Dk7GWyEyFFMw` | `UUosmc75v-B2Dk7GWyEyFFMw` | 可用 |
| 论文转视频 | The Sheekey Science Show | `@TheSheekeyScienceShow` | `UCJKl77olDWKJTCpAMMFCRsA` | `UUJKl77olDWKJTCpAMMFCRsA` | 可用 |
| 医学故事与批判表达 | Medlife Crisis | `@MedlifeCrisis` | `UCgRBRE1DUP2w7HTH9j_L4OQ` | `UUgRBRE1DUP2w7HTH9j_L4OQ` | 可用 |
| 研究与公共决策 | Healthcare Triage | `@healthcaretriage` | `UCabaQPYxxKepWUsEVQMT4Kw` | `UUabaQPYxxKepWUsEVQMT4Kw` | 可用 |
| 专业团队与持续内容 | Barbell Medicine | `@BarbellMedicine` | `UCMcGFPjX2aQy31KYdEvT2-Q` | `UUMcGFPjX2aQy31KYdEvT2-Q` | 可用 |

后续直接使用已核验的 Uploads Playlist ID，不再重复调用 `channels.list`。默认观察最近 30 天；每个频道每轮只取一页、最多 15 条。

### YouTube 评论抽样

- 当前路径：`yt-dlp` 公开评论，尽力而为，不保证覆盖全部评论；
- 默认只选 3—5 条与目标问题直接相关的视频；
- 每条分别抽取高互动和最新评论各最多 15 条，去重后再分析；
- 只保存去标识化问题簇、来源视频和观察日期，不保存用户名、评论 ID 或完整个人健康叙事；
- 评论只用于需求和语言信号，不作为医学证据；
- 当前不使用 YouTube Data API 评论接口，因此 API 配额与美元成本为 0；若以后切换接口，必须先写明预计配额并记录实耗。

## 三、X / Twitter

| 路径 | 状态 | 成本 | 边界 |
|---|---|---|---|
| xAI `x_search` | 暂停 | 首轮实扣 $0.1113724 | 一个请求产生 14 次内部搜索，无法用 `max_tool_calls` 硬限制 |
| Agent-Reach `twitter-cli` | 未配置 | API 美元成本 $0 | 缺少显式 Cookie；不得自动读取浏览器或替用户登录 |
| OpenCLI Twitter | 未连接 | API 美元成本 $0 | 需要用户已有且明确控制的 Chrome 登录态和扩展 |

在免费、可计数路径配置完成前，允许轮次缺少 X 信号。

X 默认观察最近 14 天，覆盖体检后决策、就医准备、父母健康、家庭健康档案、健康研究理解和健康信息混乱；不默认启用图片或视频理解。

如创作者批准再次测试 xAI：

- 当前测试模型为 `grok-4.20-0309-non-reasoning`；
- 以首轮实扣约 **$0.11/次请求** 作为成本基线，不能按一次工具调用估算；
- 每次读取 `usage.cost_in_usd_ticks` 和 `usage.server_side_tool_usage_details`；
- 单次实扣超过 **$0.25** 或本轮批准预算时，停止后续 xAI 调用并复盘；
- 价格、模型或计费结构可能变化，再次启用前核验[xAI Pricing](https://docs.x.ai/developers/pricing)和[xAI Cost Tracking](https://docs.x.ai/developers/cost-tracking)。

## 四、网页与学术

| 来源 | 用途 | 状态 | 默认预算 |
|---|---|---|---:|
| AnySearch 一般网页 | 社会议题和公开表达线索 | 可用 | 每轮最多 1 个批次 |
| AnySearch `academic.biomedical` | PubMed/MEDLINE、PMC 和预印本入口 | 可用 | 每轮最多 4 个查询意图 |
| WHO、国家卫健委、CDC 等官方页面 | 指南和公共卫生事实 | 按题核验 | 只在正式研究阶段读取 |
| PubMed／Europe PMC | 原始研究与综述 | 按题核验 | 只在正式研究阶段深读 |
| 公开病例报告 | 发现少见情境和专业问题 | 暂不作为常规选题源 | 仅限去标识化专业出版物 |
| 书籍 | 长期框架与经典知识 | 待建立创作者自有书单 | 只用合法目录、摘要、公开节选或自有材料 |

YouTube 配额变化时核验[官方配额说明](https://developers.google.com/youtube/v3/determine_quota_cost)；AnySearch 套餐变化时核验[官方价格页](https://anysearch.com/pricing)。

## 五、国内平台

| 平台 | 当前状态 | 下一条件 |
|---|---|---|
| B站 | 部分可用／查询不稳定 | 状态检查显示公开搜索接口可达，但第二批两个健康查询返回拦截页、一个长查询语义漂移；下轮先用短用户词测试，失败最多重试一次 |
| 小红书 | OpenCLI 未连接 | 用户保持已登录 Chrome 并连接扩展，或手工导出同域 Cookie |
| 公众号 | 尚无稳定通用抓取路径 | 先由创作者提供明确账号和公开文章链接 |
| 视频号 | 尚无稳定通用抓取路径 | 先用人工观察和明确链接记录 |
| 抖音 | 尚未建立稳定只读链路 | 先按对标总表人工核验，不自动登录或高频抓取 |

## 六、每轮来源记录

每轮运行记录必须写明：

- 观察窗口；
- 实际调用次数、YouTube 配额、xAI tokens／内部工具数／实扣美元；
- 访问成功、失败、待核验和语义漂移；
- 哪些来源只是信号，哪些进入正式证据研究；
- 是否触发费用、隐私、版权或医学边界停止规则。
