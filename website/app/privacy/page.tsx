import type { Metadata } from "next";

export const metadata: Metadata = { title: "隐私与资料处理" };

export default function PrivacyPage() {
  return <main className="subpage"><div className="subpage-shell">
    <a className="back-link" href="/">← 返回健年首页</a>
    <section className="subpage-hero"><p className="kicker">隐私说明</p><h1>少收集，<br />先脱敏，用完删除。</h1><p>健康资料属于敏感个人信息。健年坚持用流程和产品设计降低风险，不轻率承诺“绝对匿名”或“绝不泄露”。</p></section>
    <section className="content-block"><h2>信息最小化</h2><p>每一项资料都必须回答：“没有它，是否无法完成本次约定交付？”如果不能，就不收集。首轮申请不会要求提交完整病历。</p><ul><li>默认不需要身份证号码、家庭住址、病历号和医保号</li><li>不收集与本次盘点无关的全部病历</li><li>不因为“未来可能有用”无限期保存资料</li></ul></section>
    <section className="content-block"><h2>优先在本地脱敏</h2><p>如确有必要提交已有资料，用户应先在自己的设备上生成脱敏副本，遮盖姓名、电话、病历号等直接身份信息。删除姓名不等于完全匿名，医院、日期、职业和罕见情况的组合仍可能指向个人。</p></section>
    <section className="content-block"><h2>明确保存与删除</h2><ul><li>提交前说明处理目的、资料范围、访问人员和保存期限</li><li>不通过公开链接、普通群聊或代码仓库传递健康资料</li><li>服务结束后按约定删除，不擅自保留副本</li><li>将案例用于公开内容前，必须重新获得授权并再次处理</li></ul><div className="boundary-callout"><strong>当前阶段</strong><p>本地病历脱敏工具仍在定义和验证中，官网不会把它宣传成已经可下载的产品。</p></div></section>
  </div></main>;
}
