import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description = "健年帮助你整理健康投入、读懂可靠信息、理清下一步，为未来十年建立清晰的健康管理起点。";

  return {
    title: { default: "健年 Healthspan｜科学养生，少走弯路", template: "%s｜健年 Healthspan" },
    description,
    keywords: ["健年", "Healthspan", "科学养生", "健康管理", "多活十年 Lab"],
    openGraph: { title: "健年 Healthspan｜科学养生，少走弯路", description, images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "健年 Healthspan｜科学养生，少走弯路" }] },
    twitter: { card: "summary_large_image", title: "健年 Healthspan｜科学养生，少走弯路", description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
