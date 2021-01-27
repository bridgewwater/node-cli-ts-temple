import fs from 'fs'

/**
 * check the path exists
 * @param p - path
 */
export const isExistPath = (p: string): boolean => fs.existsSync(p)

/**
 * Fetch user home directory
 * @return path of user home
 */
export const USER_HOME = process.env.HOME || process.env.USERPROFILE
