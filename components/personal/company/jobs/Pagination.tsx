interface PaginationProps {
  currentPage?: number
  totalPages?: number
}

export const Pagination = ({ currentPage = 1, totalPages = 1 }: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${i === currentPage ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          {i}
        </button>,
      )
    }
    return pageNumbers
  }

  return (
    <div className="flex justify-center mt-8 mb-4">
      <div className="flex items-center gap-1">{renderPageNumbers()}</div>
    </div>
  )
}