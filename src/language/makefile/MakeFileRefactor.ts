import path from 'path'
import fsExtra from 'fs-extra'
import {
  addTextLineTail,
  addTextOneLineAfter,
  replaceTextLineByLineAtFile,
  replaceTextLineByLineAtPath
} from '../common/commonLanguage'

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

  renameTargetLineByLine(fromContent: string, toContent: string): Error | null {
    if (!fsExtra.existsSync(this.MakefileTargetPath)) {
      return new Error(`target makefile not exists: ${this.MakefileTargetPath}`)
    }
    return replaceTextLineByLineAtFile(this.MakefileTargetPath, fromContent, toContent)
  }

  renameRootInclude(from: string, to: string): Error | null {
    if (!fsExtra.existsSync(this.RootMakefilePath)) {
      return new Error(`root makefile not exists: ${this.RootMakefilePath}`)
    }
    const includeFromText = `include ${from}`
    const includeToText = `include ${to}`
    replaceTextLineByLineAtPath(this.RootMakefilePath, includeFromText, includeToText)
    const helpFromText = `help-${from}`
    const helpToText = `help-${to}`
    replaceTextLineByLineAtPath(this.RootMakefilePath, helpFromText, helpToText)
    return null
  }

  addRootIncludeModule(newModuleName: string, subModuleMKFile: string, helpTaskContent: string): Error | null {
    if (!fsExtra.existsSync(this.RootMakefilePath)) {
      return new Error(`root makefile not exists: ${this.RootMakefilePath}`)
    }
    const includeContent = `include ${newModuleName}/${subModuleMKFile}`
    addTextOneLineAfter(this.RootMakefilePath,
      /^include .*/,
      includeContent
    )
    addTextLineTail(this.RootMakefilePath,
      /^help: .*/,
      helpTaskContent)
    return null
  }
}