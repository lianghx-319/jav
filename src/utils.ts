export function assertNotExists(value: any, message?: string) {
  if (value !== null && value !== undefined) {
    throw Error(message ? message : 'Value does exist')
  }
}
