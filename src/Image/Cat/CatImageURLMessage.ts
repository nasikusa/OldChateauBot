import BaseImageURLMessage from '../Base'

import { Message } from 'discord.js';
import fetch from 'node-fetch';

export default class CatImageURLMessage extends BaseImageURLMessage {
  constructor(msgObject: Message) {
    super(msgObject);
    this.apiEndPoint = "https://aws.random.cat/meow";
    this.targetMessageContent = ['neko','ねこ' , 'ぬこ' , 'にゃんこ' , '猫' , 'ネコ' , 'ヌコ' , 'ニャンコ', 'cat', 'cats'];
    this.matchType = "exact";
  }
  async getImageURL(): Promise<string> {
    const response = await fetch(this.apiEndPoint);
    const resultData = await response.json() as { file: string };
    return resultData.file;
  }
}
