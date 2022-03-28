import Grid from "./components/Grid";
import Navbar from "./components/Navbar";
import Keyboard from "./components/Keyboard";

function App() {
  return (
    <main className="bg-[#121213] max-h-screen min-h-screen text-white">
      <Navbar />
      <Grid />
      <Keyboard />
    </main>
  );
}

export default App;
