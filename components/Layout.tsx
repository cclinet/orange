import Head from "next/head";
import Header from "./Header";
import FooterNav from "./FooterNav";
export default function Layout({ children, theme, setTheme }: any) {
  return (
    <>
      <Head>
        <title>Orange</title>
        <meta name="description" content="orange" />
      </Head>
      <div className={`dark:bg-gray-400 dark:text-white min-h-screen`}>
        <div className={`mx-auto flex flex-col max-w-xl`}>
          <Header theme={theme} setTheme={setTheme} />
          <main className={`mt-32 px-4 sm:px-6 lg:px-8`}>{children}</main>
          {/*<FooterNav />*/}
        </div>
      </div>
    </>
  );
}
