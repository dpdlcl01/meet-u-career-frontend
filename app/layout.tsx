import "./globals.css";
import { dotFont } from "@/app/font";
import PreventActionWrapper from "@/components/common/PreventActionWrapper";

export const metadata = {
  title: "Meet U",
  description: "구직자와 기업을 이어주는 구인구직 플랫폼",
  generator: "v0.dev",
  icons: {
    icon: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/favicon/favicon_3.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={dotFont.variable}>
      <body>
        <PreventActionWrapper>{children}</PreventActionWrapper>
      </body>
    </html>
  );
}
