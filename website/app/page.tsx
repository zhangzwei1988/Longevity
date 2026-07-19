const problems = [
  "体检、课程、补剂和器械买了不少，却没有人帮你看完整过程。",
  "收藏了很多健康知识，不同的人各说各话，越看越难选择。",
  "花了钱、花了时间，却没有留下可以比较和复盘的记录。",
  "想认真管理健康，但每次开始都像从零开始。",
];

const deliverables = [
  {
    mark: "一图",
    title: "未来十年健康底图",
    body: "把长期生活目标、已有健康记录和过去的健康投入放在同一张图里。",
  },
  {
    mark: "一书",
    title: "靠谱健康说明书",
    body: "把权威资料中的重要通用知识讲明白，也告诉你证据不能回答什么。",
  },
  {
    mark: "一包",
    title: "专业沟通包",
    body: "整理时间线、已有资料，以及下一次应该向合格专业人员确认的问题。",
  },
  {
    mark: "一卡",
    title: "30 天观察卡",
    body: "只选一个非医疗行动，明确怎么记录、什么时候复盘，不再同时做十件事。",
  },
];

const steps = [
  ["01", "确认范围", "先确认你的需求是否属于非诊疗健康盘点。"],
  ["02", "整理事实", "用信息表和访谈，盘清投入、记录与长期目标。"],
  ["03", "制作报告", "整理公开权威资料，形成一图、一书、一包、一卡。"],
  ["04", "线上复盘", "用 45 分钟把重点、边界与下一步讲清楚。"],
  ["05", "30 天回看", "检查行动是否发生，用真实结果修正下一步。"],
];

