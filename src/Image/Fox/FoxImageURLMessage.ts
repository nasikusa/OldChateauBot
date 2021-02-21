import BaseImageURLMessage from '../Base'

import { Message } from 'discord.js';
import fetch from 'node-fetch';

type FoxImageApiResType = {
  image : string;
  link : string;
}

export default class FoxImageURLMessage extends BaseImageURLMessage {
  constructor(msgObject: Message) {
    super(msgObject);
    this.apiEndPoint = "https://randomfox.ca/floof/";
    this.targetMessageContent = ['kitune','kitsune','きつね','キツネ','狐','fox'];
    this.matchType = "exact";
  }
  async getImageURL(): Promise<string> {
    const response = await fetch(this.apiEndPoint);
    const resultData = await response.json() as FoxImageApiResType;
    return resultData.image;
  }
}
