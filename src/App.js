import './App.css';
import { GlobalProvider } from './contexts/GlobalContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifest from './components/Manifest';
import Roadmap from './components/Roadmap';
import AdhesionForm from './components/AdhesionForm';
import Footer from './components/Footer';

function App() {
  return (
    <GlobalProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
            <Manifest />
            <Roadmap />
            <AdhesionForm />
        </main>
        <Footer />
      </div>
    </GlobalProvider>
  );
}

export default App;