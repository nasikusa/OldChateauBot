import { Client } from 'discord.js';
import HTTPCats from './HTTPCats';
import Omikuji from './Omikuji';
import Talk from './Talk';
// import dotenv from 'dotenv';
import CatImageURLMessage from './Image/Cat';
import DogImageURLMessage from './Image/Dog';
import FoxImageURLMessage from './Image/Fox';
import ShibaImageURLMessage from './Image/Shiba';
import DuckImageURLMessage from './Image/Duck';
import BaseRoleReact from './RoleReact/Base';
import { roleChanellId } from './static/roleReactIds';

const client = new Client();
/**
 * 開発環境かどうかのフラグ
 * @todo : 環境変数とかにしたい
 */
const DEV = false;

if(DEV){
  // dotenv.config();
}

// ボット起動時の処理
client.on('ready', () => {
  if( client.user != null ) {
    console.log(`${client.user.username} でログインしています！`)
  }
})

// ユーザーからテキストメッセージが送られたときに発火
client.on('message', msg => {
  const omikuji = new Omikuji( msg );
  const httpcats = new HTTPCats( msg );
  const talk = new Talk( msg );
  const catImageURLMessage = new CatImageURLMessage(msg);
  const dogImageURLMessage = new DogImageURLMessage(msg);
  const foxImageURLMessage = new FoxImageURLMessage(msg);
  const shibaImageURLMessage = new ShibaImageURLMessage(msg);
  const duckImageURLMessage = new DuckImageURLMessage(msg);
  omikuji.doOmikuji();
  catImageURLMessage.run().catch(err => console.log(err));
  dogImageURLMessage.run().catch(err => console.log(err));
  foxImageURLMessage.run().catch(err => console.log(err));
  shibaImageURLMessage.run().catch(err => console.log(err));
  duckImageURLMessage.run().catch(err => console.log(err));
  httpcats.showList();
  httpcats.sendMsg();
  talk.sendMsg().catch(err => {
    console.log(err);
  })
})

// ユーザーから絵文字の追加リアクションが発生したときに発火
client.on('messageReactionAdd', (messageReaction, user) => {
  const baseRoleReact = new BaseRoleReact(messageReaction, user, null, roleChanellId);
  baseRoleReact.addRole();
})

// ユーザーから絵文字の削除リアクションが発生したときに発火
client.on('messageReactionRemove', (messageReaction, user) => {
  const baseRoleReact = new BaseRoleReact(messageReaction, user, null, roleChanellId);
  baseRoleReact.removeRole();
})

// ログイン処理
if( process.env.DISCORD_TOKEN ){
  // ローカル環境の場合はこちらの処理が走る (dotenvにて管理)
  client.login( process.env.DISCORD_TOKEN ).catch(err => {
    console.log(err);
  })
} else {
  // 本番環境の場合はこちらの処理が走る (トークンはheroku側で管理してもらっている)
  client.login().catch(err => {
    console.log(err);
  })
}
