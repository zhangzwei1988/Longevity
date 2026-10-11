from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools import subset
import json, html, hashlib

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
FONT = ROOT / 'fonts/SourceHanSerifSC-SemiBold.otf'
font = TTFont(FONT)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
upem = font['head'].unitsPerEm
GREEN, PAPER, ORANGE = '#1e493c', '#f5f1e8', '#e86f3e'
palette=[('品牌绿',GREEN,'稳定与识别 · 主标 / 标题'),('暖纸白',PAPER,'阅读与留白 · 大面积背景'),('活力橙',ORANGE,'少量点题 · 重点 / 装饰'),('墨绿','#152b24','正文 / 高对比信息'),('行动绿','#227d66','圈出行动 / 非默认正文'),('批注红','#bd4a35','质疑与边界 / 配合文字')]

def lettering(text, x, y, size, color=GREEN, tracking=0):
    out=[]
    for char in text:
        name=cmap.get(ord(char))
        if not name: raise ValueError(char)
        pen=SVGPathPen(glyphs); glyphs[name].draw(pen)
        out.append(f'<path d="{pen.getCommands()}" transform="translate({x:.3f} {y}) scale({size/upem:.6f} {-size/upem:.6f})" fill="{color}"/>')
        x += glyphs[name].width * size / upem + tracking
    return ''.join(out)

def mark(color=GREEN, accent=None):
    accent=accent or color
    # Original filled vector geometry. No font or stock icon in the symbol.
    return f'''<g fill="{color}">
    <path d="M61 18L75 24L58 59L45 53Z"/>
    <path d="M63 35H128V49H63Z"/>
    <path d="M47 68H129V82H61V105H144V119H29V105H47Z"/>
    <path d="M89 48H103V130Q103 139 112 139H144V153H111Q89 153 89 131Z"/>
    </g><path d="M138 35H152V49H138Z" fill="{accent}"/>'''

def alt_b(color=GREEN):
    return f'<g fill="none" stroke="{color}" stroke-width="13"><path d="M132 45A61 61 0 1 0 139 116"/><path d="M112 69A31 31 0 1 0 114 109"/><path d="M86 91H151"/></g>'

def alt_c(color=GREEN):
    return f'<g fill="{color}"><path d="M27 29H83V140L56 124L27 140ZM41 43V115L56 107L69 115V43Z" fill-rule="evenodd"/><path d="M98 29H112V126H148V140H98Z"/><path d="M111 29H148V43H111Z"/></g>'

def svg(body,w,h,label):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><title>{html.escape(label)}</title>{body}</svg>'

def save(name,body,w,h,label):
    (ASSETS/name).write_text(svg(body,w,h,label))

for variant,color,accent in [('primary',GREEN,ORANGE),('mono',GREEN,GREEN),('black','#000000','#000000'),('reverse',PAPER,PAPER)]:
    save(f'icon-{variant}.svg',mark(color,accent),180,180,f'健年 年字长线 图形 {variant}')
    body=f'<g transform="translate(2 1) scale(.87)">{mark(color,accent)}</g>'
    body+=lettering('健年',186,108,91,color,6)
    body+=lettering('HEALTHSPAN',190,142,18,color,2.4)
    save(f'logo-horizontal-{variant}.svg',body,420,170,f'健年 Healthspan 横式标志 {variant}')
    chinese=f'<g transform="translate(2 1) scale(.87)">{mark(color,accent)}</g>'+lettering('健年',186,122,99,color,6)
    save(f'logo-chinese-{variant}.svg',chinese,420,170,f'健年 中文组合标志 {variant}')
    body=f'<g transform="translate(60 0)">{mark(color,accent)}</g>'
    body+=lettering('健年',62,269,82,color,7)
    body+=lettering('HEALTHSPAN',65,305,17,color,2)
    save(f'logo-stacked-{variant}.svg',body,300,330,f'健年 Healthspan 竖式标志 {variant}')

