import { Nilto } from "..";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <section>
      <h3>一覧表示</h3>
      <table id="articles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>CreatedAt</th>
            <th>PublishedAt</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>

    <section>
      <h3>詳細表示</h3>
      <p>
        <span>ID: </span>
        <span id="content-id"></span>
      </p>
       <p>
        <span>Title: </span>
        <span id="content-title"></span>
      </p>
  </div>
`;

const apiKey = import.meta.env.VITE_NILTO_API_KEY;
const client = new Nilto(apiKey);

/**
 * コンテンツ一覧取得
 */
const model = import.meta.env.VITE_SAMPLE_MODEL;
const contents = await client.getContents({ model });
const tableBody = document.querySelector<HTMLTableSectionElement>(
  "#articles-table tbody",
);

// 汎用的なセル生成関数
const createCell = (content: string) => {
  const cell = document.createElement("td");
  cell.textContent = content;
  return cell;
};

// テーブルに行を追加
contents.data.forEach(({ _id, title, _created_at, _published_at, _status }) => {
  const row = document.createElement("tr");
  const cells = [
    createCell(_id),
    createCell(title),
    createCell(new Date(_created_at).toLocaleDateString()),
    createCell(new Date(_published_at).toLocaleDateString()),
    createCell(_status),
  ];

  cells.forEach((cell) => row.appendChild(cell));
  tableBody?.appendChild(row);
});

/**
 * コンテンツ詳細取得
 */
const contentId = import.meta.env.VITE_SAMPLE_CONTENT_ID;
const content = await client.getContentsID(contentId);

document.querySelector<HTMLSpanElement>("#content-id")!.textContent =
  content._id;
document.querySelector<HTMLSpanElement>("#content-title")!.textContent =
  content.title;
