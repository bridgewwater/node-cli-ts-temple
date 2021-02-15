import fs from 'fs'

/**
 * check the path exists
 * @param p - path
 */
export const isExistPathSync = (p: string): boolean => fs.existsSync(p)

/**
 * check dir is Empty
 * @param p
 */
export const isDirEmptySync = (p: string): boolean => fs.readdirSync(p).length === 0

/**
 * Fetch user home directory
 * @return path of user home
 */
export const USER_HOME = process.env.HOME || process.env.USERPROFILE
