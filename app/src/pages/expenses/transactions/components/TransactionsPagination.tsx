import { ChevronLeft, ChevronRight } from 'lucide-react'

type TransactionsPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading: boolean
}

export function TransactionsPagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: TransactionsPaginationProps) {
  if (totalPages <= 1) return null

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        className="p-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              type="button"
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                currentPage === page
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300'
              } disabled:cursor-not-allowed`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-slate-500">
              {page}
            </span>
          )
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        className="p-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
