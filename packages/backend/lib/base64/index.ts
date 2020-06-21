export const atob = (input: string): string => {
  return Buffer.from(input, 'ascii').toString('base64')
}

export const btoa = (input: string): string => {
  return Buffer.from(input, 'base64').toString('ascii')
}
