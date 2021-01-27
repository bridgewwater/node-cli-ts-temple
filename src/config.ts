let isForce = false

export const openForce = (): void => {
  isForce = true
}

export const force = (): boolean => {
  return isForce
}
