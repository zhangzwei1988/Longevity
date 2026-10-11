# 公众号排版组件库——健年刊读

> 版本：V0.1 试验  
> 状态：`Testing / Unregistered`  
> 结构模型：低到中密度的编辑刊读；真实场景先行，章节靠细线与留白建立秩序，语义提示像编辑批注，不使用模板化目录、巨大编号和默认三连。

## 一、设计变量速查表

| 角色 | 色值 | 用法 |
|---|---:|---|
| 纸色 | `#F5F1E8` | 正文与图片承接 |
| 深纸色 | `#EAE3D5` | 证据核对与来源附录 |
| 墨色 | `#152B24` | 正文、标题、必要高对比文字 |
| 品牌绿 | `#1E493C` | 行动、链接、稳态判断 |
| 深绿 | `#0F3028` | 强锚点备用，不大面积使用 |
| 鼠尾草绿 | `#ADC3B5` | 边界、次级线条、章节节奏 |
| 薄荷绿 | `#DFE9DF` | 行动浅底 |
| 暖橙 | `#E86F3E` | 暂停、拆坑、编辑批注 |
| 暖橙浅底 | `#F9E1D2` | 暂停与记录提示背景 |
| 次级文字 | `#56665F` | 署名、附录、次级说明 |
| 分隔线 | `#C7C8BE` | 结构线 |

字体：`system`。正文 17px／1.85，标题 20px／1.45，提示 16px／1.8，来源 13px／1.75。圆角很小或不用；不使用厚阴影。

## 二、组件

### 1. 全局阅读容器

```html
<section style="box-sizing:border-box;width:100%;max-width:100%;margin:0;padding:0 2px;background:#F5F1E8;color:#152B24;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;word-break:break-word;overflow-wrap:anywhere;">
  <p style="margin:0 0 16px;font-size:17px;line-height:1.85;letter-spacing:0.02em;color:#152B24;"><span leaf="">正文内容占位</span></p>
</section>
```

### 2. 普通正文与局部重点

```html
<p style="margin:0 0 16px;font-size:17px;line-height:1.85;letter-spacing:0.02em;color:#152B24;">
  <span leaf="">普通正文占位，只有真正需要记住的短句才使用</span><strong style="font-weight:700;color:#1E493C;background:linear-gradient(transparent 68%,#DFE9DF 68%);"><span leaf="">局部重点</span></strong><span leaf="">。</span>
</p>
```

使用频率服从健年规范：每 2—4 个普通段落最多一个局部重点，不执行 gzh-design 默认的逐段关键词下划线。

### 3. 主章节标题——暖橙批注线

```html
<section style="margin:42px 0 18px;">
  <p style="margin:0 0 9px;line-height:1;"><span style="display:inline-block;width:42px;border-top:4px solid #E86F3E;"><span leaf=""><br></span></span></p>
  <h2 style="margin:0;font-size:20px;line-height:1.45;font-weight:700;color:#152B24;"><span leaf="">自然章节标题占位</span></h2>
  <p style="margin:10px 0 0;line-height:1;border-bottom:1px solid #C7C8BE;"><span leaf=""><br></span></p>
</section>
```

### 4. 主章节标题——鼠尾草呼吸线

```html
<section style="margin:42px 0 18px;">
  <p style="margin:0 0 9px;line-height:1;"><span style="display:inline-block;width:42px;border-top:3px dashed #ADC3B5;"><span leaf=""><br></span></span></p>
  <h2 style="margin:0;font-size:20px;line-height:1.45;font-weight:700;color:#152B24;"><span leaf="">自然章节标题占位</span></h2>
  <p style="margin:10px 0 0;line-height:1;border-bottom:1px solid #C7C8BE;"><span leaf=""><br></span></p>
</section>
```

两种标题交替使用，不显示英文标签和巨大章节编号。

### 5. 三级标题

```html
<p style="margin:28px 0 14px;padding-left:11px;border-left:3px solid #1E493C;font-size:17px;line-height:1.6;font-weight:700;color:#152B24;"><span leaf="">小标题占位</span></p>
```

### 6. 暂停／拆坑提示

```html
<section style="margin:22px 0 26px;padding:15px 17px;border-left:4px solid #E86F3E;background:#F9E1D2;border-radius:0 4px 4px 0;">
  <p style="margin:0;font-size:16px;line-height:1.8;color:#152B24;"><strong style="font-weight:700;color:#152B24;"><span leaf="">✋ 暂停判断占位</span></strong></p>
</section>
```

### 7. 证据／边界核对

```html
<section style="margin:22px 0 26px;padding:14px 17px;border-left:3px solid #152B24;border-top:1px dashed #ADC3B5;border-bottom:1px dashed #ADC3B5;background:#EAE3D5;">
  <p style="margin:0;font-size:16px;line-height:1.8;color:#152B24;"><strong style="font-weight:700;color:#152B24;"><span leaf="">🔍 证据核对占位</span></strong></p>
</section>
```

### 8. 记录／合同提示

```html
<section style="margin:22px 0 26px;padding:14px 17px;border-left:4px solid #E86F3E;border-top:1px dashed #F6C5AA;border-bottom:1px dashed #F6C5AA;background:#F9E1D2;">
  <p style="margin:0;font-size:16px;line-height:1.8;color:#152B24;"><strong style="font-weight:700;color:#152B24;"><span leaf="">🧾 记录提示占位</span></strong></p>
</section>
```

