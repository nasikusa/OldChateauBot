import { MessageReaction, User, PartialUser, GuildMember } from 'discord.js';
import { localRoles, LocalRoleDataType } from '../../static/roleIds';

export default class BaseEmojiRoleReact {
  protected targetEmojis: string[];
  protected targetPostIds: string | string[];
  protected messageReaction: MessageReaction;
  protected user: User | PartialUser;

  constructor(messageReaction: MessageReaction, user: User | PartialUser ) {
    this.messageReaction = messageReaction;
    this.user = user;
    this.targetEmojis = localRoles.map(obj => obj.targetEmoji);
    this.targetPostIds = '';
  }
  isIncludeEmoji (): boolean {
    return this.targetEmojis.includes(this.messageReaction.emoji.name);
  }
  getIncludeRoleObj (): LocalRoleDataType | null {
    const filterdArray = localRoles.filter(role => role.targetEmoji === this.messageReaction.emoji.name);
    return filterdArray.length > 0 ? filterdArray[0] : null;
  }
  getMember (): GuildMember | null | undefined {
    const guild = this.messageReaction.message.guild;
    if(guild != null){
      const member = guild.member(this.user as User);
      return member;
    }
    return null;
  }
  addRole(): void {
    const member = this.getMember();
    const roleObj = this.getIncludeRoleObj();
    if( member != null && roleObj != null ) {
      const role= member.guild.roles.cache.find(role => role.id === roleObj.id);
      if( role != null ) {
        member.roles.add(role).catch(err=>console.log(err));
      }
    }
  }
  removeRole(): void {
    const member = this.getMember();
    const roleObj = this.getIncludeRoleObj();
    if( member != null && roleObj != null ) {
      const role= member.guild.roles.cache.find(role => role.id === roleObj.id);
      if( role != null ) {
        member.roles.remove(role).catch(err=>console.log(err));
      }
    }
  }
}
