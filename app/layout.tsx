import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans"
});

export const metadata: Metadata = {
  title: "Lễ Tốt Nghiệp - Nguyễn Thị Thanh Tuyền",
  description:
    "Trân trọng kính mời bạn tham dự Lễ Tốt Nghiệp của Nguyễn Thị Thanh Tuyền - Ngày 19/12/2025 tại Trường Đại học Tài chính Marketing",
  keywords: [
    "lễ tốt nghiệp",
    "graduation ceremony",
    "Nguyễn Thị Thanh Tuyền",
    "UFM",
    "Tài chính Marketing"
  ],
  authors: [{ name: "Nguyễn Thị Thanh Tuyền" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://mygraduation.vercel.app",
    siteName: "Lễ Tốt Nghiệp",
    title: "Lễ Tốt Nghiệp - Nguyễn Thị Thanh Tuyền",
    description:
      "Trân trọng kính mời bạn tham dự Lễ Tốt Nghiệp - 19/12/2025 🎓",
    images: [
      {
        url: "/images/3.jpg",
        width: 1200,
        height: 630,
        alt: "Lễ Tốt Nghiệp - Nguyễn Thị Thanh Tuyền"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lễ Tốt Nghiệp - Nguyễn Thị Thanh Tuyền",
    description:
      "Trân trọng kính mời bạn tham dự Lễ Tốt Nghiệp - 19/12/2025 🎓",
    images: ["/images/3.jpg"]
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${notoSans.variable} ${notoSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
