import SideBar from "./components/global/SideBar";
import Dashboard from "./page/Dashboard";
import Authentication from "./page/Authentication";

import useAuth from "./hook/useAuth";

function App() {
  const { user, login, logout } = useAuth();

  if (!user) {
    return <Authentication onLogin={login} />;
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <SideBar user={user} onLogout={logout} />
      <Dashboard />
    </div>
  );
}

export default App;