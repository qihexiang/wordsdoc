export const afterMultiLineSplit = (item: string): string => item.replace(/\n+$/, '')
export const clearComments = (data: string): string => data.replace(/^(\/\/[\s\S]).*\n/mg, '')
export const crlf2lf = (data: string): string => data.replace(/\r\n/g, '\n')
export const clearMultiEmptyLine = (data: string): string => data.replace(/\n{3,}/g, '\n\n')