import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App bg-gradient-custom min-h-screen">
      <Navbar />
      <main>
        <section id="home" className="section">
          <ImageGenerator />
        </section>
        <section id="gallery" className="section bg-black bg-opacity-10">
          <Gallery />
        </section>
        <section id="about" className="section bg-white bg-opacity-5">
          <About />
        </section>
        <section id="contact" className="section bg-black bg-opacity-10">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;