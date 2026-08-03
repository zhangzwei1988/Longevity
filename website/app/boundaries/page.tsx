import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "内容与专业边界" };

export default function BoundariesPage() {
  return <main className="subpage"><div className="subpage-shell">
    <Link className="back-link" href="/">← 返回健年首页</Link>
    <section className="subpage-hero"><p className="kicker">内容与专业边界</p><h1>把健康功课做好，<br />也把边界说清楚。</h1><p>健年旗下多活十年 Lab 提供一般性健康信息与健康素养内容，不是医疗机构，也不能替代医生或其他合格专业人员。</p></section>
    <section className="content-block"><h2>我们努力做什么</h2><ul><li>从真实、具体的健康决策问题出发</li><li>忠实翻译可靠公开资料，说明来源、适用范围和主要限制</li><li>区分研究事实、证据解释、一般性低风险行动和个人医学决定</li><li>帮助普通人准备应该向合格专业人员确认的问题</li><li>发现错误时公开纠正，并更新受影响的内容</li></ul></section>
    <section className="content-block"><h2>内容不能做什么</h2><ul><li>诊断或排除疾病，判断症状原因、疾病风险和病情轻重</li><li>提供针对个人的检查、药物、治疗、饮食、补剂或康复方案</li><li>推荐“最好”“最权威”或“最适合”的医生和医疗机构</li><li>预测寿命、生物年龄、疾病概率或承诺“逆龄”</li><li>把 AI 生成内容直接当作医学结论发布</li></ul></section>
    <section className="content-block"><h2>什么时候应该停止看内容</h2><p>如果你需要诊断、治疗、用药调整或其他个人医学判断，请联系合格医疗专业人员。健康内容只能帮助理解一般信息，不能替代面对面的专业评估。</p><div className="boundary-callout"><strong>紧急情况</strong><p>健年不是急救或医疗服务。如果出现急性、快速恶化或可能危及生命健康的情况，请立即联系当地急救系统或前往正规医疗机构。</p></div></section>
  </div></main>;
}
