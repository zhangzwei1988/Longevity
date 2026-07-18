import type { Metadata } from "next";

export const metadata: Metadata = { title: "虚构样板报告" };

export default function SamplePage() {
  return <main className="subpage"><div className="subpage-shell">
    <a className="back-link" href="/">← 返回健年首页</a>
    <section className="subpage-hero">
      <p className="kicker">DEMO-001 · 完全虚构</p>
      <h1>一年为健康花了 31,600 元，为什么还是不知道下一步？</h1>
      <p>这是一份产品结构样板。案例中的姓名、经历、消费和目标全部虚构，不对应任何真实个人，也不构成医学建议。</p>
      <div className="sample-facts">
        <article><span>虚构用户</span><strong>林舟，43 岁</strong></article>
        <article><span>过去 12 个月</span><strong>投入 ¥31,600</strong></article>
        <article><span>现实困扰</span><strong>投入很多，始终无法持续</strong></article>
      </div>
    </section>
    <section className="content-block">
      <h2>过去、现在和未来</h2>
      <div className="sample-map">
        <article><span>过去</span><h3>钱花了不少，没有留下可复用的答案</h3><p>健身、私教、智能手表、恢复服务和补剂各有目标，却没有共同基线和复盘日期。</p></article>
        <article><span>现在</span><h3>真正缺少的是一套管理闭环</h3><p>信息散落在设备、订单、日历和记忆里，购买工具没有自然变成长期行为。</p></article>
        <article><span>未来</span><h3>先服务于三种具体生活能力</h3><p>旅行徒步、独立搬运行李，以及工作之外仍有精力参加周末活动。</p></article>
      </div>
    </section>
    <section className="content-block">
      <h2>这次盘点看见了什么</h2>
      <h3>信息断点</h3><p>数据分别存在手表、日历、订单和记忆里，每次重新开始都难以利用过去经验。</p>
      <h3>认知断点</h3><p>购买工具时希望工具本身推动改变，容易继续寻找产品，而不是设计使用与复盘方式。</p>
      <h3>执行断点</h3><p>私教期间较稳定，外部约束消失后中断，没有形成能够适应出差节奏的持续机制。</p>
      <h3>资源断点</h3><p>没有给专业人员准备简洁目标、事实和问题，宝贵的沟通时间容易被背景叙述占用。</p>
    </section>
    <section className="content-block">
      <h2>用户最终带走什么</h2>
      <ul><li>一张连接长期能力、当前记录与既往投入的健康底图</li><li>五条带来源、适用范围和限制的通用知识</li><li>一页可直接带给合格专业人员的沟通摘要</li><li>一个不购买新产品、不自行增加运动强度的 30 天复盘动作</li></ul>
      <div className="boundary-callout"><strong>重要边界</strong><p>“无法比较”不等于“没有效果”。报告只说明现有资料能够或不能回答什么，不评价治疗，也不替用户制定运动、饮食、补剂或康复方案。</p></div>
    </section>
    <section className="content-block">
      <h2>30 天只做一件事</h2>
      <p>每周日花 10 分钟回看智能手表已经生成的周报，记录主动活动天数、总活动时长，以及本周最常见的中断原因。30 天后再决定下一步。</p>
      <p><a className="text-link" href="/#experience">了解首批体验 <span>→</span></a></p>
    </section>
  </div></main>;
}
