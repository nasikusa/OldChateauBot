import { Client } from 'discord.js';
import HTTPCats from './HTTPCats';
import Omikuji from './Omikuji';
import Shiba from './Shiba';
// import dotenv from 'dotenv';
const client = new Client();
// dotenv.config();

client.on('ready', () => {
  if( client.user != null ) {
    console.log(`${client.user.username} でログインしています！`)
  }
})

client.on('message', msg => {
  const omikuji = new Omikuji( msg );
  const shiba = new Shiba( msg );
  const httpcats = new HTTPCats( msg );
  omikuji.doOmikuji();
  shiba.sendMsg().catch(err => {
    console.log(err);
  });
  httpcats.showList();
  httpcats.sendMsg();
})

if( process.env.DISCORD_TOKEN ){
  client.login( process.env.DISCORD_TOKEN ).catch(err => {
    console.log(err);
  })
} else {
  client.login().catch(err => {
    console.log(err);
  })
}
