import { Message } from 'discord.js';

export default class HTTPCats {
  apiEndPoint: string;
  msg: Message;
  targetMsg: string[];

  constructor( msgObject: Message ) {
    this.apiEndPoint = 'https://http.cat/';
    this.msg = msgObject;
    this.targetMsg = ['100','101','102','200','201','202','203','204','205','206','207','300','301','302','303','304','305','306','307','400','401','402','403','404','405','406','407','408','409','410','411','412','413','414','415','416','417','418','420','421','422','423','424','425','426','429','431','444','450','451','499','500','501','502','503','504','506','507','508','509','510','599'];
  }
  sendMsg(): void {
    if ( this.targetMsg.includes(this.msg.content)) {
      const resultUrl = `${this.apiEndPoint}${this.msg.content}`;
      this.msg.channel
      .send(resultUrl)
      .catch((err) => {
        console.log(err);
      });
    }
  }
  showList(): void {
    if ( this.msg.content === 'http' ) {
      const resultList = this.targetMsg.join(' , ');
      this.msg.channel
      .send(`HTTPCATSたちを紹介するよ(=^･ω･^=)
ステータスコードを入力してね ^ↀᴥↀ^
${resultList}`)
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
