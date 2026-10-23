import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "숨은 맛집",
  description: "서울 구로 주변 숨은 맛집 커뮤니티",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
