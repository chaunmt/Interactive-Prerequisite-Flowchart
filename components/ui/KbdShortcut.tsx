"use client";

import { useEffect, useState } from "react";

type KeyCode = {
  icon?: string; // macOS
  text?: string; // macOS
  default: string; // fallback + everywhere else
};

function isKeyCode(k: any): k is KeyCode {
  return k?.default;
}

export const Cmd: KeyCode = { icon: "⌘", text: "Cmd", default: "Ctrl" };
export const Opt: KeyCode = { icon: "⌥", text: "Opt", default: "Alt" };
export const Shift: KeyCode = { icon: "⇧", default: "Shift" };
// macOS Control modifier is rarely used for shortcuts
// export const Ctrl: KeyCode = { icon: "⌃", text: "Ctrl", default: "Ctrl" };

export default function KbdShortcut({
  combination,
  textual,
}: {
  combination: (KeyCode | string)[];
  textual?: boolean;
}) {
  const [macOS, setMacOS] = useState(false);
  useEffect(() => {
    const mac = navigator.userAgent.indexOf("Mac") !== -1;
    setMacOS(mac);
  }, []);

  const combo = combination.map((k) => (isKeyCode(k) ? k : { default: k }));
  const keycombo = combo
    .map((k) => (macOS && (textual ? k.text : k.icon)) || k.default)
    .join(!macOS || textual ? "+" : "");
  // not sure why but there's some weird wrapping behavior in the header search button if we use spaces

  return (
    <span className="hidden h-5 place-content-center rounded bg-white px-1 text-xs text-gray-700 shadow shadow-black/5 sm:block dark:bg-zinc-900 dark:text-zinc-200">
      {keycombo}
    </span>
  );
}
