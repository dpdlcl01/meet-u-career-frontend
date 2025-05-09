import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ResumeApplicationDetail } from "@/types/applicants";

interface ResumeContentProps {
  applicant: ResumeApplicationDetail;
}

export const ResumeContent = ({ applicant }: ResumeContentProps) => {
  return (
    <div className="space-y-6">
      {/* 학력 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>학력</CardTitle>
        </CardHeader>
        <CardContent>
          {applicant.education?.length > 0 ? (
            <div className="space-y-4">
              {applicant.education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{edu.school}</h3>
                    <span className="text-sm text-gray-500">{edu.period}</span>
                  </div>
                  <p>{edu.degree}</p>
                  <p className="text-sm text-gray-500">학점: {edu.gpa}</p>
                  {index < applicant.education.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">학력 정보가 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {/* 경력 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>경력</CardTitle>
        </CardHeader>
        <CardContent>
          {applicant.experience?.length > 0 ? (
            <div className="space-y-4">
              {applicant.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.company}</h3>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  <p>{exp.position}</p>
                  <p className="text-sm">{exp.description}</p>
                  {index < applicant.experience.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">경력 정보가 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {/* 프로젝트 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>프로젝트</CardTitle>
        </CardHeader>
        <CardContent>
          {applicant.projects?.length > 0 ? (
            <div className="space-y-4">
              {applicant.projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{project.name}</h3>
                    <span className="text-sm text-gray-500">{project.period}</span>
                  </div>
                  <p className="text-sm font-medium">{project.role}</p>
                  <p className="text-sm">{project.description}</p>
                  {index < applicant.projects.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">프로젝트 정보가 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {/* 기술 스택 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>기술 스택</CardTitle>
        </CardHeader>
        <CardContent>
          {applicant.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">보유 기술이 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {/* 언어 & 자격증 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>언어</CardTitle>
          </CardHeader>
          <CardContent>
            {applicant.languages?.length > 0 ? (
              <div className="space-y-2">
                {applicant.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-sm text-gray-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">언어 정보가 없습니다.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>자격증</CardTitle>
          </CardHeader>
          <CardContent>
            {applicant.certificates?.length > 0 ? (
              <div className="space-y-2">
                {applicant.certificates.map((cert, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{cert.name}</span>
                    <span className="text-sm text-gray-500">{cert.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">자격증 정보가 없습니다.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
