import Link from "next/link";
import { Home } from "lucide-react";
import Image from "next/image";

export const RegisterHeader = () => {
  return (
    <header className="border-b py-2">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-blue-600 font-bold text-xl">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/logo/logo6.png"
              alt="로고"
              width={120}
              height={35}
              priority
            />
          </Link>
          <span className="text-gray-400 text-sm">회원가입</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-gray-900"
          >
            <Home className="h-4 w-4" />
            <span>MeetU 홈</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
