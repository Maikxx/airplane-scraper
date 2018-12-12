export const convertToNumber = (text: string): number => {
    return Number(text.replace(',', ''))
}
