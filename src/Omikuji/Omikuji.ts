import { Message } from 'discord.js';

export default class Omikuji {
  count: number;
  targetMsg: string;
  results: string[];
  prefixs: string[];
  suffixs: string[];
  msg: Message;

  constructor(msgObject: Message) {
    this.count = 1;
    this.targetMsg = 'おみくじ';
    this.msg = msgObject;
    this.results = ['大凶', '凶', '末吉', '小吉', '中吉', '吉', '大吉'];
    this.prefixs = ['あなたの運勢は、', 'うんせいは、' , 'じゃらじゃらじゃら～!' , '' , '2021ねんの運勢は、'];
    this.suffixs = ['です!' , 'だよ～' , 'なんだなぁ' , 'でござるよ' , 'ですねぇ' , '!!!!!!' , 'です～', 'です']
  }
  setCount(count: number): void {
    this.count = count;
  }
  setTargetMsg(targetMsg: string): void {
    this.targetMsg = targetMsg;
  }
  doOmikuji(): void {
    if (this.msg.content === this.targetMsg) {
      const randomNumber = Math.random();
      const omikujiResultLength = this.results.length;
      for (const [index, omikujiResult] of this.results.entries()) {
        if (randomNumber < (1 * (index + 1)) / omikujiResultLength) {
          this.msg.channel
            .send(`${this.prefixs[Math.floor(Math.random() * this.prefixs.length)]}${omikujiResult}${this.suffixs[Math.floor(Math.random() * this.prefixs.length)]}`)
            .catch((err) => {
              console.log(err);
            });
          break;
        }
      }
    }
  }
  doMultipleOmikuji(count = this.count): void {
    for (let i = 0; i < count; i++) {
      this.doOmikuji();
    }
  }
}
