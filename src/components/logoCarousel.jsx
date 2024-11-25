import bruning from "../assets/img/bruning-logo.png";
import fockink from "../assets/img/fockink-logo.png";
import tromink from "../assets/img/tromink-logo.png";
import cotripal from "../assets/img/cotripal-logo.png";
import kepler from "../assets/img/kepler-weber-logo.png";
import saur from "../assets/img/saur-logo.png";
import prefeitura from "../assets/img/prefeitura-panambi-logo.png";
import agregar from "../assets/img/agregar-logo.png";
import aci from "../assets/img/aci-logo.png";

const Carousel = () => {
  const images = [
    bruning,
    fockink,
    tromink,
    cotripal,
    kepler,
    saur,
    prefeitura,
    agregar,
    aci,
  ];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <style>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .slide-track {
          display: inline-flex;
          animation: 50s slide infinite linear;
        }
      `}</style>
      <div className="slide-track my-5">
        <div className="blur-sm h-full w-10 fixed"></div>
        {images.concat(images).map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="w-[15vw] h-auto object-contain relative"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
