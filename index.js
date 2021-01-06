const Discord = require('discord.js')
const client = new Discord.Client()

class Omikuji {
  constructor( msgObject ) {
    this.count = 1;
    this.targetMsg = 'おみくじ';
    this.msg = msgObject;
    this.result = [
      '大凶',
      '凶',
      '末吉',
      '小吉',
      '中吉',
      '吉',
      '大吉',
    ];
  }
  setCount( count ) {
    this.count = count;
  }
  setTargetMsg( targetMsg ) {
    this.targetMsg = targetMsg;
  }
  doOmikuji() {
    if (this.msg.content === this.targetMsg) {
      const randomNumber = Math.random();
      const omikujiResultLength = this.result.length;
      for( const [index , omikujiResult] of this.result.entries() ){
        if( randomNumber < 1 * (index + 1) / omikujiResultLength ){
          this.msg.channel.send(omikujiResult);
          break;
        }
      }
    }
  }
  doMultipleOmikuji( count = this.count ) {
    for( let i = 0 ; i < count ; i++ ){
      this.doOmikuji();
    }
  }
}

client.on('ready', () => {
  console.log(`${client.user.username} でログインしています。`)
})

client.on('message', async msg => {
  const omikuji = new Omikuji( msg );
  omikuji.doOmikuji();
})

client.login('Nzk2MjMwNjYyODU2MjQ1Mjc4.X_U5lw.jMFIM5hmlO4fOIb1jUWtT-KPo54')

