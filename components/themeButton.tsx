import { Theme } from "./Header";

export default function ThemeButton({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: Function;
}) {
  const themes = [
    { mode: Theme.Light },
    { mode: Theme.Dark },
    { mode: Theme.System },
  ];

  function toggleTheme() {
    if (theme === Theme.System) {
      localStorage.theme = Theme.Light;
      setTheme(Theme.Light);
    } else if (theme === Theme.Light) {
      localStorage.theme = Theme.Dark;
      setTheme(Theme.Dark);
    } else {
      localStorage.removeItem("theme");
      setTheme(Theme.System);
    }
  }

  function showIcon() {
    if (theme === Theme.System) {
      return (
        's'
      );
    } else if (theme === Theme.Light) {
      return "l";
    } else {
      return "d";
    }
  }

  return <button onClick={() => toggleTheme()}>{showIcon()}</button>;
}
