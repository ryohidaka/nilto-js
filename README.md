# nilto-js

[![NPM Version](https://img.shields.io/npm/v/nilto?logo=npm)](https://www.npmjs.com/package/nilto)
![build](https://github.com/ryohidaka/nilto-js/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/ryohidaka/nilto-js/graph/badge.svg?token=RHP9TB2F51)](https://codecov.io/gh/ryohidaka/nilto-js)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

非公式 JavaScript SDK クライアント for [NILTO](https://www.nilto.com/ja).

## Installation

### Node.js

```sh
npm i nilto
```

### Deno

#### Add Package

```sh
deno add jsr:@hidaka/nilto
```

#### Import symbol

```sh
import * as nilto from "@hidaka/nilto";
```

## Functions

### `getContents(params?: GetContentsParams): Promise<GetContentsResponse>`

指定した条件に合うコンテンツの配列を取得します。

#### Parameters

| Parameter | Type                | Description                |
| --------- | ------------------- | -------------------------- |
| `params`  | `GetContentsParams` | コンテンツの絞り込み条件。 |

#### Returns

| Type                           | Description                                                        |
| ------------------------------ | ------------------------------------------------------------------ |
| `Promise<GetContentsResponse>` | コンテンツの配列および関連メタデータを含むレスポンスオブジェクト。 |

#### Usage Example

##### Node.js

```ts ignore
import { Nilto } from "nilto";

const nilto = new Nilto("your-api-key");

const params: GetContentsParams = {
  model: "blog_articles",
  limit: 10,
  offset: 0,
};

const res = await nilto.getContents(params);

console.log(`Total: ${res.total}`);
console.log(`Offset: ${res.offset}`);
console.log(`Limit: ${res.limit}`);
console.table(res.contents);
```

##### Deno

```ts
import { type GetContentsParams, Nilto } from "@hidaka/nilto";

const nilto = new Nilto("your-api-key");

const params: GetContentsParams = {
  model: "blog_articles",
  limit: 10,
  offset: 0,
};

const res = await nilto.getContents(params);

console.log(`Total: ${res.total}`);
console.log(`Offset: ${res.offset}`);
console.log(`Limit: ${res.limit}`);
console.table(res.data);
```

### `getContentById(id: string): Promise<Content>`

指定した ID のコンテンツを取得します。

#### Parameters

| Parameter | Type     | Description               |
| --------- | -------- | ------------------------- |
| `id`      | `string` | 取得するコンテンツの ID。 |

#### Returns

| Type               | Description                                        |
| ------------------ | -------------------------------------------------- |
| `Promise<Content>` | 指定されたコンテンツ ID に対応するコンテンツデータ |

#### Usage Example

##### Node.js

```ts ignore
import { Nilto } from "nilto";

const nilto = new Nilto("your-api-key");

const id = "12345";
const content = await nilto.getContentById(id);

console.log(content);
```

##### Deno

```ts
import { Nilto } from "@hidaka/nilto";

const nilto = new Nilto("your-api-key");

const id = "12345";
const content = await nilto.getContentById(id);

console.log(content);
```

## Link

- [NILTO (ニルト) - チームの理想を実現するヘッドレス CMS](https://www.nilto.com/ja)
- [NILTO Developer API リファレンス](https://www.nilto.com/api)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.
