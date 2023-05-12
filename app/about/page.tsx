export default function Page() {
  return (
    <div
      className={"flex flex-col gap-y-8 mt-20 tracking-wide leading-relaxed"}
    >
      <section>
        <h2 className={"text-2xl mb-4"}>About Me</h2>
        <p>
          我是cclin，一名算法工程师，主要做推荐系统相关的工作，NLP和CV的工作偶尔也会有所涉猎。
          日常工作中用的最多的语言是 Python 与 C++，偶尔也会写一点前端的代码
        </p>
        <p>
          可以通过我的邮箱{" "}
          <a href={"mailto:cclinet@outlook.com"} className={"text-slate-600"}>
            cclinet@outlook.com
          </a>{" "}
          随时联系我
        </p>
      </section>

      <section>
        <h2 className={"text-2xl mb-4"}>About This Website</h2>
        <p>
          网站是由{" "}
          <a href={"https://nextjs.org/"} className={"text-slate-500"}>
            Next.js
          </a>{" "}
          写成并部署在{" "}
          <a href={"https://vercel.com/"} className={"text-slate-500"}>
            Vercel
          </a>{" "}
          上， 文件则存储在了
          <del>
            {" "}
            <a href={"https://planetscale.com"} className={"text-slate-500"}>
              PlanetScale
            </a>{" "}
          </del>{" "}
          Vercel 上， 使用了{" "}
          <a href={"https://www.cloudflare.com"} className={"text-slate-500"}>
            Cloudflare
          </a>{" "}
          的 CDN，总而言之就是白嫖。。。
        </p>
      </section>

      <section>
        <h2 className={"text-2xl mb-4"}>Friends</h2>
        <p>这个人目前还没有朋友，欢迎友链,发我邮箱就好</p>
      </section>
    </div>
  );
}