save('wordmark-chinese-black.svg',lettering('健年',20,128,122,'#000000',7),300,160,'健年 中文字标 黑色')
save('direction-b.svg',alt_b(),180,180,'方向 B 活力之环')
save('direction-c.svg',alt_c(),180,180,'方向 C 功课书签')
save('avatar.svg',f'<rect width="512" height="512" fill="{GREEN}"/><g transform="translate(98 88) scale(1.75)">{mark(PAPER,PAPER)}</g>',512,512,'健年品牌头像')
save('endorsement.svg',lettering('多活十年 Lab',12,46,38,GREEN)+f'<path d="M13 65H300" stroke="{GREEN}"/>'+lettering('健年旗下内容账号',14,97,21,GREEN),320,120,'多活十年 Lab 健年背书组合')

# Standalone editable applications, all visible text converted to outlines.
save('business-card-front.svg',f'<rect width="900" height="540" fill="{GREEN}"/><g transform="translate(342 58) scale(1.15)">{mark(PAPER)}</g>'+lettering('健年',344,374,92,PAPER,8)+lettering('HEALTHSPAN',355,421,20,PAPER,2.8),900,540,'品牌名片正面 90×54毫米比例，未含出血')
save('business-card-back.svg',f'<rect width="900" height="540" fill="{PAPER}"/><path d="M65 70H835" stroke="{GREEN}" stroke-width="2"/>'+lettering('让有活力的人生，',64,186,42)+lettering('尽可能长。',64,250,42)+lettering('健年 Healthspan',65,394,25)+lettering('查依据 · 拆问题 · 看长期',65,449,20),900,540,'品牌理念卡背面，不含个人联系方式')

cover=f'<rect width="1080" height="1440" fill="{PAPER}"/><rect x="60" y="60" width="960" height="1320" fill="none" stroke="{GREEN}" stroke-width="2"/>'
cover+=lettering('健康功课',100,172,35)+f'<path d="M100 212H980" stroke="{GREEN}" stroke-width="3"/>'
cover+=lettering('这笔健康钱，',100,440,94)+lettering('先别急着花。',100,590,94)
cover+=f'<path d="M104 637H865" stroke="{ORANGE}" stroke-width="15"/>'
cover+=lettering('先写下你希望它解决的问题。',104,785,37)
cover+=lettering('看依据',108,965,51)+lettering('看目标',108,1055,51)+lettering('看成本',108,1145,51)
cover+=lettering('多活十年 Lab',105,1310,33)+lettering('健年旗下内容账号',720,1310,23)
save('social-cover-3x4.svg',cover,1080,1440,'内容封面示例，非医疗结论')

sheet=f'<rect width="840" height="1188" fill="{PAPER}"/>'+lettering('健康功课单',65,114,51)+lettering('多活十年 Lab',65,165,22)+f'<path d="M65 200H775" stroke="{GREEN}" stroke-width="3"/>'
for i,t in enumerate(['这次要拆的问题','值不值得信','值不值得做','值不值得花钱','证据到哪一步','今天能做的一件事','需要专业确认的事']):
    y=277+i*111
    sheet+=lettering(t,65,y,27)+f'<path d="M65 {y+39}H775" stroke="#adc3b5" stroke-width="1.5"/>'
sheet+=lettering('通用信息整理与沟通准备，不替代个人诊疗。',65,1104,18)
save('health-homework-sheet.svg',sheet,840,1188,'空白健康功课单，可编辑矢量模板')

video=f'<rect width="1920" height="1080" fill="{GREEN}"/>'+lettering('多活十年 Lab',100,130,35,PAPER)+lettering('这件事，',100,400,125,PAPER)+lettering('先别急着信。',100,580,125,PAPER)+lettering('看依据 · 看适用范围 · 看局限',110,760,43,PAPER)+lettering('健年旗下内容账号',1440,980,30,PAPER)
save('video-title-16x9.svg',video,1920,1080,'视频标题页 16:9，非医疗结论')
letterhead=f'<rect width="840" height="1188" fill="{PAPER}"/><g transform="translate(54 30) scale(.34)">{mark()}</g>'+lettering('健年 Healthspan',126,69,25)+f'<path d="M65 111H775" stroke="{GREEN}" stroke-width="2"/><path d="M65 1075H775" stroke="{GREEN}" stroke-width="1"/>'+lettering('让有活力的人生，尽可能长。',65,1120,20)
save('letterhead-a4.svg',letterhead,840,1188,'健年 A4 文档底板，不含虚构身份信息')

