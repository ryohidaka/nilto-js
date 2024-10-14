/**
 * コンテンツ一覧取得APIのリクエストパラメーター
 */
export type GetContentsParams = {
  select?: string;
  depth?: number;
  order?: string;
  limit?: number;
  offset?: number;
  model?: string;
  lang?: string;
  space?: string;
  contains?: string;
  /* 動的なフィールド*/
  [key: string]: any;
};

/**
 * コンテンツ一覧取得APIのレスポンス
 */
export type GetContentsResponse = {
  /* 条件に合致した件数 */
  total: number;
  /* 何件目から取得したか */
  offset: number;
  /* 取得件数の上限 */
  limit: number;
  /* コンテンツの配列 */
  data: Content[];
};

/**
 * コンテンツ情報
 */
export type Content = {
  /* コンテンツID */
  _id: string;
  /* モデルのLUID */
  _model: string;
  /* タイトル（先頭のフィールドを文字列化したもの） */
  _title: string;
  /* 作成日時（ISO 8601拡張形式） */
  _created_at: string;
  /* 更新日時（ISO 8601拡張形式） */
  _updated_at: string;
  /* 公開日時（ISO 8601拡張形式） */
  _published_at: string;
  /* ステータス */
  _status: ContentStatus;
  /* スペースのLUID（サブスペース機能利用中のスペースのみ）*/
  _space?: string;
  /* ユーザーが定義したフィールド*/
  [key: string]: any;
};

/**
 * ステータス
 */
type ContentStatus = "draft" | "published" | "published_draft";
