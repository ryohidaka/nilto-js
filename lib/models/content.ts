import type {
  Combination,
  FieldSet,
  MediaField,
  MultiSelect,
  Reference,
  Repeat,
} from "./field.ts";
import type { SystemProperty } from "./system.ts";

/**
 * コンテンツ情報
 */
export interface Content extends SystemProperty {
  [key: string]:
    | string
    | boolean
    | MultiSelect
    | MediaField
    | Reference
    | Repeat
    | Combination
    | FieldSet
    | unknown;
}