# Overview board for reviewing the complete direction at a glance.
overview=f'<rect width="1600" height="1060" fill="{PAPER}"/>'+lettering('健年 · 品牌识别提案',70,71,25)+lettering('A / 年字长线',1290,71,20)
overview+=f'<path d="M70 106H1530" stroke="#adc3b5"/>'
overview+=f'<g transform="translate(100 180) scale(1.6)">{mark(GREEN,ORANGE)}</g>'+lettering('健年',414,365,142,GREEN,10)+lettering('HEALTHSPAN',426,425,27,GREEN,4)
overview+=lettering('让有活力的人生，',870,293,43)+lettering('尽可能长。',870,370,55)+lettering('主 slogan 沿用已确认品牌表达',875,440,21)
overview+=f'<rect x="70" y="550" width="570" height="365" fill="{GREEN}"/><g transform="translate(274 597) scale(.9)">{mark(PAPER)}</g>'+lettering('健年',270,838,68,PAPER,6)
overview+=f'<rect x="667" y="550" width="370" height="365" fill="#e6e8dc"/>'+lettering('多活十年 Lab',700,625,30)+f'<path d="M700 654H1000" stroke="{GREEN}"/>'+lettering('健康少踩坑，',700,737,34)+lettering('花钱少冤枉。',700,793,34)+lettering('健年旗下内容账号',700,871,19)
for i,(name,c,_) in enumerate(palette[:3]):
    overview+=f'<rect x="1065" y="{550+i*122}" width="465" height="105" fill="{c}" stroke="#adc3b5"/>'+lettering(name+' '+c.upper(),1093,613+i*122,23,PAPER if i==0 else GREEN)
overview+=lettering('原创图形 / 中文标准字 / 横竖组合 / 头像 / 内容与文档模板',70,990,23)+lettering('评审稿 · 尚未完成商标近似检索',1120,990,19)
save('brand-overview',overview,1600,1060,'健年品牌设计总览')
# Use the standard .svg suffix for the overview asset.
(ASSETS/'brand-overview').rename(ASSETS/'brand-overview.svg')

def image(name, cls='', **kw):
    attrs=' '.join(f'{k}="{v}"' for k,v in kw.items())
    return f'<img src="assets/{name}.svg" class="{cls}" alt="{name}" {attrs}>'

sections=[]
def page(title,body,cls=''):
    i=len(sections)+1
    sections.append(f'<section class="page {cls}" id="p{i}"><header><span>健年 HEALTHSPAN</span><span>{title}</span></header>{body}<footer><span>品牌识别提案 · 评审稿 · 2026-09-08</span><span>{i:02d} / 12</span></footer></section>')

page('01 / 品牌主张',f'''<div class="hero-grid"><div><p class="eyebrow">让时间，留下活力</p><h1>让有活力的人生，<br><em>尽可能长。</em></h1><p class="lead">健年品牌识别与商标设计提案</p><p class="muted">从健康功课出发，走向长期的信任。</p></div><div class="hero-logo">{image('logo-stacked-primary')}</div></div><div class="bottomline"><span>中文品牌 / 健年</span><span>英文展示 / Healthspan</span><span>推荐图形 / 年字长线</span></div>''','cover')

page('02 / 从战略长出的品牌','''<p class="eyebrow">已有事实 · 设计依据</p><h2>把复杂的健康信息，<br>变成有依据的选择。</h2><div class="cols three principles"><article><b>服务谁</b><h3>忙碌的家庭<br>健康决策者</h3><p>核心关注 35—55 岁的经营者、管理者和专业人士。重视证据、时间、隐私与长期生活能力。</p></article><article><b>当下做什么</b><h3>替忙人<br>做健康功课</h3><p>查依据、拆问题、算投入，帮助理解哪些值得信、值得做、值得花钱。</p></article><article><b>长期走向哪</b><h3>从内容信任<br>走向持续帮助</h3><p>真实问题反复出现后，再验证工具、专业合作与家庭健康管理服务。</p></article></div><div class="note">品牌气质建议 · 可靠、清醒、有温度、有长期感。当前没有已验证付费产品；视觉应用不代表服务已上线。</div>''')

