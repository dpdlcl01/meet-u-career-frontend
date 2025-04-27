"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { useSearchStore } from "@/hooks/useSearchStore";

type FilterCategory = "job" | "career" | "location" | "education";
type FilterItem = { id: string; label: string };

interface Location {
  locationCode: string;
  province: string;
  city: string | null;
  fullLocation: string;
}

interface JobsFilterProps {
  onApply: (filters: {
    industry?: string;
    experienceLevel?: number;
    educationLevel?: number;
    locationCode?: string;
    keyword?: string;
  }) => void;
}

export const JobsFilter = ({ onApply }: JobsFilterProps) => {
  const [openDropdown, setOpenDropdown] = useState<FilterCategory | null>(null);
  const [keyword, setKeyword] = useState("");
  const [career, setCareer] = useState<number | null>(null);
  const [education, setEducation] = useState<FilterItem | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<FilterItem[]>([]);
  const [locations, setLocations] = useState<FilterItem[]>([]);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null);
  const [experience, setExperience] = useState<FilterItem | null>(null);

  const { keyword: storeKeyword } = useSearchStore(); // zustand에서의 keyword 상태

  const dropdownRefs = {
    job: useRef<HTMLDivElement>(null),
    career: useRef<HTMLDivElement>(null),
    location: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (storeKeyword) {
      setKeyword(storeKeyword); // storeKeyword가 바뀔 때마다 필터에서 keyword 상태 업데이트
    }
  }, [storeKeyword]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown) {
        const ref = dropdownRefs[openDropdown].current;
        if (ref && !ref.contains(e.target as Node)) {
          setOpenDropdown(null);
          setExpandedProvince(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  useEffect(() => {
    fetch("/api/personal/job/locations")
      .then((res) => res.json())
      .then((data) => setAllLocations(data));
  }, []);

  const provinces = Array.from(new Set(allLocations.map((l) => l.province))).map((p) => ({
    id: p,
    label: p,
  }));

  const applyFilters = () => {
    const filters = {
      industry: selectedJobs.map((j) => j.label).join(","),
      experienceLevel: experience ? Number(experience.id) : career !== null ? career : undefined,
      educationLevel: education ? Number(education.id) : undefined,
      locationCode: locations.map((l) => l.id).join(","),
      keyword: keyword || undefined,
    };

    onApply(filters);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedJobs, locations, education, experience, career, keyword]);

  const educationOptions: FilterItem[] = [
    { id: "0", label: "학력무관" },
    { id: "6", label: "고졸" },
    { id: "7", label: "전문대졸" },
    { id: "8", label: "대졸" },
    { id: "9", label: "석사" },
    { id: "5", label: "박사" },
  ];

  const experienceOptions: FilterItem[] = [
    { id: "0", label: "신입" },
    { id: "1", label: "1년" },
    { id: "2", label: "2년" },
    { id: "3", label: "3년" },
    { id: "4", label: "4년" },
    { id: "5", label: "5년" },
    { id: "10", label: "10년 이상" },
  ];
  const industryGroups: Record<string, string[]> = {
    "서비스업": ["호텔·여행·항공", "외식업·식음료", "시설관리·경비·용역", "레저·스포츠·여가", "AS·카센터·주유", "렌탈·임대", "웨딩·장례·이벤트", "기타서비스업", "뷰티·미용"],
    "제조·화학": ["전기·전자·제어", "기계·설비·자동차", "석유·화학·에너지", "섬유·의류·패션", "화장품·뷰티", "생활용품·소비재·사무", "가구·목재·제지", "농업·어업·광업·임업", "금속·재료·철강·요업", "조선·항공·우주", "기타제조업", "식품가공·개발", "반도체·광학·LCD", "환경"],
    "IT·웹·통신": ["솔루션·SI·ERP·CRM", "웹에이젼시", "쇼핑몰·오픈마켓", "포털·인터넷·컨텐츠", "네트워크·통신·모바일", "하드웨어·장비", "정보보안·백신", "IT컨설팅", "게임"],
    "은행·금융업": ["은행·금융·저축", "대출·캐피탈·여신", "기타금융", "증권·보험·카드"],
    "미디어·디자인": ["신문·잡지·언론사", "방송사·케이블", "연예·엔터테인먼트", "광고·홍보·전시", "영화·배급·음악", "공연·예술·문화", "출판·인쇄·사진", "캐릭터·애니메이션", "디자인·설계"],
    "교육업": ["초중고·대학", "학원·어학원", "유아·유치원", "교재·학습지", "전문·기능학원"],
    "의료·제약·복지": ["의료(진료과목별)", "의료(병원종류별)", "제약·보건·바이오", "사회복지"],
    "판매·유통": ["판매(매장종류별)", "판매(상품품목별)", "유통·무역·상사", "운송·운수·물류"],
    "건설업": ["건설·건축·토목·시공", "실내·인테리어·조경", "환경·설비", "부동산·임대·중개"],
    "기관·협회": ["정부·공공기관·공기업", "협회·단체", "법률·법무·특허", "세무·회계", "연구소·컨설팅·조사"],
  };

  const resetAllFilters = () => {
    setSelectedJobs([]);
    setLocations([]);
    setEducation(null);
    setExperience(null);
    setCareer(null);
    setKeyword("");
  };

  return (
    <div className="border rounded-md p-4 mb-8">
      <div className="flex flex-wrap gap-4 mb-4">
        {/* 산업 필터 */}
        <div className="relative" ref={dropdownRefs.job}>
          <button
            onClick={() => setOpenDropdown(openDropdown === "job" ? null : "job")}
            className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "job" ? "border-blue-500" : ""
              }`}
          >
            직무 <ChevronDown className="w-4 h-4 ml-1" />
          </button>

          {openDropdown === "job" && (
            <div className="absolute top-full mt-1 w-[400px] bg-white border rounded-md shadow-lg z-10 flex flex-col">
              <div className="flex max-h-60 overflow-y-auto">
                {/* 좌측: 상위 산업 그룹 */}
                <div className="w-[50%] border-r p-4 overflow-y-auto">
                  {Object.keys(industryGroups).map((group) => {
                    const children = industryGroups[group];
                    const allSel = children.every(ind => selectedJobs.some(j => j.label === ind));
                    return (
                      <div key={group} className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{group}</span>
                          <button
                            className="text-xs text-blue-600 hover:underline"
                            onClick={() => {
                              const items = children.map(ind => ({ id: ind, label: ind }));
                              setSelectedJobs(prev =>
                                allSel
                                  ? prev.filter(j => !children.includes(j.label))
                                  : [...prev, ...items.filter(i => !prev.some(j => j.label === i.label))]
                              );
                            }}
                          >
                            {allSel ? "해제" : "전체"}
                          </button>
                        </div>
                        <button
                          className="text-xs text-gray-500 hover:underline"
                          onClick={() => setExpandedProvince(expandedProvince === group ? null : group)}
                        >
                          {group} 보기
                        </button>
                      </div>
                    );
                  })}
                </div>
                {/* 우측: 하위 산업 리스트 */}
                <div className="w-[60%] p-4 overflow-y-auto text-sm">
                  {expandedProvince
                    ? industryGroups[expandedProvince].map((industry) => (
                      <label key={industry} className="flex items-center py-1 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-2 accent-blue-500"
                          checked={selectedJobs.some(j => j.label === industry)}
                          onChange={() => {
                            setSelectedJobs(prev =>
                              prev.some(j => j.label === industry)
                                ? prev.filter(j => j.label !== industry)
                                : [...prev, { id: industry, label: industry }]
                            )
                          }}
                        />
                        {industry}
                      </label>
                    ))
                    : <div className="text-sm text-gray-500">상위 산업을 선택하세요</div>
                  }
                </div>
              </div>

              {/* 초기화/적용 버튼 */}
              <div className="border-t px-4 py-2 flex justify-between">
                <button
                  className="text-sm text-gray-500"
                  onClick={() => { setSelectedJobs([]); applyFilters(); }}
                >
                  초기화
                </button>
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm"
                  onClick={() => { applyFilters(); setOpenDropdown(null); }}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 경력 */}
        <div className="relative" ref={dropdownRefs.career}>
          <button
            onClick={() => setOpenDropdown(openDropdown === "career" ? null : "career")}
            className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "career" ? "border-blue-500" : ""
              }`}
          >
            경력 <ChevronDown className="w-4 h-4 ml-1" />
          </button>

          {openDropdown === "career" && (
            <div className="absolute top-full mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4 max-h-60 overflow-y-auto grid grid-cols-2 gap-2 text-sm">
                {experienceOptions.map((item) => (
                  <label key={item.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      className="mr-2"
                      checked={career === Number(item.id)}
                      onChange={() => {
                        setCareer(Number(item.id));
                        applyFilters();
                      }}
                    />
                    {item.label}
                  </label>
                ))}
              </div>

              {/* 초기화/적용 버튼 */}
              <div className="border-t px-4 py-2 flex justify-between">
                <button
                  className="text-sm text-gray-500"
                  onClick={() => {
                    setCareer(null);
                    applyFilters(); // 초기화시도 바로 반영
                  }}
                >
                  초기화
                </button>
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm"
                  onClick={() => {
                    setOpenDropdown(null);
                    applyFilters();
                  }}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>


        {/* 지역 필터 */}
        <div className="relative" ref={dropdownRefs.location}>
          <button
            onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
            className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "location" ? "border-blue-500" : ""
              }`}
          >
            지역 <ChevronDown className="w-4 h-4 ml-1" />
          </button>

          {openDropdown === "location" && (
            <div className="absolute top-full mt-1 w-[400px] bg-white border rounded-md shadow-lg z-10 flex flex-col">
              <div className="flex max-h-60 overflow-y-auto">
                {/* 좌측: 시/도 리스트 */}
                <div className="w-[50%] border-r p-4 overflow-y-auto">
                  {provinces.map((province) => {
                    const isExpanded = expandedProvince === province.label;
                    const relatedCities = allLocations
                      .filter((l) => l.province === province.label && l.city)
                      .map((l) => ({ id: l.locationCode, label: l.fullLocation }));

                    const provinceItem = allLocations.find(
                      (l) => l.province === province.label && l.city === null
                    );
                    const provinceId = provinceItem?.locationCode;

                    const isSelected = locations.some((l) => l.id === provinceId);

                    return (
                      <div key={province.id} className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{province.label}</span>
                          <button
                            type="button"
                            className="text-xs text-blue-600 hover:underline"
                            onClick={() => {
                              if (isSelected) {
                                setLocations(prev => prev.filter(l => l.id !== provinceId));
                              } else if (provinceId) {
                                setLocations(prev => [...prev, { id: provinceId, label: province.label }]);
                              }
                            }}
                          >
                            {isSelected ? "해제" : "전체"}
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-xs text-gray-500 hover:underline"
                          onClick={() =>
                            setExpandedProvince(isExpanded ? null : province.label)
                          }
                        >
                          {province.label} 보기
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* 우측: 시/군/구 리스트 */}
                <div className="w-[60%] p-4 overflow-y-auto text-sm">
                  {expandedProvince
                    ? allLocations
                      .filter((l) => l.province === expandedProvince && l.city)
                      .map((city) => (
                        <label key={city.locationCode} className="flex items-center py-1 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-2 accent-blue-500"
                            checked={locations.some((l) => l.id === city.locationCode)}
                            onChange={() =>
                              setLocations((prev) =>
                                prev.some((l) => l.id === city.locationCode)
                                  ? prev.filter((l) => l.id !== city.locationCode)
                                  : [...prev, { id: city.locationCode, label: city.fullLocation }]
                              )
                            }
                          />
                          {city.fullLocation}
                        </label>
                      ))
                    : <div className="text-sm text-gray-500">시·도를 선택하세요</div>
                  }
                </div>
              </div>

              {/* 초기화/적용 버튼 */}
              <div className="border-t px-4 py-2 flex justify-between">
                <button
                  className="text-sm text-gray-500"
                  onClick={() => {
                    setLocations([]);
                    setExpandedProvince(null);
                  }}
                >
                  초기화
                </button>
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm"
                  onClick={() => { applyFilters(); setOpenDropdown(null); }}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 학력 필터 */}
        <div className="relative" ref={dropdownRefs.education}>
          <button
            onClick={() => setOpenDropdown(openDropdown === "education" ? null : "education")}
            className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "education" ? "border-blue-500" : ""
              }`}
          >
            학력 <ChevronDown className="w-4 h-4 ml-1" />
          </button>

          {openDropdown === "education" && (
            <div className="absolute top-full mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {educationOptions.map((item) => (
                  <label key={item.id} className="flex items-center py-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="education"
                      className="mr-2 accent-blue-500"
                      checked={education?.id === item.id}
                      onChange={() => setEducation(item)}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
              <div className="border-t px-4 py-2 flex justify-between">
                <button
                  className="text-sm text-gray-500"
                  onClick={() => setEducation(null)}
                >
                  초기화
                </button>
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm"
                  onClick={() => { applyFilters(); setOpenDropdown(null); }}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
      {/* 검색어 입력 */}
      <div className="relative mb-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") applyFilters();
          }}
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full pl-3 pr-10 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          onClick={applyFilters}
        >
          <Search className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* 선택된 필터들 보여주기 */}
      {(selectedJobs.length > 0 || locations.length > 0 || education || career !== null) && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {selectedJobs.map((item) => (
            <div key={item.id} className="flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1">
              <span className="text-xs">{item.label}</span>
              <button
                className="ml-1 hover:text-blue-900"
                onClick={() => setSelectedJobs((prev) => prev.filter((j) => j.id !== item.id))}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {locations.map((item) => (
            <div key={item.id} className="flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1">
              <span className="text-xs">{item.label}</span>
              <button
                className="ml-1 hover:text-blue-900"
                onClick={() => setLocations((prev) => prev.filter((l) => l.id !== item.id))}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {education && (
            <div className="flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1">
              <span className="text-xs">{education.label}</span>
              <button
                className="ml-1 hover:text-blue-900"
                onClick={() => setEducation(null)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {career !== null && (
            <div className="flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1">
              <span className="text-xs">{career === 10 ? "10년 이상" : `${career}년`}</span>
              <button
                className="ml-1 hover:text-blue-900"
                onClick={() => setCareer(null)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {experience && (
            <div className="flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1">
              <span className="text-xs">{experience.label}</span>
              <button
                className="ml-1 hover:text-blue-900"
                onClick={() => setExperience(null)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* 전체 초기화 버튼 */}
          <button
            className="ml-auto text-xs text-gray-500 hover:text-gray-700"
            onClick={resetAllFilters}
          >
            전체 초기화
          </button>
        </div>
      )}

    </div>

  );
};



