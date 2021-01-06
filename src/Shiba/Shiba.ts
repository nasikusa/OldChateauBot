import { Message } from 'discord.js';
import fetch from 'node-fetch';

export default class Shiba {
  apiEndPoint: string;
  msg: Message;
  targetMsg: string[];

  constructor( msgObject: Message ) {
    this.apiEndPoint = 'http://shibe.online/api/shibes';
    this.msg = msgObject;
    this.targetMsg = ['shiba' , 'shibe' , 'しば' , 'シバ' , '柴' , 'しばいぬ' , 'シバイヌ' , '柴犬'];
  }
  async getImageURL(): Promise<string> {
    const response = await fetch(this.apiEndPoint);
    const resultData = await response.json() as string[];
    return resultData[0];
  }
  async sendMsg(): Promise<void> {
    if ( this.targetMsg.includes(this.msg.content)) {
      const imageUrl = await this.getImageURL();
      this.msg.channel
      .send(`${this.msg.content}の画像をお届けします～  ∪･ω･∪
${imageUrl}`)
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
