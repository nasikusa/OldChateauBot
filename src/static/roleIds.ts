/**
 * 絵文字でのロール付与と削除のためのオブジェクト型
 */
export type LocalRoleDataType = {
  name: string;
  id: string;
  gameName: string;
  type: string;
  targetEmoji: string;
};

/**
 * 絵文字でのロール付与と削除のためのオブジェクト配列
 */
export const localRoles: LocalRoleDataType[] = [
  {
    name: 'amongus',
    id: '796261794242232321',
    gameName: 'Among Us',
    type: 'game',
    targetEmoji: '🚀',
  },
  {
    name: 'mtg',
    id: '797111608795070554',
    gameName: 'マジック:ザ・ギャザリング',
    type: 'game',
    targetEmoji: '🧙',
  },
  {
    name: 'sky',
    id: '799963782641745930',
    gameName: 'Sky 星を紡ぐ子どもたち',
    type: 'game',
    targetEmoji: '☁',
  },
  {
    name: 'unrailed',
    id: '803273537912700939',
    gameName: 'Unrailed!',
    type: 'game',
    targetEmoji: '🚃',
  },
  {
    name: 'ごっふぃ',
    id: '813985983916670998',
    gameName: 'ゴッドフィールド',
    type: 'game',
    targetEmoji: '⚔️',
  },
  {
    name: 'trine',
    id: '838281836647415818',
    gameName: 'Trine',
    type: 'game',
    targetEmoji: '👪',
  },
  {
    name: 'Overcooked!',
    id: '838281961025306705',
    gameName: 'Overcooked!',
    type: 'game',
    targetEmoji: '🍳',
  },
];
