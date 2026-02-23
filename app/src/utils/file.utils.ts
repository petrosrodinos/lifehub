export function base64ToFile(base64: string, filename: string, mimeType: string): File {
    const byteString = atob(base64)

    const byteArray = new Uint8Array(byteString.length)

    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i)
    }

    return new File([byteArray], filename, { type: mimeType })
}
