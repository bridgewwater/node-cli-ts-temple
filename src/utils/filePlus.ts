import fs from 'fs'
import path from 'path'
import fsExtra from 'fs-extra'

/**
 * check the path exists
 * @param p - path
 */
export const isExistPathSync = (p: string): boolean => fs.existsSync(p)

/**
 * check path is Directory
 * @param p - path
 */
export const isPathDirectorySync = (p: string): boolean => fs.lstatSync(p).isDirectory()

/**
 * check dir is Empty
 * @param p
 */
export const isDirEmptySync = (p: string): boolean => fs.readdirSync(p).length === 0

/**
 * recursively delete empty directories sync
 * @param rootPath - delete root path
 * @param targetPath - want delete target path
 * @return null is success, err will show Error
 */
export const recursivelyDeleteEmptyDirectoriesSync = (rootPath: string, targetPath: string): Error | null => {
  if (!fsExtra.existsSync(rootPath)) {
    return new Error(`recursively delete empty directories root not exists: ${rootPath}`)
  }
  if (!fsExtra.existsSync(targetPath)) {
    return new Error(`recursively delete empty directories target not exists: ${targetPath}`)
  }
  if (targetPath.indexOf(rootPath) === -1) {
    return new Error(`recursively delete empty directories targetPath not contains rootPath: ${targetPath}`)
  }
  if (isDirEmptySync(targetPath)) {
    fsExtra.removeSync(targetPath)
  }
  const subPath = path.dirname(targetPath)
  if (subPath !== rootPath) {
    return recursivelyDeleteEmptyDirectoriesSync(rootPath, subPath)
  }
  return null
}

/**
 * Fetch user home directory
 * @return path of user home
 */
export const USER_HOME = process.env.HOME || process.env.USERPROFILE
