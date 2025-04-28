"use client";

import type { JobCardProps } from "@/types/job";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const gradients = [
  "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500", // 1열
  "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500", // 2열
  "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500", // 3열
  "bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500", // 4열
];

export const JobCard = ({
  index,
  title,
  company,
  hashtag,
  dDay,
  thumbnailUrl,
}: JobCardProps) => {
  const [randomThumbnail, setRandomThumbnail] = useState<string>("");

  useEffect(() => {
    if (!thumbnailUrl || thumbnailUrl.trim() === "") {
      const randomNumber = Math.floor(Math.random() * 15) + 1;
      setRandomThumbnail(`https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/thumbnail/thumbnail_${randomNumber}.jpg`);
    }
  }, [thumbnailUrl]);

  const finalThumbnail =
    thumbnailUrl && thumbnailUrl.trim() !== "" ? thumbnailUrl : randomThumbnail;
  const isReady =
    (thumbnailUrl && thumbnailUrl.trim() !== "") || randomThumbnail !== "";

  const gradientClass = gradients[parseInt(index.toString(), 10) % 4];

  return (
    <div className="group relative rounded-2xl overflow-hidden border bg-white transition-all hover:shadow-md">
      <Link href={`/personal/jobs/${index}`} className="block">
        {/* 상단 고정 그라데이션 선 */}
        <div className={`h-1 w-full ${gradientClass}`} />

        {/* 상단 회사명 */}
        <div className="p-3 text-center">
          <div className="text-sm font-semibold text-gray-700">{company}</div>
        </div>

        {/* 타이틀 */}
        <div className="px-3 pb-3 text-left">
          <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2 min-h-[2.5rem] pl-1">
            {title}
          </h3>
        </div>

        {/* 썸네일 이미지 */}
        <div className="relative w-full aspect-video overflow-hidden">
          {isReady && (
            <Image
              src={finalThumbnail}
              alt="thumbnail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>

        {/* 하단 해시태그 + D-Day + 별 */}
        <div className="flex justify-between items-center px-3 py-2 bg-black/70 text-white text-xs">
          {hashtag ? (
            <div className="truncate">#{hashtag}</div>
          ) : (
            <div /> // 해시태그 없으면 비워서 공간 맞춤
          )}
          <div className="flex items-center space-x-2">
            <span>{dDay}</span>
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M12 2c.4 0 .8.2 1 .6l2.1 4.2 4.6.7c.8.1 1.1 1.1.5 1.7l-3.3 3.2.8 4.5c.1.8-.7 1.4-1.4 1l-4-2.1-4 2.1c-.7.4-1.5-.2-1.4-1l.8-4.5-3.3-3.2c-.6-.6-.3-1.6.5-1.7l4.6-.7L11 2.6c.2-.4.6-.6 1-.6z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
