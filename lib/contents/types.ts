import type { Content } from "../models/mod.ts";

/**
 * コンテンツの配列を取得するパラメータ
 *
 * @see https://www.nilto.com/api#tag/Contents-GET-API/operation/get-contents
 */
export type GetContentsParams = {
  /**
   * データを取得するフィールドを指定します。カンマ区切りで複数指定できます。省略するとすべてのフィールドを取得します。
   * * Example: `select=_id,description`
   */
  select?: string;

  /**
   * 参照するコンテンツのオブジェクトを取得する深度を指定します。
   * * Default: `1`
   * * Example: `depth=3`
   */
  depth?: Depth;

  /**
   * 並べ替える基準とするフィールドのLUIDを指定します。カンマ区切りで複数指定できます。降順にするにはLUIDの先頭に`-`をつけます。
   * * Example: `order=pickup,-_title`
   */
  order?: string;

  /**
   * 取得する件数の上限を指定します。
   * * Default: `100`
   * * Example: `limit=10`
   */
  limit?: number;

  /**
   * 何件目から取得するかを指定します。
   * * Default: `0`
   * * Example: `offset=10`
   */
  offset?: number;

  /**
   * 取得対象とするモデルのLUIDを指定します。カンマ区切りで複数指定できます。省略するとすべてのモデルのコンテンツを取得対象とします。
   * * Example: `model=blog,news`
   */
  model?: string;

  /**
   * 取得したいコンテンツの言語を指定します。省略するとメイン言語の内容を取得します。
   * * Example: `lang=ja`
   */
  lang?: string;

  /**
   * サブスペース機能をご利用中にのみ有効なキーです。取得対象とするスペースLUIDを指定します。カンマ区切りで複数指定できます。親スペースのLUIDは`_parent`で固定です。
   * * Example: `space=_parent,sub_space_luid`
   */
  space?: string;

  /**
   * いずれかのテキストフィールドに指定した値が含まれるコンテンツを取得します。カンマ区切りでAND検索になります。 langパラメーターを指定している場合、その言語の内容と比較します。
   * * Example: `contains=keyword1,keyword2`
   */
  contains?: string;
} & FieldQueryParams;

/**
 * コンテンツの配列のレスポンス
 *
 * @see https://www.nilto.com/api#tag/Contents-GET-API/operation/get-contents
 */
export type GetContentsResponse = {
  /** 条件に合致した件数 */
  total: number;

  /** 何件目から取得したか */
  offset: number;

  /** 取得件数の上限 */
  limit: number;

  /** コンテンツの配列 */
  data: Content[];
};

/**
 * 動的なクエリ条件の定義
 * - `[format]` キーは Format 型（"html" | "text"）を使う
 * - その他のキーは string 型
 */
type FieldQueryParams =
  & Partial<Record<`${string}[eq]`, string>>
  & Partial<Record<`${string}[in]`, string>>
  & Partial<Record<`${string}[lt]`, string>>
  & Partial<Record<`${string}[lte]`, string>>
  & Partial<Record<`${string}[gt]`, string>>
  & Partial<Record<`${string}[gte]`, string>>
  & Partial<Record<`${string}[contains]`, string>>
  & Partial<Record<`${string}[has]`, string>>
  & Partial<Record<`${string}[format]`, Format>>;

/**
 * コンテンツのオブジェクトを取得する深度
 */
type Depth = 0 | 1 | 2 | 3;

/**
 * フレキシブルテキストのデータ形式
 */
type Format = "html" | "text";
