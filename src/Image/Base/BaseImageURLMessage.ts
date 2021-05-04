import { Message } from 'discord.js';
import fetch from 'node-fetch';

/**
 * 反応するためのターゲットとなる単語の型
 */
type TargetMessageContentType = string | string[];
/**
 * データ取得用のAPIのURLの型
 */
type ApiEndPointType = string;
/**
 * ユーザーが入力した文字が、対象の文字とマッチするかどうかのマッチタイプ
 */
type MatchType = 'include' | 'exact' | 'startWith' | 'endWith';

export default class BaseImageURLMessage {

  /**
   * discordのメッセージオブジェクト
   */
  protected discordMessageObject: Message;
  /**
   * apiを叩くためのベースとなるURL
   */
  protected apiEndPoint: ApiEndPointType;
  /**
   * 反応するためのターゲットとなる単語
   */
  protected targetMessageContent: TargetMessageContentType;
  /**
   * どのようにターゲットとなる単語がマッチするかの挙動のオプション
   */
  protected matchType: MatchType;
  /**
   * 大文字や小文字を判別するかどうかのオプション
   */
  protected isCheckStringCase: boolean;
  /**
   * discordから送られてきたメッセージの内容
   */
  protected messageContent: string;

  constructor( msgObject: Message ) {
    this.discordMessageObject = msgObject;
    this.apiEndPoint = '';
    this.targetMessageContent = [];
    this.matchType = 'exact';
    this.isCheckStringCase = true;
    this.messageContent = this.discordMessageObject.content;
  }

  /**
   * メッセージのコンテンツが、指定された文字列 or 配列にマッチングするかを判別するメソッド
   * @param content discordのメッセージのコンテンツ
   */
  isMatch( content: string ) : boolean {

    const messageContent = this.isCheckStringCase ? content : content.toLowerCase();

    if( Array.isArray(this.targetMessageContent) ) {
      switch( this.matchType ) {
        case 'exact':
          return this.targetMessageContent.includes( messageContent );
        case 'include':
          return this.targetMessageContent.findIndex( content => content.indexOf( messageContent ) != -1 ) !== -1;
        case 'startWith':
          return this.targetMessageContent.findIndex( content => content.startsWith( messageContent )) !== -1;
        case 'endWith':
          return this.targetMessageContent.findIndex( content => content.endsWith( messageContent )) !== -1;
      }
    } else {
      switch( this.matchType ) {
        case 'exact':
          return this.targetMessageContent === messageContent;
        case 'include':
          return this.targetMessageContent.indexOf(messageContent) != -1;
        case 'startWith':
          return messageContent.startsWith(this.targetMessageContent);
        case 'endWith':
          return messageContent.endsWith(this.targetMessageContent);
      }
    }
  }
  /**
   * 初期化関数
   */
  init( apiUrl: ApiEndPointType , targetMessageContent: TargetMessageContentType, matchType: MatchType = 'exact'): this {
    this.setApiEndPoint(apiUrl);
    this.setTargetMessage(targetMessageContent);
    this.setMatchType(matchType);
    return this;
  }
  async run(): Promise<void> {
    await this.sendDiscordBotMessage();
  }
  /**
   * 文字のマッチするタイプを変更するメソッド
   */
  setMatchType(matchType: MatchType): void {
    this.matchType = matchType;
  }
  /**
   * データを取得するAPIのURLをセットするメソッド
   * @param apiUrl
   * TODO クエリーを含めたURLもいけるようにしたいです
   */
  setApiEndPoint(apiUrl: ApiEndPointType): void {
    this.apiEndPoint = apiUrl;
  }
  /**
   * ボットが反応する対象となる文字をセットするメソッド
   * @param targetMessageContent
   */
  setTargetMessage(targetMessageContent: TargetMessageContentType): void {
    if( typeof targetMessageContent === 'string' ) {
      this.targetMessageContent = [targetMessageContent]
    } else {
      this.targetMessageContent = targetMessageContent
    }
  }
  /**
   * ボットが反応する対象となる文字を追加するメソッド
   * @param targetMessageContent
   */
  addTargetMessage(targetMessageContent: TargetMessageContentType): void {
    if( typeof targetMessageContent === 'string' ) {
      this.targetMessageContent = [...this.targetMessageContent, targetMessageContent];
    } else {
      this.targetMessageContent = [...this.targetMessageContent, ...targetMessageContent];
    }
  }
  /**
   * ボットが反応する対象となる文字をすべて削除するメソッド
   */
  deleteTargetMessage(): void {
    this.targetMessageContent = [];
  }
  /**
   * 画像のURLを取得するためのメソッド (基本的には、継承してオーバーライド推奨)
   */
  async getImageURL(): Promise<string> {
    const response = await fetch(this.apiEndPoint);
    const resultData = await response.json() as string;
    return resultData
  }
  /**
   * ボットがテキストメッセージをチャンネルに送信するメソッド
   * @param messageContent
   */
  async sendDiscordBotMessage(messageContent: string = this.messageContent): Promise<void> {
    if (this.isMatch(messageContent)) {
      const imageUrl = await this.getImageURL();
      this.discordMessageObject.channel
      .send(imageUrl)
      .catch((err) => {
        console.log(err);
      });
    }
  }
}

