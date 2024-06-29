import fs from "node:fs"
import path from "node:path"
import ConfigService from "../providers/configservice.js"

const config = new ConfigService()
// the reason why am using an array and not a set is because the chat member plugin allready handles duplicates .

import {User} from "../types/index.js"




class FileFinder {
  private results: string[] = [];

  constructor(private directoryPath: string) { }

  public getAllFilesSync(): string[] {
    this.findFiles(this.directoryPath);
    this.ClearPahts();
    return this.results;
  }


  private findFiles(directoryPath: string): void {
    // Read the directory
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Recursively get files from the subdirectory
        this.findFiles(filePath);
      } else {
        // Add the file path to the results
        this.results.push(filePath);
      }
    });
  }

  private ClearPahts() {
    // i will still have to decide if this needs to be included or not
    let cleanpath = this.results.filter((path) => { if (path.includes(config.get('GROUP_CHAT_ID'))) return path })
    return
  }
}


export default class ReadCMPStorage extends FileFinder {
  private readonly paths: Array<string>
  public users: Array<User>

  constructor(Path: string) {
    super(Path)
    this.paths = this.getAllFilesSync()
    this.users = []
  }

  public GetUsers() {
    for (let index = 0; index < this.paths.length; index++) {
      const path = this.paths[index];
      const json = JSON.parse(fs.readFileSync(path).toString())
      this.users.push({
        id:json.user.id,
        first_name:json.user.first_name,
        last_name:json.user.last_name,
        username:json.user.username
      })
    }
    return this.users
  }
}


// let filed = new FileFinder('./Sotrage')
// console.log(filed.getAllFilesSync())