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
  creator: "Nguyễn Thị Thanh Tuyền",
  publisher: "Nguyễn Thị Thanh Tuyền",
  metadataBase: new URL("https://mygraduation.vercel.app"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Lễ Tốt Nghiệp",
    title: "🎓 Lễ Tốt Nghiệp - Nguyễn Thị Thanh Tuyền",
    description:
      "Trân trọng kính mời bạn tham dự Lễ Tốt Nghiệp - Ngày 19/12/2025 🎓 Trường Đại học Tài chính Marketing",
    images: [
      {
        url: "/images/ty.png",
        width: 1200,
        height: 630,
        alt: "Lễ Tốt Nghiệp - Nguyễn Thị Thanh Tuyền",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "🎓 Lễ Tốt Nghiệp - Nguyễn Thị Thanh Tuyền",
    description:
      "Trân trọng kính mời bạn tham dự Lễ Tốt Nghiệp - 19/12/2025 🎓",
    images: ["/images/ty.png"],
    creator: "@graduation"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5
  },
  robots: {
    index: true,
    follow: true
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lễ Tốt Nghiệp"
  },
  other: {
    // Zalo specific tags
    "zalo:title": "🎓 Lễ Tốt Nghiệp - Nguyễn Thị Thanh Tuyền",
    "zalo:description":
      "Trân trọng kính mời bạn tham dự Lễ Tốt Nghiệp - 19/12/2025 🎓",
    "zalo:image": "/images/ty.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="theme-color" content="#f43f5e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${notoSans.variable} ${notoSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
