import SideBar from "./components/global/SideBar";
import Dashboard from "./page/Dashboard";
import Authentication from "./page/Authentication";

function App() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Authentication />
    </div>
  );
}

export default App;