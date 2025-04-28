import Image from "next/image"

export const StatisticsSection = () => {
  return (
    <div className="w-full flex justify-center">
      <Image
        src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/login/login_02.png"
        alt="로그인 설명 이미지"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  )
}
