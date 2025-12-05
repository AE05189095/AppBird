import React from "react";
import RecordingsList from "./components/RecordingsList";
import "./styles/App.css";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-title">AppBird</div>
        <div className="app-sub">Grabaciones de aves · Guatemala</div>
      </header>

      <main className="app-main">
        <RecordingsList />
      </main>

      <footer className="app-footer">Datos: Xeno-Canto · API pública</footer>
    </div>
  );
}
