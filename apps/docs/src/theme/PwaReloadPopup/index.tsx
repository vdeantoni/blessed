import type { Props } from "@theme/PwaReloadPopup";
import { type ReactNode } from "react";
import "./styles.css";

export default function PwaReloadPopup({ onReload }: Props): ReactNode {
  return (
    <div className="pwa-reload-popup">
      <div className="pwa-reload-popup__content">
        <p className="pwa-reload-popup__message">
          New content available. Click to reload.
        </p>
        <button
          type="button"
          className="pwa-reload-popup__button"
          onClick={onReload}
        >
          Reload
        </button>
      </div>
    </div>
  );
}
