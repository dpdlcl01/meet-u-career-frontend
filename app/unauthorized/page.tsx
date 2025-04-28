import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b py-2.5 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-blue-600 font-bold text-2xl">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/logo/logo6.png"
              alt="로고"
              width={120}
              height={35}
              priority
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
              <ShieldAlert className="h-10 w-10 text-red-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            접근 권한이 없습니다
          </h1>

          <p className="text-gray-600 mb-6">
            요청하신 페이지에 접근할 권한이 없습니다. 로그인이 필요하거나 다른
            계정으로 로그인해야 할 수 있습니다.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              로그인 페이지로 이동
            </Link>

            <Link
              href="/"
              className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t bg-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} meet Ü. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
