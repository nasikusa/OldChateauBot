import { MessageReaction, User, PartialUser, GuildMember } from 'discord.js';
import { localRoles, LocalRoleDataType } from '../../static/roleIds';

/**
 * 絵文字のリアクションに反応してロール付与と削除を行うクラス
 */
export default class BaseEmojiRoleReact {
  /**
   * 反応する対象の絵文字配列
   */
  protected targetEmojis: string[];
  /**
   * 絵文字のリアクションでのロール付与と削除が有効となるメッセージのID情報
   */
  protected targetMessageId: string | string[] | null;
  /**
   * 絵文字のリアクションでのロール付与と削除が有効となるチャンネルのID情報
   */
  protected targetChannelId: string | string[] | null;
  /**
   * イベントで付与されたリアクションのオブジェクト
   */
  protected messageReaction: MessageReaction;
  /**
   * ユーザー情報オブジェクト
   */
  protected user: User | PartialUser;

  constructor(messageReaction: MessageReaction, user: User | PartialUser, targetMessageId: string | string[] | null, targetChannelId: string | string[] | null) {
    this.messageReaction = messageReaction;
    console.log(this.messageReaction);
    this.user = user;
    this.targetEmojis = localRoles.map(obj => obj.targetEmoji);
    this.targetMessageId = targetMessageId;
    this.targetChannelId = targetChannelId;
  }
  /**
   * 対象の絵文字を含んでいるかどうかを返すメソッド
   */
  isIncludeEmoji (): boolean {
    return this.targetEmojis.includes(this.messageReaction.emoji.name);
  }
  /**
   * 対象の絵文字を含んでいる場合は、その絵文字を含んでいるオブジェクトを返すメソッド
   */
  getIncludeRoleObj (): LocalRoleDataType | null {
    const filterdArray = localRoles.filter(role => role.targetEmoji === this.messageReaction.emoji.name);
    return filterdArray.length > 0 ? filterdArray[0] : null;
  }
  /**
   * 対象のチャンネルにて投稿されたメッセージにつけられた絵文字かどうかを返すメソッド
   */
  isMatchTargetChannelId (): boolean {
    const channelId = this.messageReaction.message.channel.id;
    if( Array.isArray(this.targetChannelId) ){
      return this.targetChannelId.includes(channelId);
    } else if ( this.targetChannelId != null ) {
      return channelId === this.targetChannelId;
    }
    return false;
  }
  /**
   * 対象のメッセージにつけられた絵文字かどうかを返すメソッド
   */
  isMatchTargetMessage (): boolean {
    const messageId = this.messageReaction.message.id;
    if( Array.isArray(this.targetMessageId) ){
      return this.targetMessageId.includes(messageId);
    } else if ( this.targetMessageId != null ) {
      return messageId === this.targetMessageId;
    }
    return false;
  }
  /**
   * 現在の絵文字リアクションのユーザーを取得する
   */
  getMember (): GuildMember | null | undefined {
    const guild = this.messageReaction.message.guild;
    if(guild != null){
      const member = guild.member(this.user as User);
      return member;
    }
    return null;
  }
  /**
   * 絵文字リアクションを行ったユーザーにロールを付与する
   */
  addRole(): void {
    // 対象のチャンネルかメッセージのみを対象とする
    if( this.isMatchTargetChannelId() || this.isMatchTargetMessage() ){
      const member = this.getMember();
      const roleObj = this.getIncludeRoleObj();
      if( member != null && roleObj != null ) {
        const role= member.guild.roles.cache.find(role => role.id === roleObj.id);
        if( role != null ) {
          member.roles.add(role).catch(err=>console.log(err));
        }
      }
    }
  }
  /**
   * 絵文字リアクションを行ったユーザーからロールを削除する
   */
  removeRole(): void {
    // 対象のチャンネルかメッセージのみを対象とする
    if( this.isMatchTargetChannelId() || this.isMatchTargetMessage() ){
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
}
