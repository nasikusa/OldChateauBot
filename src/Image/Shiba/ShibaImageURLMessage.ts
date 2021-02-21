import BaseImageURLMessage from '../Base'

import { Message } from 'discord.js';
import fetch from 'node-fetch';


type FoxImageApiResType = string[];

export default class FoxImageURLMessage extends BaseImageURLMessage {
  constructor(msgObject: Message) {
    super(msgObject);
    this.apiEndPoint = "http://shibe.online/api/shibes";
    this.targetMessageContent = ['shiba' , 'shibe' , 'しば' , 'シバ' , '柴' , 'しばいぬ' , 'シバイヌ' , '柴犬'];
    this.matchType = "exact";
  }
  async getImageURL(): Promise<string> {
    const response = await fetch(this.apiEndPoint);
    const resultData = await response.json() as FoxImageApiResType;
    return resultData[0];
  }
}
