import { Nilto } from "./mod.ts";

import type { Combination, MediaField, Reference, Repeat } from "./mod.ts";
import { assertEquals } from "@std/assert/equals";

import { mockFetchFromFile } from "./mock/mod.ts";

Deno.test("コンテンツの配列を取得できること", async () => {
  // モックデータを読み込み
  await mockFetchFromFile("contents.json");

  // 初期化
  const nilto = new Nilto("fake-api-key");

  // コンテンツ配列を取得
  const result = await nilto.getContents();
  const item = result.data[0];

  assertEquals(result.total, 34);
  assertEquals(result.offset, 20);
  assertEquals(result.limit, 10);
  assertEquals(result.data.length, 1);

  assertEquals(item._id, "1234567890");
  assertEquals(item._model, "news");
  assertEquals(item._title, "Hello World");

  // 日付フィールド（ISO8601）
  assertEquals(item._createdAt.toISOString(), "2023-01-23T04:50:00.000Z");
  assertEquals(item._updatedAt.toISOString(), "2023-01-23T04:50:00.000Z");
  assertEquals(item._publishedAt?.toISOString(), "2023-01-23T04:50:00.000Z");
  assertEquals(
    item._lastPublishedAt?.toISOString(),
    "2023-01-23T04:50:00.000Z",
  );
  assertEquals(
    (item.datetimeField as Date).toISOString(),
    "2023-01-23T04:50:00.000Z",
  );

  // その他のフィールド
  assertEquals(item._status, "published");
  assertEquals(item._space, "_parent");
  assertEquals(
    item.flexibletextField,
    "<div><h2>abcedf</h2><p>abcedf</p><ul><li>abcedf</li></ul></div>",
  );
  assertEquals(item.singlelineField, "foobar");
  assertEquals(item.multilineField, "foo\nbar");
  assertEquals(item.booleanField, true);
  assertEquals(item.singleselectField, "value1");

  // media_field
  const mediaField = item.mediaField as MediaField;
  assertEquals(
    mediaField.url,
    "https://cms-assets.nilto.com/spaces/1234567890/media/2345678901/_/abc.png",
  );
  assertEquals(mediaField.alt, "alternative text");

  // repeat_field
  const repeatField = item.repeatField as Repeat;
  assertEquals(repeatField.length, 2);
  assertEquals(repeatField[0].singlelineField, "foobar");
  assertEquals(repeatField[0].booleanField, true);
  assertEquals(repeatField[1].singlelineField, "foobarbaz");
  assertEquals(repeatField[1].booleanField, false);

  // combination_field
  const combinationField = item.combinationField as Combination;
  assertEquals(combinationField.length, 3);
  assertEquals(combinationField[0].luid, "block_a");
  assertEquals(combinationField[0].fields.multilineField, "foo\nbar");
  assertEquals(combinationField[0].fields.booleanField, true);

  assertEquals(combinationField[1].luid, "block_b");
  assertEquals(
    (combinationField[1].fields.datetimeField as Date).toISOString(),
    "2023-01-23T04:50:00.000Z",
  );
  assertEquals(
    (combinationField[1].fields.repeatField as unknown as Repeat)[0]
      .singlelineField as string,
    "foobar",
  );
  assertEquals(
    (combinationField[1].fields.repeatField as unknown as Repeat)[1]
      .singlelineField as string,
    "foobarbaz",
  );

  assertEquals(combinationField[2].luid, "block_a");
  assertEquals(combinationField[2].fields.multilineField, "foo\nbar\nbaz");
  assertEquals(combinationField[2].fields.booleanField, false);

  // reference_field
  const referenceField = item.referenceField as Reference;
  assertEquals(referenceField._id, "1234567890");
  assertEquals(referenceField._title, "Hello World2");
  assertEquals(
    referenceField._createdAt.toISOString(),
    "2023-01-23T04:50:00.000Z",
  );
  assertEquals(referenceField._status, "draft");
  assertEquals(referenceField.referenceField, "2345678901");

  // block1
  const block1 = item.block1 as {
    singlelineField: string;
    booleanField: boolean;
  };
  assertEquals(block1.singlelineField, "foobar");
  assertEquals(block1.booleanField, true);

  // block2
  const block2 = item.block2 as {
    multilineField: string;
    datetimeField: Date;
  };
  assertEquals(block2.multilineField, "foo\nbar");
  assertEquals(block2.datetimeField.toISOString(), "2023-01-23T04:50:00.000Z");
});

