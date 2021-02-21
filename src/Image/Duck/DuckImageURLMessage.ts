import BaseImageURLMessage from '../Base'

import { Message } from 'discord.js';
import fetch from 'node-fetch';

type DuckImageApiResType = {
  message : string;
  url : string;
}

export default class FoxImageURLMessage extends BaseImageURLMessage {
  constructor(msgObject: Message) {
    super(msgObject);
    this.apiEndPoint = "https://random-d.uk/api/random";
    this.targetMessageContent = ['ahiru','あひる','アヒル','duck','quack'];
    this.matchType = "exact";
  }
  async getImageURL(): Promise<string> {
    const response = await fetch(this.apiEndPoint);
    const resultData = await response.json() as DuckImageApiResType;
    return resultData.url;
  }
}
