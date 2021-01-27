import { CMDType } from './cmdType'

/**
 * Define the parameters of the run command
 */
export interface ICmdParams {
  /**
   * args
   */
  args: string[]

  /**
   * cmd
   */
  cmd: CMDType

  /**
   * run path
   */
  cwd?: string

  /**
   * is stdio stream passed to the parent process or passed from the parent process
   */
  isStdio?: boolean
}
