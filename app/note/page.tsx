import { notes } from "./notes";

export default function Page() {
  return (
    <>
      <ul>
        {notes.map(({ text, link }, index) => (
          <li key={index}>
            <a href={link}>{text}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
