import React, { useRef, useState, useEffect } from 'react';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const inputRef = useRef(null);

  const examplePrompts = [
    "A majestic dragon flying over a crystal lake at sunset",
    "A modern city at night with skyscrapers, city lights, and a vibrant urban skyline",
    "A peaceful zen garden with cherry blossoms",
    "A space station orbiting a colorful nebula",
    "A cozy cabin in a snowy forest",
    "A photorealistic ocean scene with vivid turquoise water and golden waves"
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleGenerate = async () => {
    const prompt = inputRef.current.value.trim();
    if (!prompt) {
      alert("Please enter a description for the image");
      inputRef.current.focus();
      return;
    }

    setLoading(true);
    setStatusText("Creating your masterpiece...");

    try {
      const apiKey = process.env.REACT_APP_POLLINATIONS_API_KEY;
      const encodedPrompt = encodeURIComponent(prompt);
      const seed = Math.floor(Math.random() * 1000000);

      // Use gen.pollinations.ai which works reliably (image.pollinations.ai has Cloudflare issues)
      let newImageUrl = `https://gen.pollinations.ai/image/${encodedPrompt}?width=1024&height=1024&model=flux&seed=${seed}&nologo=true`;
      if (apiKey) {
        newImageUrl += `&key=${apiKey}`;
      }

      setStatusText("Generating image...");

      // Use fetch to get the image as a blob (better error handling than Image() element)
      const response = await fetch(newImageUrl);
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setImageUrl(blobUrl);
    } catch (err) {
      console.error('Error generating image:', err);
      alert("Failed to generate image. Please try again with a different prompt.");
    }
    setLoading(false);
    setStatusText("");
  };

  const handleClear = () => {
    setImageUrl("/");
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const handleExampleClick = (prompt) => {
    inputRef.current.value = prompt;
    handleGenerate();
  };

  const handleDownload = async () => {
    if (imageUrl === "/") return;
    try {
      const response = await fetch(imageUrl, { referrerPolicy: "no-referrer" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `artvantaai-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col items-center gap-10">
      {/* Header */}
      <div className="w-full flex flex-col items-center justify-center min-h-[170px] mb-2">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gradient glow text-center mb-4">
          ArtVanta <span className="text-pink-400">AI</span> Image Generator
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl text-center mt-2">
          Transform your imagination into reality with AI-powered image generation
        </p>
      </div>

      {/* Image Display Area */}
      <div className="relative w-full max-w-3xl card overflow-hidden">
        <div className="w-full aspect-square max-w-2xl mx-auto">
          {imageUrl === "/" ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 select-none space-y-4">
              <div className="text-6xl md:text-8xl animate-pulse">🎨</div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">Ready to Create</h3>
              <p className="text-center text-sm md:text-base max-w-sm text-gray-300">
                Enter a description below and watch your ideas come to life
              </p>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full h-full object-cover rounded-xl select-none"
              loading="eager"
              draggable={false}
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {loading && (
          <div className="absolute inset-0 flex flex-col justify-center items-center glass text-white z-20 rounded-xl">
            <div className="loader border-4 border-gray-300 border-t-pink-500 rounded-full w-16 h-16 mb-4"></div>
            <p className="text-lg font-semibold">{statusText || "Creating your masterpiece..."}</p>
          </div>
        )}

        {imageUrl !== "/" && !loading && (
          <button
            onClick={handleDownload}
            className="absolute top-4 right-4 btn-primary text-sm py-2 px-4"
          >
            Download Image
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            ref={inputRef}
            className="flex-grow input-field text-base md:text-lg"
            placeholder="Describe what you want to see..."
            disabled={loading}
            onKeyPress={handleKeyPress}
            maxLength={500}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
          <button
            onClick={handleClear}
            title="Clear"
            className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-3 font-bold transition-all duration-300 transform hover:scale-105"
          >
            ✕
          </button>
        </div>

        {/* Example Prompts */}
        <div className="flex flex-wrap gap-3 justify-center">
          {examplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleExampleClick(prompt)}
              className="btn-secondary text-xs md:text-sm truncate max-w-[200px] disabled:opacity-50"
              title={prompt}
              disabled={loading}
            >
              {prompt.length > 25 ? prompt.slice(0, 22) + '...' : prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;