const principles = [
  ["有出处", "重要信息尽量回到权威指南和可靠研究，不用一句“专家说”带过。"],
  ["讲局限", "告诉你研究说明了什么，也明确哪些结论不能直接套在个人身上。"],
  ["不带货", "不靠推销补剂、器械、药品或医疗排名赚钱，避免利益绑架判断。"],
  ["守边界", "不诊断、不治疗、不预测寿命；需要医学判断时，交还给合格专业人员。"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="健年首页">
          <span className="brand-seal">健</span>
          <span>
            <strong>健年</strong>
            <small>HEALTHSPAN</small>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="#vision">健年的理念</a>
          <a href="#product">未来十年健康盘点</a>
          <a href="#method">我们的方法</a>
          <a href="/sample">样板案例</a>
        </nav>
        <a className="header-cta" href="#experience">首批体验</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span />健年 Healthspan</div>
          <h1>科学养生，<br /><em>少走弯路。</em></h1>
          <p className="hero-lead">
            我们关心的，不只是你能活多久，而是有活力、有能力、有选择的日子能持续多久。
          </p>
          <p className="hero-note">健年帮你整理健康投入、读懂可靠信息，找到现在最值得优先关注的一环。</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#experience">了解首批体验 <span>→</span></a>
            <a className="button button-ghost" href="/sample">查看样板报告</a>
          </div>
          <div className="trust-row" aria-label="健年的三项承诺">
            <span>权威来源</span><span>说明边界</span><span>不卖补剂器械</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="延长活力人生的品牌理念示意图">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-core">
            <small>HEALTHSPAN</small>
            <strong>活力<br />更长久</strong>
          </div>
          <div className="evidence-card card-source">
            <span>01</span><strong>行动能力</strong><small>继续去想去的地方</small>
          </div>
          <div className="evidence-card card-boundary">
            <span>02</span><strong>稳定精力</strong><small>工作之外仍有生活</small>
          </div>
          <div className="evidence-card card-action">
            <span>03</span><strong>生活自主</strong><small>年长以后依然有选择</small>
          </div>
        </div>
      </section>

      <section className="vision-section section" id="vision">
        <div className="section-label light">01 / 健年的理念</div>
        <div className="vision-statement">
          <p className="kicker light-text">HEALTHSPAN · 高质量生命时长</p>
          <h2>让有活力的人生，<br /><em>尽可能长。</em></h2>
          <p>长寿的意义，不只是多活几年。是年纪大了，依然能自由行动、保持精力、独立生活，继续做自己重视的事。</p>
        </div>
        <div className="vitality-path" aria-label="从今天投资到未来保有生活能力">
          <article><span>今天</span><strong>提前投资</strong><p>在状态还不错的时候，就开始积累健康底子。</p></article>
          <div className="path-arrow">→</div>
          <article><span>长期</span><strong>补关键一环</strong><p>不是同时做所有事，而是持续找到优先级。</p></article>
          <div className="path-arrow">→</div>
          <article><span>未来</span><strong>保有选择</strong><p>把行动、精力和独立生活能力留得更久。</p></article>
        </div>
        <div className="vision-disclaimer">健年不预测寿命，也不承诺延长具体年数。我们把长期愿景落在用户真正重视的生活能力上。</div>
      </section>

      <section className="problem-section section" id="problem">
        <div className="section-label">02 / 你的困境</div>
        <div className="problem-layout">
          <div className="section-heading sticky-heading">
            <p className="kicker">钱花了不少，为什么还是不知道下一步？</p>
            <h2>你缺少的，可能不是下一个健康产品。</h2>
          </div>
          <div className="problem-list">
            {problems.map((problem, index) => (
              <article key={problem}>
                <span>0{index + 1}</span>
                <p>{problem}</p>
              </article>
            ))}
            <div className="problem-answer">
              <span className="answer-line" />
              <p>而是一次完整的整理：过去做过什么，现在缺少什么，下一步往哪里走。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section section">
        <div className="section-label light">03 / 当前价值</div>
        <div className="timeline-intro">
          <p className="kicker light-text">不替你制造更多焦虑，只帮你把事情理顺</p>
          <h2>盘清过去，<br />看懂现在，<br /><em>理清未来。</em></h2>
        </div>
        <div className="timeline-grid">
          <article>
            <div className="timeline-number">过去</div>
            <h3>把投入整理清楚</h3>
            <p>做过什么、花过多少钱、得到过哪些建议，还缺少哪些可以比较的记录。</p>
          </article>
          <article>
            <div className="timeline-number">现在</div>
            <h3>把靠谱信息讲明白</h3>
            <p>从权威资料中提炼通用结论，分清可靠证据、营销说法与仍然未知的部分。</p>
          </article>
          <article className="timeline-featured">
            <div className="timeline-number">未来</div>
            <h3>把下一步理清楚</h3>
            <p>明确未来十年想保留的生活能力，知道什么可以观察、什么需要专业确认。</p>
          </article>
        </div>
      </section>

      <section className="shortboard-section section">
        <div className="section-label">04 / 长期方法</div>
        <div className="shortboard-layout">
          <div className="shortboard-copy">
            <p className="kicker">未来的活力，需要从今天开始投资</p>
            <h2>找到关键短板，<br />一次补对一块。</h2>
            <p>健康不是靠一次消费解决的。真正的长期管理，是不断找到目前最限制你的那一环，确认边界，采取行动，再用记录检验结果。</p>
            <div className="scope-note"><strong>健年当前能做的</strong><span>识别信息、认知、执行和资源上的管理断点；涉及身体机能、疾病和医学风险时，交给合格专业人员评估。</span></div>
          </div>
          <div className="shortboard-loop" aria-label="发现、确认、行动、复盘的循环">
            <div className="loop-center"><small>长期</small><strong>保持<br />活力</strong></div>
            <div className="loop-step step-discover"><span>01</span><strong>发现</strong><small>哪一环最值得关注</small></div>
            <div className="loop-step step-confirm"><span>02</span><strong>确认</strong><small>自己观察或专业评估</small></div>
            <div className="loop-step step-act"><span>03</span><strong>行动</strong><small>一次只推进一件事</small></div>
            <div className="loop-step step-review"><span>04</span><strong>复盘</strong><small>用记录修正下一步</small></div>
          </div>
        </div>
      </section>

      <section className="product-section section" id="product">
        <div className="section-label">05 / 从这里开始</div>
        <div className="product-heading">
          <div>
            <p className="kicker">健年·未来十年健康盘点</p>
            <h2>先看清现在，<br />再为未来积累。</h2>
          </div>
          <p className="product-summary">从一个现实困扰出发，把健康记录、过去投入、可靠信息和未来能力目标连接起来，找到当前最值得优先关注的一环。</p>
        </div>
        <div className="deliverable-grid">
          {deliverables.map((item, index) => (
            <article className={index === 0 ? "deliverable-card featured" : "deliverable-card"} key={item.mark}>
              <div className="deliverable-mark">{item.mark}</div>
              <div>
                <span className="card-index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="session-strip">
          <div><strong>＋一次 45 分钟线上复盘</strong><span>把重点、边界与下一步讲清楚</span></div>
          <a href="/sample">看看一份完整样板 <span>→</span></a>
        </div>
      </section>

      <section className="case-section section">
        <div className="case-copy">
          <div className="section-label light">06 / 虚构样板</div>
          <p className="kicker light-text">DEMO-001 · 完全虚构</p>
          <h2>一年为健康花了<br /><em>31,600 元</em>，<br />为什么还是没有答案？</h2>
          <p>健身、私教、智能手表、恢复服务和补剂都买过，却没有共同基线、持续记录和复盘日期。</p>
          <a className="text-link light-link" href="/sample">查看完整样板报告 <span>↗</span></a>
        </div>
        <div className="case-ledger">
          <div className="ledger-head"><span>健康投入地图</span><small>过去 12 个月</small></div>
          {[
            ["年度健身会员", "¥6,800"], ["12 节私教课", "¥7,200"],
            ["智能手表", "¥3,200"], ["按摩与恢复服务", "¥8,400"],
            ["多种非处方补剂", "¥6,000"],
          ].map(([name, value]) => <div className="ledger-row" key={name}><span>{name}</span><strong>{value}</strong></div>)}
          <div className="ledger-total"><span>合计投入</span><strong>¥31,600</strong></div>
          <div className="ledger-note">“无法比较”不等于“没有效果”，只说明现有资料还不能回答。</div>
        </div>
      </section>

      <section className="method-section section" id="method">
        <div className="section-label">07 / 我们的方法</div>
        <div className="method-heading">
          <p className="kicker">科学，不是把话说得很难</p>
          <h2>而是知道什么有依据，<br />什么还不能下结论。</h2>
        </div>
        <div className="principle-grid">
          {principles.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section section">
        <div className="section-label">08 / 服务流程</div>
        <div className="process-layout">
          <div className="section-heading sticky-heading">
            <p className="kicker">从申请到 30 天回看</p>
            <h2>一步一步，<br />把复杂的事讲清楚。</h2>
          </div>
          <div className="steps">
            {steps.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fit-section section">
        <div className="fit-card suitable">
          <span className="fit-label">比较适合</span>
          <h2>你已经开始认真对待长期健康。</h2>
          <ul>
            <li>35—55 岁，已经为健康投入过时间和金钱</li>
            <li>有一个明确的非诊疗困扰或生活方式目标</li>
            <li>面对大量信息，不知道下一步如何选择</li>
            <li>愿意整理事实、留下记录并参与复盘</li>
          </ul>
        </div>
        <div className="fit-card unsuitable">
          <span className="fit-label">暂不适合</span>
          <h2>你现在需要的是医学判断或治疗。</h2>
          <ul>
            <li>正在处理重大疾病、急性问题或进行性症状</li>
            <li>希望判断疾病、症状原因或病情轻重</li>
            <li>希望获得药物、检查、治疗或康复方案</li>
            <li>希望预测寿命、生物年龄或疾病风险</li>
          </ul>
          <a href="/boundaries">查看完整服务边界 →</a>
        </div>
      </section>

      <section className="origin-section section">
        <div className="origin-mark">健年</div>
        <div className="origin-copy">
          <div className="section-label">09 / 为什么做健年</div>
          <p className="origin-lead">健年源于一次真实的健康困境。</p>
          <h2>我们想要的，不是一个更长的寿命数字。</h2>
          <p>创始人在医院、康复机构、治疗设备和健康产品上投入了大量时间和金钱，却始终没有得到一条清晰、连续、可验证的路径。</p>
          <p>健年希望把复杂的健康信息变得更清楚，让人更早开始投资未来的行动能力、精力和生活自由，让每一次选择少一些盲目，多一些依据。</p>
          <p className="origin-vision">让有活力的人生，尽可能长。</p>
          <blockquote>科学养生，少走弯路。</blockquote>
        </div>
      </section>

      <section className="experience-section section" id="experience">
        <div className="experience-card">
          <div className="experience-topline"><span>首批体验版 · 筹备中</span><span>限 5 位</span></div>
          <div className="experience-layout">
            <div>
              <p className="kicker light-text">健年·未来十年健康盘点</p>
              <h2>健康上已经投入不少，<br />却还是不知道下一步？</h2>
              <p>首批体验将采用人工深度交付，用真实订单验证这套服务是否真正有用。</p>
            </div>
            <div className="experience-offer">
              <span>创始体验价</span>
              <strong><small>¥</small>999</strong>
              <ul><li>信息表＋深度访谈</li><li>一图、一书、一包、一卡</li><li>45 分钟线上复盘</li><li>30 天后回看</li></ul>
              <button type="button" disabled>登记入口即将开放</button>
              <small>正式开放前，将先完成专业审核与基础合规流程。</small>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section section">
        <div className="section-label">10 / 常见问题</div>
        <div className="faq-layout">
          <div className="section-heading"><p className="kicker">在申请之前</p><h2>你可能还想知道</h2></div>
          <div className="faq-list">
            <details><summary>这是体检报告解读吗？<span>＋</span></summary><p>不是。已有资料只用于整理时间线和准备专业沟通，本服务不解释检查结果，也不判断疾病风险。</p></details>
            <details><summary>你们会告诉我得了什么病吗？<span>＋</span></summary><p>不会。健年不提供诊断、排除诊断、治疗或用药建议；需要医学判断时，应优先联系合格医疗专业人员。</p></details>
            <details><summary>为什么这和“长寿”有关？<span>＋</span></summary><p>健年关注的不是单纯增加寿命数字，而是延长保持活力、独立和自主的生命阶段。未来十年帮助你明确想长期保留的生活能力，让今天的健康投入不再只解决一次焦虑。</p></details>
            <details><summary>健年能找到我的“身体短板”吗？<span>＋</span></summary><p>当前产品识别的是健康管理中的信息、认知、执行和资源断点，不诊断身体问题。涉及身体机能、疾病或医学风险的短板，应由对应领域的合格专业人员评估。</p></details>
            <details><summary>需要提交完整病历吗？<span>＋</span></summary><p>不需要。我们坚持最少收集，首轮申请也不会收取病历；确有必要时，只接收完成盘点所需的脱敏副本。</p></details>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-seal inverse">健</span><div><strong>健年</strong><small>HEALTHSPAN</small></div></div>
        <div className="footer-statement"><strong>让有活力的人生，尽可能长。</strong><span>科学养生，少走弯路。让复杂的健康信息，变成普通人能够理解和使用的选择。</span></div>
        <div className="footer-links"><a href="/sample">样板案例</a><a href="/boundaries">服务边界</a><a href="/privacy">隐私说明</a><span>多活十年 Lab</span></div>
        <div className="footer-bottom"><span>© 2026 健年 Healthspan</span><span>非诊疗健康信息整理与健康素养服务</span></div>
      </footer>
    </main>
  );
}
