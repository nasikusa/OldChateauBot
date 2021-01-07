import { Message } from 'discord.js';
import fetch from 'node-fetch';

type apiResult = {
  status: string;
  message: string;
  results?: {
    perplexity: string;
    reply: string;
  }[]
}

export default class Talk {
  apiEndPoint: string;
  msg: Message;
  targetMsg: string;
  apiToken: string;

  constructor( msg: Message ) {
    this.apiEndPoint = 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk';
    this.msg = msg;
    this.targetMsg = 'talk';
    this.apiToken = process.env.RECRUIT_TALK_API_TOKEN as string | "";
  }
  isTalkMsg() : boolean {
    return this.msg.content.toLowerCase().startsWith(this.targetMsg);
  }
  getTalkMsg(): string {
    return this.msg.content.slice(this.targetMsg.length).trim();
  }
  async getTalkData() {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    const sendData = {apikey: this.apiToken , query: this.getTalkMsg()};
    const body = (Object.keys(sendData) as (keyof typeof sendData)[]).map((key)=>key+"="+encodeURIComponent(sendData[key])).join("&");
    const response = await fetch( this.apiEndPoint , {
      method: 'POST',
      headers,
      body,
    });
    const resultData: apiResult = await response.json() as apiResult;
    if( resultData.status === '1400' ){
      return 'メッセージの取得に失敗しました...';
    }
    if( resultData.results != null ) {
      return resultData.results[0].reply;
    }
    return 'エラーが発生しています...';
  }
  async sendMsg(): Promise<void> {
    if ( this.isTalkMsg() ) {
      const talkResult = await this.getTalkData();
      this.msg.channel
      .send(talkResult)
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