Deno.test("コンテンツを取得できること", async () => {
  // モックデータを読み込み
  await mockFetchFromFile("contents/1234567890.json");

  // 初期化
  const nilto = new Nilto("fake-api-key");

  // コンテンツを取得
  const item = await nilto.getContentById("1234567890");

  assertEquals(item._id, "1234567890");
  assertEquals(item._model, "news");
  assertEquals(item._title, "Hello World");

  // 日付フィールド（ISO8601）
  assertEquals(item._createdAt.toISOString(), "2023-01-23T04:50:00.000Z");
  assertEquals(item._updatedAt.toISOString(), "2023-01-23T04:50:00.000Z");
  assertEquals(item._publishedAt?.toISOString(), "2023-01-23T04:50:00.000Z");
  assertEquals(
    item._lastPublishedAt?.toISOString(),
    "2023-01-23T04:50:00.000Z",
  );
  assertEquals(
    (item.datetimeField as Date).toISOString(),
    "2023-01-23T04:50:00.000Z",
  );

  // その他のフィールド
  assertEquals(item._status, "published");
  assertEquals(item._space, "_parent");
  assertEquals(
    item.flexibletextField,
    "<div><h2>abcedf</h2><p>abcedf</p><ul><li>abcedf</li></ul></div>",
  );
  assertEquals(item.singlelineField, "foobar");
  assertEquals(item.multilineField, "foo\nbar");
  assertEquals(item.booleanField, true);
  assertEquals(item.singleselectField, "value1");

  // media_field
  const mediaField = item.mediaField as MediaField;
  assertEquals(
    mediaField.url,
    "https://cms-assets.nilto.com/spaces/1234567890/media/2345678901/_/abc.png",
  );
  assertEquals(mediaField.alt, "alternative text");

  // repeat_field
  const repeatField = item.repeatField as Repeat;
  assertEquals(repeatField.length, 2);
  assertEquals(repeatField[0].singlelineField, "foobar");
  assertEquals(repeatField[0].booleanField, true);
  assertEquals(repeatField[1].singlelineField, "foobarbaz");
  assertEquals(repeatField[1].booleanField, false);

  // combination_field
  const combinationField = item.combinationField as Combination;
  assertEquals(combinationField.length, 3);
  assertEquals(combinationField[0].luid, "block_a");
  assertEquals(combinationField[0].fields.multilineField, "foo\nbar");
  assertEquals(combinationField[0].fields.booleanField, true);

  assertEquals(combinationField[1].luid, "block_b");
  assertEquals(
    (combinationField[1].fields.datetimeField as Date).toISOString(),
    "2023-01-23T04:50:00.000Z",
  );
  assertEquals(
    (combinationField[1].fields.repeatField as unknown as Repeat)[0]
      .singlelineField as string,
    "foobar",
  );
  assertEquals(
    (combinationField[1].fields.repeatField as unknown as Repeat)[1]
      .singlelineField as string,
    "foobarbaz",
  );

  assertEquals(combinationField[2].luid, "block_a");
  assertEquals(combinationField[2].fields.multilineField, "foo\nbar\nbaz");
  assertEquals(combinationField[2].fields.booleanField, false);

  // reference_field
  const referenceField = item.referenceField as Reference;
  assertEquals(referenceField._id, "1234567890");
  assertEquals(referenceField._title, "Hello World2");
  assertEquals(
    referenceField._createdAt.toISOString(),
    "2023-01-23T04:50:00.000Z",
  );
  assertEquals(referenceField._status, "draft");
  assertEquals(referenceField.referenceField, "2345678901");

  // block1
  const block1 = item.block1 as {
    singlelineField: string;
    booleanField: boolean;
  };
  assertEquals(block1.singlelineField, "foobar");
  assertEquals(block1.booleanField, true);

  // block2
  const block2 = item.block2 as {
    multilineField: string;
    datetimeField: Date;
  };
  assertEquals(block2.multilineField, "foo\nbar");
  assertEquals(block2.datetimeField.toISOString(), "2023-01-23T04:50:00.000Z");
});
