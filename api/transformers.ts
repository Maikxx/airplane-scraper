const removeSourceNumbersFromText = (text: string) => {
    return text.replace(/(\[)([1-9]*)(\])/g, '')
}

export const cleanText = (text: string) => {
    return removeSourceNumbersFromText(text)
        .trim()
}

export const convertToNumber = (text: string): number => {
    return Number(text
        .replace(',', ''))
}
