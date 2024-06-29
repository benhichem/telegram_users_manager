import { DotenvParseOutput } from 'dotenv'
import { config } from 'dotenv'
import { IconfigService } from '../types'

export default class ConfigService implements IconfigService {
  private config: DotenvParseOutput
  constructor() {
    const { error, parsed } = config()
    if (error) {
      console.log('Failed to locate Dotenv file ...')
    }
    if (!parsed) {
      console.log('Env Formated Wrong ... ')
    }
    this.config = parsed!
  }

  get(key: string): string {
    let res = this.config[key]
    if (!res) {
      console.log(`${key} does not exist in env file `)
      throw new Error(`${key} does not exist in env file .`)
    } else {
      return res
    }
  }
}
