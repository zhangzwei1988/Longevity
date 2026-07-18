import type { Metadata } from "next";

export const metadata: Metadata = { title: "服务边界" };

export default function BoundariesPage() {
  return <main className="subpage"><div className="subpage-shell">
    <a className="back-link" href="/">← 返回健年首页</a>
    <section className="subpage-hero"><p className="kicker">服务边界</p><h1>卖清晰度，<br />不卖诊断。</h1><p>健年·未来十年健康盘点是一项非诊疗的健康信息整理与健康素养服务，不能替代医疗机构和合格专业人员。</p></section>
    <section className="content-block"><h2>我们可以做什么</h2><ul><li>整理健康资料、既往投入和用户自己的感受时间线</li><li>忠实翻译权威公开资料，说明证据等级和不确定性</li><li>准备需要向医生或其他合格专业人员确认的问题</li><li>建立非医疗行为的记录和复盘框架</li><li>连接未来十年希望保留的具体生活能力</li></ul></section>
    <section className="content-block"><h2>我们不能做什么</h2><ul><li>诊断或排除疾病，判断症状原因、风险和病情轻重</li><li>处理重大疾病、复杂慢性病、术后恢复和专业康复</li><li>提供药物、检查、治疗、康复、饮食或补剂方案</li><li>推荐“最权威”“最好”或“最适合”的医生和机构</li><li>预测寿命、生物年龄、疾病概率或承诺“逆龄”</li></ul></section>
    <section className="content-block"><h2>什么时候会停止服务</h2><p>如果交付过程中出现诊断、治疗、用药或病情判断需求，或者问题可能超出非诊疗范围，我们会停止相关分析，说明原因，并建议用户及时联系合格医疗专业人员。</p><div className="boundary-callout"><strong>紧急情况</strong><p>健年不是急救或医疗服务。如果出现急性、快速恶化或可能危及生命健康的情况，请立即联系当地急救系统或前往正规医疗机构。</p></div></section>
  </div></main>;
}
