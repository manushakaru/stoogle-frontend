import { writable } from "svelte/store";

export const theme = writable("light");

if (typeof window !== "undefined") {
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  theme.subscribe((currentTheme) => {
    document.body.style.backgroundColor =
      currentTheme === "light" ? "#ffffff" : "#1A2E3C";
    localStorage.setItem("theme", currentTheme);
  });

  theme.set(savedTheme);
}
