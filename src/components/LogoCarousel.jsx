import bruning from "/img/carousel/bruning.webp";
import fockink from "/img/carousel/fockink.webp";
import tromink from "/img/carousel/tromink.webp";
import cotripal from "/img/carousel/cotripal.webp";
import kw from "/img/carousel/kw.webp";
import saur from "/img/carousel/saur.webp";
import prefeitura from "/img/carousel/prefeitura.webp";
import aci from "/img/carousel/aci.webp";
import _3tentos from "/img/carousel/3tentos.webp";

export const LogoCarousel = () => {
  const images = [
    bruning,
    fockink,
    tromink,
    cotripal,
    kw,
    saur,
    prefeitura,
    aci,
    _3tentos
  ];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <style>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .slide-track {
          display: inline-flex;
          animation: 60s slide infinite linear;
          gap: clamp(2rem, 6vw, 10rem);
        }
      `}</style>
      <div className="slide-track my-3">
        {images.concat(images).concat(images).concat(images).map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="w-[10vw] min-w-[150px] h-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
};