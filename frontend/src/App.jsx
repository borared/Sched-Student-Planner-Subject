import SideBar from "./components/global/SideBar";
import Dashboard from "./page/Dashboard";

function App() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <SideBar />
      <Dashboard />
    </div>
  );
}

export default App;