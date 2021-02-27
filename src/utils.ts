export const afterMultiLineSplit = (item: string): string => item.replace(/\n+$/, '')
export const clearComments = (data: string): string => data.replace(/^(\/\/[\s\S]).*\n/mg, '')