page('03 / 三个商标图形方向',f'''<p class="eyebrow">设计比较 · 非注册检索结论</p><h2>让人记住“健年”。</h2><div class="cols three directions"><article class="selected"><span class="tag">A / 推荐</span>{image('icon-primary')}<h3>年字长线</h3><p>从“年”出发，末笔延展。名称联想直接，也能形成独立图形。</p><small>优点：中文记忆强，延展性好。<br>待测：不解释时能否读出“年”。</small></article><article><span class="tag">B / 对照</span>{image('direction-b')}<h3>活力之环</h3><p>打开的双环连接向前的线，表达时间与持续行动。</p><small>优点：轻盈、易缩小。<br>局限：环形母题较常见。</small></article><article><span class="tag">C / 对照</span>{image('direction-c')}<h3>功课书签</h3><p>书页和书签构成几何标记，贴近研究、整理与内容。</p><small>优点：内容入口贴切。<br>局限：容易把母品牌锁在出版印象。</small></article></div>''')

page('04 / 主标志与组合',f'''<div class="cols two"><div><p class="eyebrow">推荐方向 A · 年字长线</p><h2>每一年，<br>都值得认真积累。</h2><p class="bodycopy">保留“年”的识别骨架，用稳定横画建立秩序。末笔向右延伸，作为可持续行动的视觉隐喻；橙色方点只提供轻微活力。</p><p class="muted">以上为设计意图，不代表健康效果或延寿承诺。图形可以完全单色使用。</p></div><div class="construction">{image('icon-primary')}<span>汉字记忆 × 持续行动 × 开放未来</span></div></div><div class="lockups"><div>{image('logo-horizontal-primary')}<small>默认横式 · 官网、页眉、合作材料</small></div><div class="dark">{image('logo-horizontal-reverse')}<small>反白横式 · 深色背景</small></div><div>{image('icon-mono')}<small>独立图形 · 头像、小尺寸标识</small></div></div>''')

page('05 / 小尺寸与使用规则',f'''<p class="eyebrow">识别应当经得起缩小与单色</p><h2>简单，才能长期使用。</h2><div class="cols two"><div><div class="sizes">{''.join(f'<div>{image("icon-mono",width=n,height=n)}<small>{n} px</small></div>' for n in [24,32,48,96])}</div><div class="safe">{image('icon-mono')}<span>安全留白 ≥ 图形可见高度的 1/4</span></div></div><div class="rules"><h3>基础规范</h3><p>图形建议最小 24 px / 8 mm；16 px 只用单色图形，须按实际设备复测。</p><p>横式组合建议宽度 ≥ 180 px / 40 mm。若英文已不可读，改用独立图形或中文组合。</p><p>以交付 SVG 比例为准。不得拉伸、倾斜、换笔画，或把橙点随意移到其他位置。</p><p>深底使用反白；照片背景加独立纯色留白区。头像保持主体居中，适配圆形裁切。</p><p>主标不使用渐变、投影、金属效果，也不加医疗十字。注册获准前不加 ®。</p></div></div>''')

palette=[('品牌绿',GREEN,'稳定与识别 · 主标 / 标题'),('暖纸白',PAPER,'阅读与留白 · 大面积背景'),('活力橙',ORANGE,'少量点题 · 重点 / 装饰'),('墨绿','#152b24','正文 / 高对比信息'),('行动绿','#227d66','圈出行动 / 非默认正文'),('批注红','#bd4a35','质疑与边界 / 配合文字')]
page('06 / 色彩与字体',f'''<p class="eyebrow">延续现有官网资产</p><h2>深绿的稳，纸张的暖。</h2><div class="swatches">{''.join(f'<div><i style="background:{c}"></i><b>{n}</b><code>{c.upper()}</code><small>{d}</small></div>' for n,c,d in palette)}</div><div class="cols two typography"><div><h3 class="serif">健年 · 让有活力的人生，尽可能长。</h3><p>标题与中文标准字采用思源宋体简体 SemiBold。字标已转为路径；标题保留中文书卷气。</p></div><div><h3 class="sans">把依据说清楚，把下一步做简单。</h3><p>正文使用系统黑体；跨设备发布图片与印刷稿须嵌入字体或转曲。英文展示统一为 HEALTHSPAN。</p></div></div><div class="note">建议用量：暖白约 65%，绿系约 30%，橙色 ≤ 5%。橙色不用于暖白上的小字正文；红绿标记同时写清含义。RGB 已定义，印刷 CMYK 依纸张与 ICC 打样确认。</div>''')

