import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
