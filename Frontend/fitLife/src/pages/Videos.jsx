import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const videos = {
  chest: "https://www.youtube.com/embed/azYIRKLOGto?si=ks2CVKveJtICUffY",
  back: "https://www.youtube.com/embed/JSOX9XfQvoM?si=FoEIqXkWYBb4CxKb",
  legs: "https://www.youtube.com/embed/G18kehKXlRM?si=uG3c3TFIIn83aR31",
  shoulders: "https://www.youtube.com/embed/rqrLgJADtu4?si=g7Ggvg97jG_qReTj",
  arms: "https://www.youtube.com/embed/pS6q5feNh9M?si=B3Ah8vNKJl2oo1Iq",
};
function Videos() {
  const [selectedPart, setSelectedPart] = useState("chest");

  return (
    <div>
      <Navbar />
      <div className="min-h-screen text-white">
        <nav className="bg-black p-4">
          <ul className="flex justify-center space-x-4">
            {Object.keys(videos).map((part) => (
              <li
                key={part}
                className={`cursor-pointer hover:text-gray-400 ${
                  selectedPart === part ? "font-bold" : ""
                }`}
                onClick={() => setSelectedPart(part)}
              >
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-3xl font-bold mb-6">
            {selectedPart.charAt(0).toUpperCase() + selectedPart.slice(1)}{" "}
            Workout
          </h2>
          <div className="w-full sm:w-2/3 lg:w-1/2">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[300px]"
                src={videos[selectedPart]}
                title={`${selectedPart} workout video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Videos;
