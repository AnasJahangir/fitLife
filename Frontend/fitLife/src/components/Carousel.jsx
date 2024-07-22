import { Carousel } from "@material-tailwind/react";
import Image1 from "../assets/images/gym-1.jpeg";
import Image2 from "../assets/images/gym-2.jpeg";
import Image3 from "../assets/images/gym-3.jpg";

export function CarouselCustom() {
  return (
    <Carousel
      className=" w-[100%] h-[90vh] overflow-hidden"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img src={Image1} alt="image 1" className="h-full w-full object-cover" />
      <img
        src={Image2}
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src={Image3}
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
