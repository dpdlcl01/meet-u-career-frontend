"use client";

import type { JobCardProps } from "@/types/job";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const gradients = [
  "bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400",   // 1열
  "bg-gradient-to-r from-blue-700 via-sky-500 to-blue-300", // 2열
  "bg-gradient-to-r from-indigo-800 via-blue-700 to-cyan-500", // 3열
  "bg-gradient-to-r from-blue-900 via-indigo-700 to-blue-500" // 4열
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
      setRandomThumbnail(
        `https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/thumbnail/thumbnail_${randomNumber}.jpg`
      );
    }
  }, [thumbnailUrl]);

  const finalThumbnail =
    thumbnailUrl && thumbnailUrl.trim() !== "" ? thumbnailUrl : randomThumbnail;
  const isReady =
    (thumbnailUrl && thumbnailUrl.trim() !== "") || randomThumbnail !== "";

  const gradientClass = gradients[parseInt(index.toString(), 10) % 4];

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border bg-white transition-shadow duration-300 shadow-[0_0_12px_rgba(20,52,150,0.08)] hover:shadow-[0_0_16px_rgba(20,52,150,0.2)]"
    >
      <Link href={`/personal/jobs/${index}`} className="block">
        {/* 상단 고정 그라데이션 선 */}
        <div
          className={`h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${gradientClass}`}
        />

        {/* 상단 회사명 */}
        <div className="p-3 text-center">
          <div className="text-lg font-semibold text-gray-700">{company}</div>
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
        <div className="flex justify-between items-center px-3 py-2 text-white text-xs">
          {hashtag ? (
            <div className="truncate">#{hashtag}</div>
          ) : (
            <div /> // 해시태그 없으면 비워서 공간 맞춤
          )}
          <div className="flex items-center space-x-2 text-red-700 font-semibold">
            <span>{dDay}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
