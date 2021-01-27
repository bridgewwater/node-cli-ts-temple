let isVerbose = false

export const openVerbose = (): void => {
  isVerbose = true
}

export const verbose = (): boolean => {
  return isVerbose
}
