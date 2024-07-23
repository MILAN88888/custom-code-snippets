import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
(() => {
  const root = createRoot(
    document.getElementById("custom-code-snippets") as HTMLElement
  );

  if (!root) return;

  root.render(<App />);
})();
