import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import ImageGenerator from './Components/ImageGenerator/ImageGenerator';

function App() {
  return (
    <div className="App bg-gradient-custom min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ImageGenerator />
      </div>
    </div>
  );
}

export default App;
