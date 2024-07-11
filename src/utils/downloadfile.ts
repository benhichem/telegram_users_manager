import axios from "axios";
import fs from "node:fs";

/**
 * Downloads a file from the given URL and saves it to the specified destination.
 *
 * @param {string} fileUrl - The URL of the file to download.
 * @param {string} outputLocationPath - The path where the file should be saved.
 * @returns {Promise<void>} - A promise that resolves when the download is complete.
 */
export async function DownloadFile(fileUrl:string, outputLocationPath:string): Promise<void> {
  const writer = fs.createWriteStream(outputLocationPath);

  const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
  });
}
import ConfigService from "../providers/configservice.js";

const config = new ConfigService()



/**
 * builds the download url for any document sent to the group chat.
 *
 * @export
 * @param {string} filename
 * @return {*}
 */
export async function BuildDownloadUrl(filename:string){
  return `https://api.telegram.org/file/bot${config.get('BOT_TOKEN')}/${filename}`;
}