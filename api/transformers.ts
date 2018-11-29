const removeSourceNumbersFromText = (text: string): string => {
    return text.replace(/(\[)([1-9]*)(\])/g, '')
}

export const cleanText = (text: string): string => {
    return removeSourceNumbersFromText(text)
        .trim()
}

export const convertToNumber = (text: string): number => {
    return Number(text
        .replace(',', ''))
}

export const convertToUsableUrl = (url: string): string | null => {
    if (url.startsWith('/wiki/')) {
        return `https://en.wikipedia.org${url}`
    }

    return null
}
