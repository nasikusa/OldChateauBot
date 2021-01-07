import { Message } from 'discord.js';
import fetch from 'node-fetch';

export default class Cats {
  apiEndPoint: string;
  msg: Message;
  targetMsg: string[];

  constructor( msgObject: Message ) {
    this.apiEndPoint = 'https://aws.random.cat/meow';
    this.msg = msgObject;
    this.targetMsg = ['ねこ' , 'ぬこ' , 'にゃんこ' , '猫' , 'ネコ' , 'ヌコ' , 'ニャンコ'];
  }
  async getImageURL(): Promise<string> {
    const response = await fetch(this.apiEndPoint);
    const resultData = await response.json() as { file: string };
    return resultData.file;
  }
  async sendMsg(): Promise<void> {
    if ( this.targetMsg.includes(this.msg.content)) {
      const imageUrl = await this.getImageURL();
      this.msg.channel
      .send(imageUrl)
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
