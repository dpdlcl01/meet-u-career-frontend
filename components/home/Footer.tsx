import Link from "next/link";

export const Footer = () => {
  const footerLinks = [
    { label: "회사소개", href: "/about" },
    { label: "인재채용", href: "/careers" },
    { label: "이용약관", href: "/terms" },
    { label: "개인정보처리방침", href: "/privacy" },
    { label: "이메일무단수집거부", href: "/email-policy" },
    { label: "채용정보 API", href: "/api" },
    { label: "제휴문의", href: "/partnership" },
    { label: "고객센터", href: "/support" },
  ];

  return (
    <footer className="bg-[#f0f2f5] border-t py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-wrap gap-6 mb-6">
          <ul className="flex flex-wrap gap-5 text-sm text-gray-600">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gray-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-gray-500 mb-6">
          <p className="text-xs mb-1">
            서비스 고객센터 | 02-123-4567 (평일 09:00~18:00, 점심 시간
            12:00~13:00)
          </p>
          <p className="text-xs mb-1">
            (주) MeetU | 대표: 홍동화 | 사업자등록번호: 123-45-67890 |
            통신판매업 신고번호: 제2023-서울강남-12345호
          </p>
          <p className="text-xs mb-1">
            주소: 서울특별시 강남구 테헤란로 132 8층 쌍용교육센터 | 대표번호:
            02-123-4567 | 이메일: support@meetu.co.kr
          </p>
          <p className="text-xs mb-4">
            Copyright (c) MeetU(주). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
