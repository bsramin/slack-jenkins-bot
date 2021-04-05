export const sleep = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
