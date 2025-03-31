import bruning from "/img/bruning-logo.png";
import fockink from "/img/fockink-logo.png";
import tromink from "/img/tromink-logo.png";
import cotripal from "/img/cotripal-logo.png";
import kepler from "/img/kepler-weber-logo.png";
import saur from "/img/saur-logo.png";
import prefeitura from "/img/prefeitura-panambi-logo.png";
import agregar from "/img/agregar-logo.png";
import aci from "/img/aci-logo.png";

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
      <div className="slide-track">
        <div className="blur-sm w-5 fixed"></div>
        {images.concat(images).map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="w-[10vw] h-auto object-contain relative"
          />
        ))}
      </div>
    </div>
  );
};