### 9. 低风险行动提示

```html
<section style="margin:22px 0 26px;padding:15px 17px;border-left:4px solid #1E493C;background:#DFE9DF;border-radius:0 4px 4px 0;">
  <p style="margin:0;font-size:16px;line-height:1.8;color:#152B24;"><strong style="font-weight:700;color:#1E493C;"><span leaf="">✅ 行动提示占位</span></strong></p>
</section>
```

### 10. 健康功课清单

```html
<section style="margin:0 0 28px;padding:16px 17px 8px;border-top:3px solid #1E493C;border-bottom:1px solid #C7C8BE;background:#F5F1E8;">
  <p style="margin:0 0 11px;font-size:16px;line-height:1.75;color:#152B24;"><strong style="font-weight:700;color:#152B24;"><span leaf="">功课问题占位</span></strong></p>
  <p style="margin:0 0 11px;font-size:16px;line-height:1.75;color:#152B24;"><strong style="font-weight:700;color:#152B24;"><span leaf="">功课问题占位</span></strong></p>
</section>
```

### 11. 正文图片

```html
<figure style="margin:26px 0 30px;padding:4px 4px 5px;background:#F5F1E8;border-top:1px solid #C7C8BE;border-bottom:1px solid #C7C8BE;">
  <span leaf=""><img src="图片路径" alt="准确的无障碍说明" style="max-width:100%;height:auto;display:block;margin:0 auto;"></span>
</figure>
```

Alt 不自动转成可见图注。只有来源、版权、数据口径或解释限制缺失会误导时，才另加读者可见说明。

### 12. 自然互动收束

```html
<section style="margin:30px 0 0;padding:20px 0 4px;border-top:1px solid #ADC3B5;">
  <p style="margin:0;font-size:17px;line-height:1.85;color:#152B24;"><span leaf="">自然互动问题占位</span></p>
</section>
```

不自动生成作者占位、点赞在看转发三连或销售按钮。

### 13. 来源附录

```html
<section style="margin:38px 0 0;padding:16px 14px 7px;border-top:1px solid #C7C8BE;background:#EAE3D5;color:#56665F;">
  <h3 style="margin:0 0 10px;font-size:14px;line-height:1.6;font-weight:600;letter-spacing:0.06em;color:#56665F;"><span leaf="">附录｜来源与说明</span></h3>
  <p style="margin:0 0 10px;font-size:13px;line-height:1.75;color:#56665F;"><strong style="font-weight:700;color:#152B24;"><span leaf="">资料参考：</span></strong><span leaf="">必要来源占位。</span></p>
</section>
```

## 三、完整文章模板骨架

```text
真实场景正文
→ 开场场景图
→ 暂停提示
→ 自然章节标题 A／B 交替
→ 正文＋克制局部重点
→ 证据／记录／行动提示按语义出现
→ 模块图片
→ 健康功课清单与功课单图片
→ 边界章节
→ 自然互动问题
→ 低权重来源附录
```

铁律：第一屏不放目录、引言卡、证据摘要或文章内封面；附录之后不再出现 CTA、签名和 END 装饰。

## 四、文章类型 → 组件组合配方

| 文章类型 | 核心组件 | 点缀组件 |
|---|---|---|
| 健康消费决策／深度分析 | 正文 2＋标题 3／4＋暂停 6＋证据 7＋行动 9 | 记录 8、功课清单 10、图片 11 |
| 证据翻译 | 正文 2＋标题 3／4＋证据 7＋边界 7 | 行动 9、图片 11 |
| 操作清单／就医准备 | 正文 2＋标题 3／4＋记录 8＋行动 9＋功课清单 10 | 证据 7、图片 11 |
| 创作者实践／复盘 | 正文 2＋标题 3／4＋记录 8＋自然收束 12 | 证据 7、行动 9、图片 11 |

所有长文固定保留：自然开场、必要图片、自然互动收束和来源附录。组件种类以内容语义为准，不为了展示主题而把所有组件用一遍。

## 五、Markdown → 组件映射规则

| Markdown／语义 | 组件 | 规则 |
|---|---|---|
| 普通段落 | 2 | 17px／1.85；不逐段加标记 |
| `**局部重点**` | 2 的局部重点 | 品牌绿＋薄荷绿底部轻标记 |
| `##` | 3／4 | 按出现顺序交替；不自动显示编号和英文标签 |
| `###` | 5 | 附录标题除外 |
| `> ✋` | 6 | 暂停／拆坑 |
| `> 🔍` 或边界核对 | 7 | 证据／边界 |
| `> 🧾` | 8 | 记录／合同 |
| `> ✅` | 9 | 低风险行动 |
| 四条连续加粗引用 | 10 | 健康功课清单 |
| 图片 | 11 | 保留 Alt，默认无可见图注 |
| 文章最后的自然问题 | 12 | 不改写成三连 |
| `### 附录｜来源与说明` | 13 | 低权重，附录后不加内容 |

## 六、与 gzh-design 默认行为的差异

- 健年品牌色盘优先，不自动选择内置主题；
- 不执行每段 1—3 个下划线标记；
- 不自动加目录、章节英文、巨大编号、作者占位或三连；
- 不把 Alt 变成图注；
- 不用四周虚线框强调普通内容；
- 使用 gzh-design 的 `<span leaf="">`、内联样式、平台禁用项校验和复制预览。
