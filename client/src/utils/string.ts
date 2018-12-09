export const truncateString = (text: string, maxLength: number): string => {
    return `${text.substr(0, maxLength)}...`
}
