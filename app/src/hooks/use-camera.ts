import { useState, useCallback } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { base64ToFile } from '../utils/file.utils'

type CameraState = {
    file: File | null
    previewUrl: string | null
    isLoading: boolean
    error: string | null
}

type UseCameraReturn = {
    file: File | null
    previewUrl: string | null
    isLoading: boolean
    error: string | null
    takePhoto: () => Promise<void>
    pickFromGallery: () => Promise<void>
    clearPhoto: () => void
    setFileFromInput: (file: File) => void
}

const INITIAL_STATE: CameraState = {
    file: null,
    previewUrl: null,
    isLoading: false,
    error: null,
}

const CAMERA_QUALITY = 80

export function useCamera(): UseCameraReturn {
    const [state, setState] = useState<CameraState>(INITIAL_STATE)

    const handleCameraResult = useCallback(async (source: CameraSource): Promise<void> => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }))

        try {
            const photo = await Camera.getPhoto({
                quality: CAMERA_QUALITY,
                resultType: CameraResultType.Base64,
                source,
                correctOrientation: true,
            })

            if (!photo.base64String) {
                setState((prev) => ({ ...prev, isLoading: false, error: 'No image data received' }))
                return
            }

            const mimeType = `image/${photo.format}`

            const filename = `receipt_${Date.now()}.${photo.format}`

            const file = base64ToFile(photo.base64String, filename, mimeType)

            const previewUrl = `data:${mimeType};base64,${photo.base64String}`

            setState({ file, previewUrl, isLoading: false, error: null })
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to capture photo'

            const isUserCancelled = message.toLowerCase().includes('cancel') || message.toLowerCase().includes('user denied')

            if (isUserCancelled) {
                setState((prev) => ({ ...prev, isLoading: false }))
                return
            }

            setState((prev) => ({ ...prev, isLoading: false, error: message }))
        }
    }, [])

    const takePhoto = useCallback(async (): Promise<void> => {
        await handleCameraResult(CameraSource.Camera)
    }, [handleCameraResult])

    const pickFromGallery = useCallback(async (): Promise<void> => {
        await handleCameraResult(CameraSource.Photos)
    }, [handleCameraResult])

    const clearPhoto = useCallback((): void => {
        if (state.previewUrl && state.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(state.previewUrl)
        }

        setState(INITIAL_STATE)
    }, [state.previewUrl])

    const setFileFromInput = useCallback((file: File): void => {
        const previewUrl = URL.createObjectURL(file)

        setState({ file, previewUrl, isLoading: false, error: null })
    }, [])

    return {
        file: state.file,
        previewUrl: state.previewUrl,
        isLoading: state.isLoading,
        error: state.error,
        takePhoto,
        pickFromGallery,
        clearPhoto,
        setFileFromInput,
    }
}
