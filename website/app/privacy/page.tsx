import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "网站隐私说明" };

export default function PrivacyPage() {
  return <main className="subpage"><div className="subpage-shell">
    <Link className="back-link" href="/">← 返回健年首页</Link>
    <section className="subpage-hero"><p className="kicker">网站隐私说明</p><h1>少收集，<br />不为“以后可能有用”囤数据。</h1><p>当前官网用于说明健年品牌并引导关注多活十年 Lab，不提供产品申请，也不要求访客提交健康资料。</p></section>
    <section className="content-block"><h2>当前网站不收什么</h2><ul><li>不要求上传病历、检查结果、身份证明或联系方式</li><li>不提供健康问卷、疾病评估或个体健康建议</li><li>不把访问网站视为用户已经同意未来服务的数据处理</li></ul></section>
    <section className="content-block"><h2>跳转到其他平台</h2><p>官网后续会提供公众号、小红书、视频号和抖音等外部平台入口。离开本站后，相关平台会按照自己的隐私规则处理访问数据；关注前可先查看对应平台的隐私说明。</p><div className="boundary-callout"><strong>当前占位状态</strong><p>官网中的二维码和账号入口尚未接入正式链接。占位二维码明确标注为不可扫描，不会跳转到未知页面。</p></div></section>
    <section className="content-block"><h2>未来如果增加互动功能</h2><p>如果以后增加订阅、留言、工具或服务申请，我们会在上线前单独说明收集目的、资料范围、保存期限和删除方式，不沿用一份模糊授权覆盖所有用途。</p></section>
  </div></main>;
}
