import Image from "next/image"

export const SitemarkLogo = () => {
    return (
        <div className="flex items-center">
            <Image
                src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/logo/logo_admin.png"
                alt="로고"
                width={120}
                height={35}
                priority
            />
        </div>
    )
}
