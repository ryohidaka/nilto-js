export interface SystemProperty {
  /**
   * コンテンツを一位に識別するための一意なID
   */
  _id: string;

  /**
   * コンテンツが属するモデルのLUID。
   */
  _model: string;

  /**
   * コンテンツのタイトル。モデルに設定された「タイトル用フィールド」の値が自動的に反映されます。
   */
  _title: string;

  /**
   * コンテンツが作成された日時。日時は ISO 8601 形式のUTC（協定世界時）で表現されます。
   */
  _createdAt: Date;

  /**
   * コンテンツが最後に更新された日時。日時は ISO 8601 形式のUTCで表現されます。
   */
  _updatedAt: Date;

  /**
   * コンテンツがはじめて公開された日時。下書き状態の場合は null になることがあります。日時は ISO 8601 形式のUTCで表現されます。
   */
  _publishedAt?: Date | null;

  /**
   * コンテンツがはじめて公開された日時。下書き状態の場合は null になることがあります。日時は ISO 8601 形式のUTCで表現されます。
   */
  _lastPublishedAt?: Date | null;

  /**
   * コンテンツの公開状態を示します。
   */
  _status: Status;

  /**
   * サブスペース機能が有効な場合に、コンテンツが所属するスペースのLUIDを示します。
   */
  _space?: string;
}

/**
 * コンテンツの公開状態
 *
 * * `draft`: 下書きデータのみ
 * * `published`: 公開データのみ
 * * `published_draft`: 公開中かつ下書きデータもある
 */
type Status = "draft" | "published" | "published_draft";
