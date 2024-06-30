export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const getKeyByValue = (object: Record<string, any>, value: any) => Object.keys(object).find(key => object[key] === value)
