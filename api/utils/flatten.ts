export const flatten = (array: any[]): any[] => {
    return array.reduce((prev, cur) => prev.concat(cur), [])
}

export const flattenDeep = (array: any[]): any[] => {
    return Array.isArray(array)
        ? array.reduce((prev, cur) => prev.concat(flattenDeep(cur)) , [])
        : [array]
}