page('07 / 名称、slogan 与语言', '''<p class="eyebrow">把长期品牌与内容账号分清楚</p><h2>一句话，讲清一层价值。</h2><div class="verbal"><div><span>母品牌主 slogan · 已有表达</span><h3>让有活力的人生，尽可能长。</h3><p>用于品牌首页、品牌手册、理念卡与合作介绍。</p></div><div><span>母品牌方法 · 已有表达</span><h3>科学养生，少走弯路。</h3><p>用于解释品牌方法，不与主 slogan 在同一主画面争夺注意力。</p></div><div><span>内容账号 slogan · 已确认</span><h3>健康少踩坑，花钱少冤枉。</h3><p>归属“多活十年 Lab”；简介沿用“专替忙人做健康功课，帮你少踩坑、少花冤枉钱。”</p></div></div><div class="note">新增传播备选：“把活力，留给未来。”仅作为活动短句候选，不替换已确认主张。Healthspan 沿用为英文展示，独立商标显著性仍需评估；JIANNIAN 仅作拼音检索词。</div>''')

page('08 / 品牌关系与成长',f'''<p class="eyebrow">一套母品牌，清晰的公众入口</p><div class="architecture"><div class="parent">{image('logo-horizontal-primary')}<p>长期品牌 · 标准、信任与未来服务</p></div><div class="connector"></div><div class="child">{image('endorsement')}<p>当前内容账号 · 专替忙人做健康功课</p></div></div><div class="journey"><b>有用内容</b><span>→</span><b>信任与真实问题</b><span>→</span><b>小范围帮助与验证</b><span>→</span><b>持续服务</b></div><div class="note">当前只建立“健年 → 多活十年 Lab”的对外关系。未来栏目可先用“健年 + 功能描述”作为名称规则；没有真实需求与验证前，不建立新的子品牌矩阵。</div>''')

page('09 / 品牌基础应用',f'''<p class="eyebrow">已交付可编辑矢量模板</p><h2>从一次见面，到一份功课。</h2><div class="application-grid"><div><div class="cards">{image('business-card-front')}{image('business-card-back')}</div><div class="avatar-row">{image('avatar')}<p><b>品牌头像 + 双面理念卡</b><br>头像用于健年母品牌；现有内容账号如要更换头像，再按识别测试决定。理念卡不填写虚构联系方式。</p></div></div><div class="sheet">{image('health-homework-sheet')}<small>健康功课单 · A4 比例 · 空白模板</small></div></div>''')

page('10 / 内容与数字应用',f'''<div class="cols two content-app"><div class="social">{image('social-cover-3x4')}</div><div><p class="eyebrow">内容视觉的固定动作</p><h2>红笔拆问题，<br>绿笔圈行动。</h2><p class="bodycopy">封面只保留一个真实问题。母品牌负责背书，内容账号负责与读者说话。长文、视频与功课单共用色彩、字形与批注语言。</p><div class="video"><span>多活十年 Lab</span><h3>这件事，<br>先别急着信。</h3><p>看依据 · 看适用范围 · 看局限</p><small>健年旗下内容账号</small></div><p class="muted">3:4 图文封面已交付 SVG；右侧为 16:9 视频标题页的版式示意。真人内容采用自然生活场景，避免用服饰暗示医疗权威。</p></div></div>''')

page('11 / 中国大陆注册准备', '''<p class="eyebrow">默认地域 · 中国大陆 / 截至 2026-09-08</p><h2>先确定保护对象，再确定类别。</h2><div class="cols two register"><div><h3>优先拆开评估</h3><ol><li><b>“健年”中文文字</b><br>品牌记忆的核心，先查相同与近似。</li><li><b>“年字长线”图形</b><br>单独检索图形及汉字变形近似。</li><li><b>“多活十年 Lab”文字</b><br>当前内容入口，有实际使用价值。</li></ol><p>组合标识可补充评估；Healthspan 和 slogan 的显著性另行审查，不默认全部申请。</p></div><div><h3>类别按真实业务选择</h3><p><b>41 类 / 优先核查</b><br>围绕内容、教育、非下载出版与相关视频服务，逐项映射实际活动。</p><p><b>44 类 / 长期方向专项评估</b><br>核对未来保健咨询等服务意图、具体项目与资质。商标注册不授予执业资格。</p><p><b>9 / 16 / 42 / 35 类 / 有业务再选</b><br>分别对应相关下载产品、印刷品、软件服务及为他人提供的广告等；不因“做品牌”就全选。</p></div></div><div class="note">未完成在先商标正式检索，不代表名称或图形可注册。官费参考：电子申请每标每类 270 元，限 10 项，超项另计；代理费另计。2026 年修订法将于 2027-01-01 施行，跨期提交须重核规则。详见配套注册准备文件与官方来源。</div>''')

