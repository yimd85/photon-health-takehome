import { Outlet } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <ChakraProvider>
      <div className="App">
        <Header />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </ChakraProvider>

  );
}

export default App;