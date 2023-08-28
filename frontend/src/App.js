import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProto from "./protoGenerator/createProto";
import ParseProto from "./protoParser/parseProto";
import Home from "./home";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-proto" element={<CreateProto />} />
          <Route path="/parse-proto" element={<ParseProto />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
