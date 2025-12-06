import React, { useState } from "react";
import RecordingsList from "./components/RecordingsList";
import Home from "./components/Home";
import "./styles/App.css";

export default function App() {
  const [route, setRoute] = useState('home');

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-title">AppBird</div>
          <div className="app-sub">Grabaciones de aves · Guatemala</div>
        </div>
      </header>

      <main className="app-main">
        {route === 'home' ? (
          <Home onLoad={() => setRoute('list')} />
        ) : (
          <RecordingsList onBack={() => setRoute('home')} />
        )}
      </main>

      <footer className="app-footer">Datos: Xeno-Canto · API pública</footer>
    </div>
  );
}
