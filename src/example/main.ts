import { Nilto } from "..";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div></div>
`;

const apiKey = import.meta.env.VITE_NILTO_API_KEY;

const client = new Nilto(apiKey);
