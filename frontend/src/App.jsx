import { useState, useEffect, useRef } from "react";
import SideBar from "./components/global/SideBar";
import Dashboard from "./page/Dashboard";
import Settings from "./page/Settings";
import Schedule from "./page/Schedule";
import StudySet from "./page/StudySet";
import Analytics from "./page/Analytics";
import Authentication from "./page/Authentication";
import useAuth from "./hook/useAuth";
import { ThemeProvider } from "./context/ThemeContext";

/**
 * PageTransition
 * Wraps each page with a fade+slide animation whenever activePage changes.
 */
function PageTransition({ children, activePage }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [animating, setAnimating] = useState(false);
  const prevPage = useRef(activePage);

  useEffect(() => {
    if (prevPage.current === activePage) return;
    prevPage.current = activePage;

    // Fade out → swap content → fade in
    setAnimating(false);
    const t = setTimeout(() => {
      setDisplayChildren(children);
      setAnimating(true);
    }, 120);
    return () => clearTimeout(t);
  }, [activePage, children]);

  // On first render
  useEffect(() => {
    setDisplayChildren(children);
    setAnimating(true);
  }, []); // eslint-disable-line

  return (
    <div
      className={`flex flex-col flex-1 overflow-hidden transition-all duration-200 ease-out ${
        animating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ minHeight: 0 }}
    >
      {displayChildren}
    </div>
  );
}

function App() {
  const { user, login, logout } = useAuth();
  const [activePage, setActivePage] = useState("Dashboard");

  if (!user) {
    return (
      <ThemeProvider>
        <Authentication onLogin={login} />
      </ThemeProvider>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "Settings":
        return <Settings user={user} onLogout={logout} />;
      case "Schedule":
        return <Schedule />;
      case "Study Sets":
        return <StudySet />;
      case "Analytics":
        return <Analytics />;
      case "Dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden transition-colors duration-300">
        <SideBar
          user={user}
          onLogout={logout}
          activePage={activePage}
          onNavigate={setActivePage}
        />
        <PageTransition activePage={activePage}>
          {renderPage()}
        </PageTransition>
      </div>
    </ThemeProvider>
  );
}

export default App;