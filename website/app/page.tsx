import PageNavigator from "./PageNavigator";

const homeworkQuestions = [
  ["信", "这条说法的依据是什么？证据适用于谁？"],
  ["做", "它能解决什么问题？现在需要行动吗？"],
  ["花", "这笔投入买到了什么？以后怎么判断结果？"],
];

const contentValues = [
  {
    number: "01",
    title: "替你查依据",
    body: "从指南、权威机构和可靠研究出发，也把证据的限制和未知讲清楚。",
  },
  {
    number: "02",
    title: "替你拆问题",
    body: "把混在一起的健康说法、现实选择和投入成本，拆成能逐项判断的问题。",
  },
  {
    number: "03",
    title: "帮你少折腾",
    body: "不同时塞给你十件事。先找到当前值得关注的一步，再决定要不要继续。",
  },
  {
    number: "04",
    title: "知道何时停手",
    body: "内容不能回答的个人医学问题，明确交还给医生或其他合格专业人员。",
  },
];

const platforms = [
  ["小红书", "图文与可收藏的健康功课", "主页链接待更新"],
  ["视频号", "真人讲解与微信内分享", "主页入口待更新"],
  ["抖音", "短视频内容与轻量分发", "主页链接待更新"],
];

const principles = [
  ["有出处", "重要说法尽量回到可靠来源，不用一句“专家说”带过。"],
  ["讲局限", "说明资料讲了什么，也说清楚哪些结论不能直接套在个人身上。"],
  ["不收割", "不靠制造焦虑推销补剂、器械、药品或预设产品。"],
  ["守边界", "不诊断、不治疗、不预测寿命；需要医学判断时交给合格专业人员。"],
];

const qrPattern = [
  "1111111010101111111",
  "1000001011101000001",
  "1011101000101011101",
  "1011101010101011101",
  "1011101001101011101",
  "1000001010101000001",
  "1111111010101111111",
  "0000000011100000000",
  "1010111110111010101",
  "0111000101000111010",
  "1101111011111100111",
  "0010100100010111000",
  "1111111011011101011",
  "1000001000110101110",
  "1011101011101110101",
  "1011101001010011110",
  "1011101011111110101",
  "1000001000100011010",
  "1111111011011010111",
];

