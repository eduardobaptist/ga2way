import bruning from "/public/img/bruning-logo.png";
import fockink from "/public/img/fockink-logo.png";
import tromink from "/public/img/tromink-logo.png";
import cotripal from "/public/img/cotripal-logo.png";
import kepler from "/public/img/kepler-weber-logo.png";
import saur from "/public/img/saur-logo.png";
import prefeitura from "/public/img/prefeitura-panambi-logo.png";
import agregar from "/public/img/agregar-logo.png";
import aci from "/public/img/aci-logo.png";

export const LogoCarousel = () => {
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