page('12 / 一整套品牌，还需要什么', '''<p class="eyebrow">本次交付与启用顺序</p><h2>先把必要的做好。</h2><div class="cols three checklist"><article><h3>本次已交付</h3><p>定位与品牌表达梳理<br>三个图形设计方向<br>主方案横式 / 竖式 / 单色<br>中文独立字标与头像<br>色彩、字体、留白与尺寸<br>账号背书与内容封面<br>理念卡与健康功课单<br>注册准备图样与清单</p></article><article><h3>正式启用前</h3><p>确定主图形与标准组合<br>确定申请主体和真实业务<br>完成文字、图形近似检索<br>锁定申请图样与服务项目<br>验证 24 px 与单色实物<br>字体与图形权利归档<br>已有账号逐项核对名称<br>签字确认品牌定稿版本</p></article><article><h3>业务出现后</h3><p>真实账号与联系方式规范<br>对外合作介绍与合同页眉<br>服务说明和专业身份说明<br>相应的隐私告知与授权<br>实际商品所需包装与标签<br>商标使用证据与续展台账</p></article></div><div class="closing">建议先选 A“年字长线”，保留既有主 slogan。<br><span>设计确认与商标检索，是进入正式启用的两个独立条件。</span></div><p class="tiny">项目依据：决策 0009、品牌与内容总纲、品牌战略、医疗与隐私边界、官网色彩。详细来源、授权、注册步骤及待确认项见 README 与 registration/注册准备.md。</p>''')

