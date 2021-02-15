import path from 'path'
import fsExtra from 'fs-extra'
import LineReader from 'n-readlines-next'
import replace from 'replace-in-file'

export class MakeFileRefactor {
  ProjectRootPath: string

  RootMakefilePath: string

  MakefileTarget: string

  MakefileTargetPath: string

  constructor(ProjectRootPath: string, MakefileTarget: string) {
    this.ProjectRootPath = path.resolve(ProjectRootPath)
    this.RootMakefilePath = path.join(this.ProjectRootPath, 'Makefile')
    this.MakefileTarget = MakefileTarget
    this.MakefileTargetPath = path.join(this.ProjectRootPath, this.MakefileTarget)
  }

  private replaceTextLineByLine(
    replacePath: string = this.MakefileTargetPath, fromText: string, toText: string,
    encoding?: 'utf-8'
  ) {
    const liner = new LineReader(replacePath)
    const lineEach = []
    let line = liner.next()
    let mustReplace = false
    do {
      const lS = line.toString(encoding)
      if (lS.search(fromText) !== -1) {
        lineEach.push(lS.replace(fromText, toText))
        mustReplace = true
      } else {
        lineEach.push(lS)
      }
      line = liner.next()
    } while (line)
    if (mustReplace) {
      const newFileContent = lineEach.join('\n')
      // logDebug(`newFileContent:\n${newFileContent}`)
      fsExtra.writeFileSync(replacePath, newFileContent)
    }
  }

  renameTargetLineByLine(fromContent: string, toContent: string): Error | null {
    if (!fsExtra.existsSync(this.MakefileTargetPath)) {
      return new Error(`target makefile not exists: ${this.MakefileTargetPath}`)
    }
    try {
      replace.sync({
        files: this.MakefileTargetPath,
        from: new RegExp(fromContent, 'g'),
        to: toContent
      })
    } catch (e) {
      return e
    }
    return null
  }
}