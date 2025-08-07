import type { Content } from "./content.ts";

/**
 * 複数選択
 */
export type MultiSelect = string[];

/**
 * メディア
 */
export interface MediaField {
  url: string;
  alt?: string;
}

/**
 * コンテンツ参照
 */
export type Reference = Content;

/**
 * 繰り返し
 *
 * * 繰り返しは、フィールドの集合であるオブジェクトの配列で表現されます。
 */
export type Repeat = RepeatItem[];
interface RepeatItem {
  [key: string]:
    | string
    | boolean
    | MultiSelect
    | MediaField
    | Reference
    | unknown;
}

/**
 * 組み合わせ
 *
 * * 組み合わせは、フィールドセットのデータであるオブジェクトの配列で表現されます。 フィールドセット内のluidは指定したLUIDです。fieldsはフィールドセット内フィールドです。
 */
export type Combination = CombinationItem[];
interface CombinationItem {
  luid: string;
  fields: {
    [key: string]:
      | string
      | boolean
      | MultiSelect
      | MediaField
      | Reference
      | unknown;
  };
}

/**
 * フィールドセット（モデルに直接組み込んだ場合）
 */
export interface FieldSet {
  [key: string]:
    | string
    | boolean
    | MultiSelect
    | MediaField
    | Reference
    | unknown;
}