css='''
@font-face{font-family:JiannianSerif;src:url(fonts/brand-serif.woff2) format('woff2');font-weight:600;font-display:block}
:root{--green:#1e493c;--ink:#152b24;--paper:#f5f1e8;--orange:#e86f3e;--line:#c5cec2}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#d9ded5;color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;-webkit-font-smoothing:antialiased}img{display:block;max-width:100%}h1,h2,h3,p{margin:0}h1,h2,.serif{font-family:JiannianSerif,'Songti SC',serif}h1{font-size:49px;line-height:1.5;letter-spacing:-1.6px;font-weight:600}h1 em{color:var(--orange);font-style:normal}h2{font-size:39px;line-height:1.42;font-weight:600;margin-bottom:25px}h3{font-size:24px;line-height:1.5;font-weight:600}p{font-size:16px;line-height:1.8}small{font-size:12px;line-height:1.7}button,a{color:inherit}.toolbar{position:sticky;top:0;z-index:5;max-width:1120px;margin:auto;background:var(--green);color:var(--paper);padding:13px 22px;display:flex;justify-content:space-between;align-items:center;font-size:13px}.toolbar a{margin-left:15px;text-decoration:none}.page{width:1120px;height:792px;background:var(--paper);margin:24px auto;position:relative;padding:90px 64px 62px;overflow:hidden}header,footer{position:absolute;left:64px;right:64px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:1.1px}header{top:29px;padding-bottom:14px;border-bottom:1px solid var(--line);font-weight:600}footer{bottom:25px;color:#53665c}.eyebrow{font-size:12px;letter-spacing:2px;color:#546d5e;margin-bottom:20px}.lead{font-size:20px;margin-top:30px}.muted{color:#596b61;font-size:14px;margin-top:13px}.bodycopy{font-size:17px;line-height:1.85;max-width:450px}.cols{display:grid;gap:36px}.two{grid-template-columns:1fr 1fr}.three{grid-template-columns:repeat(3,1fr)}.note{border-top:1px solid var(--line);padding-top:18px;font-size:14px;line-height:1.8;margin-top:24px;color:#4b6255}.hero-grid{display:grid;grid-template-columns:1.5fr .7fr;gap:36px;align-items:center;min-height:480px}.hero-logo{border-left:1px solid var(--line);padding-left:38px}.hero-logo img{width:290px}.bottomline{border-top:1px solid var(--line);padding-top:24px;display:flex;gap:52px;font-size:12px}.cover{background:var(--paper)}.principles{margin-top:30px}.principles article{border-top:3px solid var(--green);padding-top:20px}.principles article b{color:#5c6f60;font-size:13px}.principles h3{margin:20px 0 18px;font-family:JiannianSerif,serif;font-size:29px}.directions{gap:22px}.directions article{border:1px solid var(--line);padding:24px 22px 20px;height:432px}.directions article.selected{border:2px solid var(--green);background:#e8ebdf}.tag{font-size:12px;letter-spacing:1px}.directions img{height:138px;margin:10px auto 14px}.directions h3{font-family:JiannianSerif,serif;margin-bottom:12px}.directions p{font-size:14px;line-height:1.8}.directions small{display:block;margin-top:14px;color:#536b5a}.construction{height:350px;background:#e9e9dc;display:grid;place-items:center;position:relative}.construction img{width:250px;background-image:linear-gradient(#d6ddcf 1px,transparent 1px),linear-gradient(90deg,#d6ddcf 1px,transparent 1px);background-size:25px 25px}.construction span{font-size:12px;align-self:start}.lockups{display:grid;grid-template-columns:1.2fr 1.2fr .65fr;margin-top:30px;gap:18px}.lockups>div{height:172px;background:#e8e8dc;display:flex;align-items:center;flex-direction:column;justify-content:center;padding:18px 13px}.lockups img{width:250px;height:105px}.lockups small{font-size:10px}.lockups .dark{background:var(--green);color:var(--paper)}.sizes{display:flex;align-items:end;justify-content:space-between;gap:30px;min-height:150px;padding:15px;background:#e8ebdf}.sizes small{display:block;text-align:center;margin-top:12px}.safe{margin-top:26px;display:grid;place-items:center;height:270px;border:1px dashed #b3c1b3}.safe img{width:180px;border:1px solid #9aae9b;padding:26px;box-sizing:content-box}.safe span{font-size:12px}.rules h3{margin:5px 0 14px}.rules p{font-size:15px;line-height:1.85;margin-bottom:15px}.swatches{display:grid;grid-template-columns:repeat(6,1fr);gap:15px;margin-top:28px}.swatches i{display:block;height:100px;border:1px solid #d0d7cb;margin-bottom:12px}.swatches b,.swatches code,.swatches small{display:block}.swatches b{font-size:15px}.swatches code{font-size:12px;margin:6px 0}.swatches small{font-size:11px;color:#53695c}.typography{margin-top:38px;padding-top:26px;border-top:1px solid var(--line)}.typography h3{font-size:23px;margin-bottom:12px}.typography p{font-size:14px}.verbal>div{display:grid;grid-template-columns:220px 1fr;border-top:1px solid var(--line);padding:22px 0;gap:7px 25px}.verbal span{font-size:12px;padding-top:8px;color:#586f5e}.verbal h3{font-family:JiannianSerif,serif;font-size:28px}.verbal p{grid-column:2;font-size:13px;color:#53675b}.architecture{display:grid;place-items:center}.parent{background:#e4e8dc;padding:20px 65px;text-align:center}.parent img{width:270px}.parent p,.child p{font-size:12px;text-align:center;margin-top:8px}.connector{height:34px;width:1px;background:var(--green)}.child{padding:16px 55px;border:1px solid var(--line)}.child img{width:255px}.journey{display:flex;justify-content:space-between;align-items:center;margin-top:30px;padding:26px 0;border-block:1px solid var(--line);font-size:14px}.journey span{color:var(--orange)}.application-grid{display:grid;grid-template-columns:1.3fr .7fr;gap:70px}.cards{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:center;min-height:215px}.cards img{box-shadow:4px 6px 0 #d2d9ca}.cards img:first-child{transform:rotate(-3deg)}.cards img:last-child{transform:rotate(3deg)}.sheet img{height:420px;border:1px solid var(--line);margin:auto}.sheet small{display:block;text-align:center;margin-top:10px}.avatar-row{display:flex;gap:25px;align-items:center;margin-top:45px}.avatar-row img{width:95px;height:95px;border-radius:50%}.avatar-row p{font-size:13px}.avatar-row b{display:inline-block;margin-bottom:8px}.content-app{grid-template-columns:.78fr 1fr;gap:55px}.social img{height:565px;border:1px solid var(--line);box-shadow:9px 9px 0 #d6dcce}.content-app h2{font-size:35px;margin-bottom:15px}.content-app .bodycopy{font-size:15px}.video{margin-top:20px;aspect-ratio:16/9;background:var(--green);color:var(--paper);padding:24px;position:relative}.video>span{font-size:11px}.video h3{font-family:JiannianSerif,serif;font-size:30px;line-height:1.4;margin:15px 0 8px}.video p{font-size:11px;color:#d0decb}.video small{position:absolute;bottom:19px;right:20px;font-size:9px}.content-app .muted{font-size:12px}.register h3{margin-bottom:14px}.register ol{margin:0;padding-left:20px}.register li{font-size:15px;line-height:1.8;margin-bottom:13px}.register p{font-size:14px;line-height:1.8;margin-top:13px}.register+.note{font-size:12px}.checklist article{padding:24px 20px;background:#e9ebdf}.checklist h3{font-family:JiannianSerif,serif;margin-bottom:16px}.checklist p{font-size:14px;line-height:2}.closing{font-family:JiannianSerif,serif;font-size:24px;margin-top:28px}.closing span{font-family:-apple-system,'PingFang SC',sans-serif;font-size:15px}.tiny{font-size:10px;color:#586e5e;margin-top:20px}.sans{font-family:-apple-system,'PingFang SC',sans-serif}
@media(max-width:1150px){.toolbar{width:1120px}.page{margin:12px 0}}
@media print{@page{size:1120px 792px;margin:0}body{background:white}.toolbar{display:none}.page{margin:0;break-after:page;page-break-after:always;print-color-adjust:exact;-webkit-print-color-adjust:exact}.page:last-child{break-after:auto}}
'''
nav='<div class="toolbar"><b>健年 · 品牌设计评审</b><div><a href="#p3">看方向</a><a href="#p9">看应用</a><a href="#p11">注册准备</a><a href="output/健年品牌识别手册-评审稿.pdf">下载 PDF</a></div></div>'
document='<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>健年 · 品牌识别与商标提案</title><link rel="stylesheet" href="styles.css"></head><body>'+nav+''.join(sections)+'</body></html>'
(ROOT/'index.html').write_text(document)
(ROOT/'styles.css').write_text(css)

