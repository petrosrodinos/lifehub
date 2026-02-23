import { useEffect, useRef } from 'react'
import { Camera, X, Upload, ImageIcon, Loader2 } from 'lucide-react'
import { useCamera } from '../../../../../../../hooks/use-camera'
import { useIsMobile } from '../../../../../../../hooks/use-is-mobile'

type ReceiptPhotoCaptureProps = {
  onFileSelect: (file: File) => void
  onFileClear: () => void
  disabled?: boolean
}

export function ReceiptPhotoCapture({
  onFileSelect,
  onFileClear,
  disabled = false,
}: ReceiptPhotoCaptureProps) {
  const {
    file,
    previewUrl,
    isLoading,
    error,
    takePhoto,
    pickFromGallery,
    clearPhoto,
    setFileFromInput,
  } = useCamera()

  const isMobile = useIsMobile()

  const previousFileRef = useRef<File | null>(null)

  useEffect(() => {
    if (file && file !== previousFileRef.current) {
      previousFileRef.current = file

      onFileSelect(file)
    }
  }, [file, onFileSelect])

  const handleTakePhoto = async (): Promise<void> => {
    await takePhoto()
  }

  const handlePickFromGallery = async (): Promise<void> => {
    await pickFromGallery()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    setFileFromInput(selectedFile)
  }

  const handleClear = (): void => {
    previousFileRef.current = null

    clearPhoto()

    onFileClear()
  }

  if (previewUrl) {
    return (
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-300">
          Receipt photo
        </label>

        <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
          <img
            src={previewUrl}
            alt="Receipt preview"
            className="w-full max-h-64 object-contain bg-slate-900/50"
          />

          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-red-500/80 text-white rounded-lg transition-colors backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 truncate">
          {file?.name}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-300">
        Receipt photo
      </label>

      {error && (
        <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-8 bg-slate-800/50 border border-slate-700/50 rounded-xl">
          <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />

          <span className="ml-2 text-sm text-slate-400">Processing...</span>
        </div>
      ) : (
        <div className="space-y-2">
          {isMobile && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleTakePhoto}
                disabled={disabled}
                className="flex flex-col items-center gap-2 px-4 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-violet-500/50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="p-2.5 bg-violet-500/10 group-hover:bg-violet-500/20 rounded-lg transition-colors">
                  <Camera className="w-5 h-5 text-violet-400" />
                </div>

                <span className="text-sm font-medium text-slate-300">Take photo</span>
              </button>

              <button
                type="button"
                onClick={handlePickFromGallery}
                disabled={disabled}
                className="flex flex-col items-center gap-2 px-4 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="p-2.5 bg-blue-500/10 group-hover:bg-blue-500/20 rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5 text-blue-400" />
                </div>

                <span className="text-sm font-medium text-slate-300">Gallery</span>
              </button>
            </div>
          )}

          <label
            htmlFor="receipt-file-input"
            className={`flex flex-col items-center gap-2 px-4 py-4 bg-slate-800 hover:bg-slate-700 border border-dashed border-slate-600 hover:border-violet-500/50 rounded-xl transition-all cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="p-2.5 bg-emerald-500/10 rounded-lg">
              <Upload className="w-5 h-5 text-emerald-400" />
            </div>

            <span className="text-sm font-medium text-slate-300">Upload file</span>

            <span className="text-xs text-slate-500">JPG, PNG, or PDF</span>

            <input
              id="receipt-file-input"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileInputChange}
              disabled={disabled}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  )
}
