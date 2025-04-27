
interface SkillTagProps {
  name: string
}

const getTagColor = (name: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    React: { bg: "bg-blue-100", text: "text-blue-700" },
    TypeScript: { bg: "bg-blue-100", text: "text-blue-700" },
    JavaScript: { bg: "bg-yellow-100", text: "text-yellow-700" },
    HTML: { bg: "bg-orange-100", text: "text-orange-700" },
    CSS: { bg: "bg-blue-100", text: "text-blue-700" },
    Java: { bg: "bg-red-100", text: "text-red-700" },
    "Spring Boot": { bg: "bg-green-100", text: "text-green-700" },
    MySQL: { bg: "bg-blue-100", text: "text-blue-700" },
    AWS: { bg: "bg-orange-100", text: "text-orange-700" },
    Docker: { bg: "bg-blue-100", text: "text-blue-700" },
    "Node.js": { bg: "bg-green-100", text: "text-green-700" },
    MongoDB: { bg: "bg-green-100", text: "text-green-700" },
    Express: { bg: "bg-gray-100", text: "text-gray-700" },
    Python: { bg: "bg-blue-100", text: "text-blue-700" },
    R: { bg: "bg-blue-100", text: "text-blue-700" },
    TensorFlow: { bg: "bg-orange-100", text: "text-orange-700" },
    PyTorch: { bg: "bg-red-100", text: "text-red-700" },
    "Machine Learning": { bg: "bg-purple-100", text: "text-purple-700" },
    Kubernetes: { bg: "bg-blue-100", text: "text-blue-700" },
    Jenkins: { bg: "bg-red-100", text: "text-red-700" },
    Terraform: { bg: "bg-purple-100", text: "text-purple-700" },
    Kotlin: { bg: "bg-purple-100", text: "text-purple-700" },
    "Android SDK": { bg: "bg-green-100", text: "text-green-700" },
    MVVM: { bg: "bg-gray-100", text: "text-gray-700" },
    Room: { bg: "bg-gray-100", text: "text-gray-700" },
    Swift: { bg: "bg-orange-100", text: "text-orange-700" },
    "Objective-C": { bg: "bg-blue-100", text: "text-blue-700" },
    UIKit: { bg: "bg-blue-100", text: "text-blue-700" },
    SwiftUI: { bg: "bg-blue-100", text: "text-blue-700" },
    "Core Data": { bg: "bg-gray-100", text: "text-gray-700" },
    Linux: { bg: "bg-yellow-100", text: "text-yellow-700" },
    "Windows Server": { bg: "bg-blue-100", text: "text-blue-700" },
    "Network Security": { bg: "bg-red-100", text: "text-red-700" },
    Virtualization: { bg: "bg-purple-100", text: "text-purple-700" },
    "Cloud Infrastructure": { bg: "bg-blue-100", text: "text-blue-700" },
  }

  return colors[name] || { bg: "bg-gray-100", text: "text-gray-700" }
}

export const SkillTag = ({ name }: SkillTagProps) => {
  const { bg, text } = getTagColor(name)

  return <span className={`text-xs px-2 py-1 rounded ${bg} ${text}`}>{name}</span>
}