# Locally subset the licensed font; keep original license and attribution.
opts=subset.Options(); opts.flavor='woff2'
sf=TTFont(FONT); sub=subset.Subsetter(options=opts); sub.populate(text=document+'健年HEALTHSPAN'+''.join(palette[i][0] for i in range(len(palette)))); sub.subset(sf)
# Respect the upstream Reserved Font Name when distributing a modified subset.
renames={1:'Jiannian Review Serif',2:'SemiBold',3:'JiannianReviewSerif-SemiBold-20260908',4:'Jiannian Review Serif SemiBold',6:'JiannianReviewSerif-SemiBold',16:'Jiannian Review Serif',17:'SemiBold'}
for rec in sf['name'].names:
    if rec.nameID in renames: rec.string=renames[rec.nameID].encode(rec.getEncoding())
if 'CFF ' in sf:
    cff=sf['CFF '].cff; cff.fontNames=['JiannianReviewSerif-SemiBold']; top=cff.topDictIndex[0]; top.FamilyName='Jiannian Review Serif'; top.FullName='Jiannian Review Serif SemiBold'
sf.flavor='woff2'; sf.save(ROOT/'fonts/brand-serif.woff2')
(ROOT/'assets/manifest.json').write_text(json.dumps({'status':'review-proposal','date':'2026-09-08','recommended':'A 年字长线','geometry':'Original geometric paths authored for this proposal; trademark similarity clearance not performed.','lettering':'Source Han Serif SC SemiBold; SIL OFL 1.1; outlined in all standalone SVGs.','palette':dict((n,c) for n,c,_ in palette),'assets':[{'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(ASSETS.glob('*.svg'))]},ensure_ascii=False,indent=2))
print(f'Created {len(list(ASSETS.glob("*.svg")))} SVG assets and {len(sections)} brandbook pages.')
