
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterSection } from "./FilterSection"
import { SalarySlider } from "./SalarySlider"
import { Checkbox } from "@/components/ui/checkbox"

type DateRange = '' | '1w' | '1m' | '3m'

interface TalentsFilterProps {
  filters: {
    location: string
    experience: string[]
    education: string
    employmentType: string[]
    salary: number[]
    applyDate: DateRange
  }
  onFilterChange: (filters: Partial<TalentsFilterProps["filters"]>) => void
  onFilterReset: () => void
  onClose: () => void
}

export const TalentsFilter = ({ filters, onFilterChange, onFilterReset, onClose }: TalentsFilterProps) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="font-medium">필터</h3>
        <X className="h-4 w-4 text-gray-500 cursor-pointer" onClick={onClose} />
      </div>

      <div className="divide-y divide-gray-200">
        <FilterSection title="지역 선택:" defaultOpen>
          <div className="px-3 pb-3">
            <select
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              value={filters.location}
              onChange={e => onFilterChange({ location: e.target.value })}
            >
              <option value="">전체 지역</option>
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="인천">인천</option>
            </select>
          </div>
        </FilterSection>

        <FilterSection title="경력" defaultOpen>
          <div className="px-3 pb-3 space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="exp-0"
                className="h-4 w-4 rounded border-gray-300"
                checked={filters.experience.includes("0-2")}
                onCheckedChange={checked => {
                  const exp = filters.experience.includes("0-2")
                    ? filters.experience.filter(e => e !== "0-2")
                    : [...filters.experience, "0-2"]
                  onFilterChange({ experience: exp })
                }}
              />
              <label htmlFor="exp-0" className="ml-2 text-sm">
                0-2년
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="exp-3"
                className="h-4 w-4 rounded border-gray-300"
                checked={filters.experience.includes("3-5")}
                onCheckedChange={checked => {
                  const exp = filters.experience.includes("3-5")
                    ? filters.experience.filter(e => e !== "3-5")
                    : [...filters.experience, "3-5"]
                  onFilterChange({ experience: exp })
                }}
              />
              <label htmlFor="exp-3" className="ml-2 text-sm">
                3-5년
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="exp-5"
                className="h-4 w-4 rounded border-gray-300"
                checked={filters.experience.includes("5+")}
                onCheckedChange={checked => {
                  const exp = filters.experience.includes("5+")
                    ? filters.experience.filter(e => e !== "5+")
                    : [...filters.experience, "5+"]
                  onFilterChange({ experience: exp })
                }}
              />
              <label htmlFor="exp-5" className="ml-2 text-sm">
                5년 이상
              </label>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="학력">
          <div className="px-3 pb-3">
            <select
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              value={filters.education}
              onChange={e => onFilterChange({ education: e.target.value })}
            >
              <option value="">학력 선택</option>
              <option value="고졸">고졸</option>
              <option value="대졸">대졸</option>
              <option value="석사">석사</option>
              <option value="박사">박사</option>
            </select>
          </div>
        </FilterSection>

        <FilterSection title="고용 형태">
          <div className="px-3 pb-3 space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="type-1"
                className="h-4 w-4 rounded border-gray-300"
                checked={filters.employmentType.includes("정규직")}
                onCheckedChange={checked => {
                  const types = filters.employmentType.includes("정규직")
                    ? filters.employmentType.filter(t => t !== "정규직")
                    : [...filters.employmentType, "정규직"]
                  onFilterChange({ employmentType: types })
                }}
              />
              <label htmlFor="type-1" className="ml-2 text-sm">
                정규직
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="type-2"
                className="h-4 w-4 rounded border-gray-300"
                checked={filters.employmentType.includes("비정규직")}
                onCheckedChange={checked => {
                  const types = filters.employmentType.includes("비정규직")
                    ? filters.employmentType.filter(t => t !== "비정규직")
                    : [...filters.employmentType, "비정규직"]
                  onFilterChange({ employmentType: types })
                }}
              />
              <label htmlFor="type-2" className="ml-2 text-sm">
                비정규직
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="type-3"
                className="h-4 w-4 rounded border-gray-300"
                checked={filters.employmentType.includes("계약직")}
                onCheckedChange={checked => {
                  const types = filters.employmentType.includes("계약직")
                    ? filters.employmentType.filter(t => t !== "계약직")
                    : [...filters.employmentType, "계약직"]
                  onFilterChange({ employmentType: types })
                }}
              />
              <label htmlFor="type-3" className="ml-2 text-sm">
                계약직
              </label>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="희망 연봉">
          <div className="px-3 pb-3">
            <SalarySlider
              value={filters.salary}
              onValueChange={val => onFilterChange({ salary: val })}
            />
          </div>
        </FilterSection>

        <FilterSection title="기간 선택:">
          <div className="px-3 pb-3">
            <select
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              value={filters.applyDate}
              onChange={e => onFilterChange({ applyDate: e.target.value as DateRange })}
            >
              <option value="">전체기간</option>
              <option value="1w">최근 1주일</option>
              <option value="1m">최근 1개월</option>
              <option value="3m">최근 3개월</option>
            </select>
          </div>
        </FilterSection>
      </div>

      <div className="p-3 border-t border-gray-200 flex gap-2">
        <Button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#1a3365] text-white hover:bg-[#162b57] px-4 py-2 text-sm h-8 flex-1"
          onClick={onFilterReset}
        >
          필터 초기화
        </Button>
      </div>
    </div>
  )
}
