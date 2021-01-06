import { Client } from 'discord.js';
import Omikuji from './Omikuji';
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
  omikuji.doOmikuji();
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
