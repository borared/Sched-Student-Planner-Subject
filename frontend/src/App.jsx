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
import { Menu, X } from "lucide-react";

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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {/* Desktop sidebar */}
        <SideBar
          user={user}
          onLogout={logout}
          activePage={activePage}
          onNavigate={setActivePage}
          className="hidden lg:flex"
        />

        {/* Mobile / Tablet Hamburger Button */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-40 w-10 h-10 rounded-full bg-white text-gray-700 shadow-md flex items-center justify-center"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Mobile / Tablet Sidebar Drawer */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
            isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            className="absolute inset-0 bg-black/35"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close navigation menu"
          />

          <div
            className={`absolute top-0 left-0 h-full transition-transform duration-200 ease-out ${
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="relative h-full">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
              <SideBar
                user={user}
                onLogout={logout}
                activePage={activePage}
                onNavigate={setActivePage}
                onItemSelect={() => setIsMobileSidebarOpen(false)}
                className="w-72 h-full shadow-xl"
              />
            </div>
          </div>
        </div>

        <PageTransition activePage={activePage}>
          {renderPage()}
        </PageTransition>
      </div>
    </ThemeProvider>
  );
}

export default App;