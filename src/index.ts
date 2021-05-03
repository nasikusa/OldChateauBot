import { Client } from 'discord.js';
import HTTPCats from './HTTPCats';
import Omikuji from './Omikuji';
import Talk from './Talk';
// import dotenv from 'dotenv';
// import Cats from './Cats';
import CatImageURLMessage from './Image/Cat';
import DogImageURLMessage from './Image/Dog';
import FoxImageURLMessage from './Image/Fox';
import ShibaImageURLMessage from './Image/Shiba';
import DuckImageURLMessage from './Image/Duck';
import BaseRoleReact from './RoleReact/Base';
const client = new Client();
// dotenv.config();

client.on('ready', () => {
  if( client.user != null ) {
    console.log(`${client.user.username} でログインしています！`)
  }
})

client.on('message', msg => {
  // console.log(msg);
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

client.on('messageReactionAdd', (messageReaction, user) => {
  const baseRoleReact = new BaseRoleReact(messageReaction, user);
  baseRoleReact.addRole();
})

client.on('messageReactionRemove', (messageReaction, user) => {
  const baseRoleReact = new BaseRoleReact(messageReaction, user);
  baseRoleReact.removeRole();
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
