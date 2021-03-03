import fsWalk from '@nodelib/fs.walk'
import lodash from 'lodash'
import path from 'path'
import { replaceTextLineAtFile, replaceTextLineByLineAtFile } from '../common/commonLanguage'
import fsExtra from 'fs-extra'

export class TypeScriptProjectRefactor {
  targetSourceRoot: string

  constructor(targetSourceRoot: string) {
    this.targetSourceRoot = targetSourceRoot
  }

  renameByFileTextLineByLine(from: string, to: string): Error | null {
    try {
      const entries = fsWalk.walkSync(this.targetSourceRoot)
      let err = null
      entries.forEach((value) => {
        err = replaceTextLineByLineAtFile(value.path, from, to)
        if (err) {
          throw err
        }
      })
      return null
    } catch (e) {
      return e
    }
  }

  renameByFileString(from: string, to: string): Error | null {
    try {
      const entries = fsWalk.walkSync(this.targetSourceRoot)
      const extList = ['.md', '.json', '.ts']
      let err = null
      entries.forEach((value) => {
        if (!lodash.isEmpty(extList)) {
          extList.forEach((v) => {
            if (path.extname(value.path) === v) {
              err = replaceTextLineAtFile(value.path, from, to)
              if (err) {
                throw err
              }
            }
          })
        }
      })
      return null
    } catch (e) {
      return e
    }
  }

  renameTsFileName(from: string, to: string, extname: string): Error | null {
    const entries = fsWalk.walkSync(this.targetSourceRoot)
    entries.forEach((value) => {
      if (path.extname(value.path) === extname) {
        if (value.name.search(from) !== -1) {
          fsExtra.moveSync(value.path, path.join(
            path.dirname(value.path),
            value.name.replace(from, to)))
        }
      }
    })
    return null
  }
}