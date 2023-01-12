//
// import { useEffect } from "react";
//
// export default function ThemeButton({
//   theme,
//   setTheme,
// }: {
//   theme: Theme;
//   setTheme: Function;
// }) {
//   function toggleTheme() {
//     if (theme === Theme.System) {
//       localStorage.theme = Theme.Light;
//       setTheme(Theme.Light);
//     } else if (theme === Theme.Light) {
//       localStorage.theme = Theme.Dark;
//       setTheme(Theme.Dark);
//     } else {
//       localStorage.removeItem("theme");
//       setTheme(Theme.System);
//     }
//   }
//   useEffect(() => {
//     // On page load or when changing themes, best to add inline in `head` to avoid FOUC
//     if (localStorage.theme === Theme.Light) {
//       setTheme(Theme.Light);
//     } else if (localStorage.theme === Theme.Dark) {
//       setTheme(Theme.Dark);
//     } else {
//       setTheme(Theme.System);
//     }
//   }, []);
//
//   function showIcon() {
//     if (theme === Theme.System) {
//       return "s";
//     } else if (theme === Theme.Light) {
//       return "l";
//     } else {
//       return "d";
//     }
//   }
//
//   return <button onClick={() => toggleTheme()}>{showIcon()}</button>;
// }
export default function ThemeButton() {
  return <div></div>;
}
