import { Nilto } from "..";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
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
  </div>
`;

const apiKey = import.meta.env.VITE_NILTO_API_KEY;
const client = new Nilto(apiKey);

const contents = await client.getContents({ model: "blog_articles" });
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