export default function Home() {
  return (
    <main className="paged-site">
      <PageNavigator />

      <section className="hero" id="top" data-page data-page-title="首页">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span />健年 Healthspan</div>
          <h1>专替忙人做<br /><em>健康功课。</em></h1>
          <p className="hero-lead">
            帮你查依据、拆问题、算投入，判断什么值得信、值得做、值得花钱。
          </p>
          <p className="hero-note">健康少踩坑，花钱少冤枉。让复杂的健康信息，变成普通人能够理解和使用的选择。</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#follow">关注多活十年 Lab <span>→</span></a>
            <a className="button button-ghost" href="#value">看看我们怎么做</a>
          </div>
          <div className="trust-row" aria-label="健年的四项内容承诺">
            <span>有出处</span><span>讲局限</span><span>不收割焦虑</span><span>守医疗边界</span>
          </div>
        </div>

        <div className="homework-visual" aria-label="多活十年 Lab 健康功课单示意">
          <div className="paper-clip" />
          <div className="homework-paper">
            <div className="paper-topline"><span>多活十年 Lab</span><small>健康功课单</small></div>
            <h2>这件事，<br />先别急着信。</h2>
            <div className="homework-list">
              {homeworkQuestions.map(([mark, body]) => (
                <div className="homework-row" key={mark}>
                  <span>{mark}</span><p>{body}</p>
                </div>
              ))}
            </div>
            <div className="paper-action"><span>今天只做一件事</span><strong>先把问题问对。</strong></div>
          </div>
          <div className="red-note">别让焦虑替你做决定</div>
          <div className="green-note">把值得行动的圈出来</div>
        </div>
      </section>

      <section className="value-section section" id="value" data-page data-page-title="关注价值">
        <div className="section-label">01 / 关注之后，你能得到什么</div>
        <div className="value-heading">
          <p className="kicker">信息已经够多了，缺的是判断</p>
          <h2>不再多塞一条建议，<br />而是帮你少走一段弯路。</h2>
          <p>多活十年 Lab 不做泛健康知识搬运。我们从真实困境出发，把证据、现实选择、投入成本和下一步行动放到同一张功课单上。</p>
        </div>
        <div className="value-grid">
          {contentValues.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="follow-section section" id="follow" data-page data-page-title="关注账号">
        <div className="section-label light">02 / 选择你常用的平台</div>
        <div className="follow-intro">
          <div>
            <p className="kicker light-text">多活十年 Lab · 当前公众入口</p>
            <h2>公众号优先，<br /><em>把健康功课讲完整。</em></h2>
          </div>
          <p>同一个核心问题会根据平台重新表达，但事实、证据和边界保持一致。你只需要关注自己最常用的入口。</p>
        </div>

        <div className="channel-layout">
          <article className="primary-channel">
            <div className="channel-copy">
              <span className="channel-priority">首要关注入口</span>
              <p className="channel-name">微信公众号</p>
              <h3>多活十年 Lab</h3>
              <p>适合完整阅读一个健康问题：为什么值得关注、证据到哪一步、普通人接下来可以怎么判断。</p>
              <div className="channel-meta"><span>深度长文</span><span>健康功课单</span><span>来源与边界</span></div>
            </div>
            <div className="qr-shell" aria-label="微信公众号二维码占位，暂不可扫描">
              <div className="qr-grid" aria-hidden="true">
                {qrPattern.join("").split("").map((cell, index) => <i className={cell === "1" ? "filled" : ""} key={index} />)}
              </div>
              <strong>二维码占位</strong>
              <small>暂不可扫描 · 待更新</small>
            </div>
          </article>

          <div className="platform-grid">
            {platforms.map(([name, description, status]) => (
              <article key={name}>
                <div><span>多活十年 Lab</span><h3>{name}</h3></div>
                <p>{description}</p>
                <span className="platform-status">{status}</span>
              </article>
            ))}
          </div>
        </div>
        <p className="placeholder-note">当前页面未放置任何虚构账号链接。收到正式链接和二维码后，将逐项替换并核验。</p>
      </section>

      <section className="architecture-section section" id="architecture" data-page data-page-title="品牌架构">
        <div className="section-label">03 / 品牌架构</div>
        <div className="architecture-heading">
          <p className="kicker">简单一点，也更诚实一点</p>
          <h2>一个长期品牌，<br />一个当前公众入口。</h2>
          <p>不展示尚未成立的产品矩阵，也不预先制造一排垂直账号。先把真正有用的内容做好，让工具和服务从反复出现的真实需求中生长。</p>
        </div>
        <div className="brand-map" aria-label="健年与多活十年 Lab 的品牌关系">
          <article className="brand-parent">
            <div className="map-seal">健</div>
            <div><span>母品牌</span><h3>健年 Healthspan</h3><p>承载长期愿景、证据标准、专业边界与未来建设。</p></div>
          </article>
          <div className="map-connector"><span>当前公众入口</span></div>
          <article className="brand-account">
            <div className="lab-mark">LAB</div>
            <div><span>内容账号</span><h3>多活十年 Lab</h3><p>站在忙碌、有健康意识的用户一边，替他们做好健康功课。</p></div>
            <div className="platform-pills"><span>公众号</span><span>小红书</span><span>视频号</span><span>抖音</span></div>
          </article>
        </div>
        <div className="growth-note"><strong>未来怎么生长？</strong><span>先有专业且利他的内容，再有长期信任和真实问题；只有公开内容解决不了的需求反复出现，才考虑轻量工具、专业合作或小范围服务。</span></div>
      </section>

      <section className="method-section section" id="method" data-page data-page-title="内容方法">
        <div className="section-label light">04 / 每一份健康功课怎么做</div>
        <div className="method-intro">
          <div>
            <p className="kicker light-text">科学，不是把话说得很难</p>
            <h2>而是知道什么有依据，<br /><em>什么还不能下结论。</em></h2>
          </div>
          <p>我们会努力把研究事实、证据解释、普通人可以采取的低风险行动，以及必须由专业人员回答的问题分开。</p>
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
        <div className="method-disclaimer">多活十年 Lab 不是医疗机构，内容不能替代诊断、治疗、用药建议或其他个体医学判断。</div>
      </section>

      <section className="about-section section" id="about" data-page data-page-title="关于健年">
        <div className="section-label">05 / 为什么做健年</div>
        <div className="about-layout">
          <div className="about-mark"><span>健年</span><small>HEALTHSPAN</small></div>
          <div className="about-copy">
            <p className="kicker">我们不想再制造更多健康信息</p>
            <h2>我们想让复杂的健康选择，<br />少一些盲目，多一些依据。</h2>
            <p>健康世界里不缺建议。真正困难的是：不同说法该信谁，一件事该不该做，一笔钱花出去之后怎么知道有没有价值。</p>
            <p>健年希望长期站在用户这一边，认真查证据、拆问题、算投入，也诚实说明不知道什么、什么时候必须交给合格专业人员。</p>
            <blockquote>让有活力的人生，尽可能长。</blockquote>
          </div>
        </div>
      </section>

      <footer id="footer" data-page data-page-title="健年 Healthspan">
        <div className="footer-kicker">END / 健年 HEALTHSPAN</div>
        <div className="footer-brand"><span className="brand-seal inverse">健</span><div><strong>健年</strong><small>HEALTHSPAN</small></div></div>
        <div className="footer-statement"><strong>健康少踩坑，花钱少冤枉。</strong><span>关注多活十年 Lab，和我们一起把健康功课做得更明白。</span></div>
        <div className="footer-links"><a href="#follow">关注账号</a><a href="#architecture">品牌架构</a><a href="/boundaries">内容边界</a><a href="/privacy">隐私说明</a></div>
        <div className="footer-bottom"><span>© 2026 健年 Healthspan</span><span>一般性健康信息与健康素养内容，不替代医疗服务</span></div>
      </footer>
    </main>
  );
}
