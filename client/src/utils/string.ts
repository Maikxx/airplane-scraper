export const truncateString = (text: string, maxLength: number): string => {
    const dots = '...'
    return (text.length + dots.length) >= maxLength
        ? `${text.substr(0, maxLength)}${dots}`
        : text
}
