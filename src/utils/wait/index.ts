// eslint-disable-next-line max-len
export const wait = (time: number): Promise<void> => new Promise((res) => setTimeout(res, time))
