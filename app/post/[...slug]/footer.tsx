import Image from "next/image";
export default function Footer() {
  return (
    <footer className={"mt-12 mb-4"}>
      <a
        rel="license"
        href={"https://creativecommons.org/licenses/by-nc-sa/4.0/"}
      >
        <Image
          src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png"
          alt="知识共享许可协议"
          width={80}
          height={15}
          className={"mx-auto"}
        />
      </a>
    </footer>
  );
}
