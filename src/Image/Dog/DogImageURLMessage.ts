import BaseImageURLMessage from '../Base'

import { Message } from 'discord.js';
import fetch from 'node-fetch';

type DogImageApiResType = {
  fileSizeBytes : number;
  url : string;
}

export default class DogImageURLMessage extends BaseImageURLMessage {
  constructor(msgObject: Message) {
    super(msgObject);
    this.apiEndPoint = "https://random.dog/woof.json";
    this.targetMessageContent = ['inu','いぬ','わんこ','イヌ','ワンコ','犬','dog','dogs'];
    this.matchType = "exact";
  }
  async getImageURL(): Promise<string> {
    let isDoneFlag = false;
    while(isDoneFlag === false) {
      const response = await fetch(this.apiEndPoint);
      const resultData = await response.json() as DogImageApiResType;
      // ファイルサイズが大きいものと、拡張子が mp4 のものの場合は、再度取得する
      if(resultData.fileSizeBytes < 100000 && resultData.url.split('.')[1] !== 'mp4'){
        isDoneFlag = true;
        return resultData.url;
      }
    }
    return '';
  }
}
