/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, ChangeEvent, MouseEvent } from "react";
import HeartShare from "./HeartShare";

// Definición de tipos para las fotos
type Photo = string;

const initialPhotos: Photo[] = [
  "https://img.freepik.com/foto-gratis/cascada-erawan-tailandia-hermosa-cascada-piscina-esmeralda-naturaleza_335224-776.jpg?t=st=1722998043~exp=1723001643~hmac=9b5eada3658729236e0ab2ae24801c21fbbb1685973be559efcff9d88e196945&w=1800",
  "https://img.freepik.com/foto-gratis/disparo-vertical-pasaje-madera-sobre-pequeno-lago-reflectante-cordillera-horizonte_181624-37099.jpg?t=st=1722998069~exp=1723001669~hmac=9e18133e2c3bd8057469ddff0a1a986449b44099f7d467d6a57a73672636e0a9&w=740",
  "https://img.freepik.com/foto-gratis/disparo-vertical-carretera-magnificas-montanas-cielo-azul-capturado-california_181624-44891.jpg?t=st=1722997460~exp=1723001060~hmac=64ceee8ff00ff1eb3fe6debd8513637d2f0d09ccb406c66ba7c34f2116509e9a&w=740",
  "https://img.freepik.com/foto-gratis/chica-morena-sonriente-posando-abrigo_23-2148136001.jpg?t=st=1722998136~exp=1723001736~hmac=a238a0bf3940917463c3143c80dbee4a2cd1dc99eae92591ca4c9eb441a19514&w=826",
  "https://img.freepik.com/foto-gratis/retratos-adolescente-feliz-aislado_23-2149158271.jpg?t=st=1722998161~exp=1723001761~hmac=6435dff641b8fafc042f9b16c6f4213b33b68b4a7bf53c05707a2fe581c308bd&w=740",
  "https://img.freepik.com/foto-gratis/nina-artista-que-busca-inspiracion-alrededores-mostrando-marcos-gestos-mirando-traves-forma-lente-camara-sonriendo-ampliamente-pie-fondo-blanco-entusiasta_176420-50615.jpg?t=st=1722998206~exp=1723001806~hmac=d043c1e1b48dc12606b7d41741823a46c53101ad3c9e9c4d3bfd11eabf2faf31&w=1800",
  "https://img.freepik.com/foto-gratis/equipo-celebrando-victoria-copa-plata_23-2149479300.jpg?t=st=1722998288~exp=1723001888~hmac=86e8526bea817d98a8bf6583b77b7b98296913e2704b1c29327bdf57f787ec06&w=740",
  "https://img.freepik.com/foto-gratis/atleta-masculino-sosteniendo-medalla_23-2148990963.jpg?t=st=1722998308~exp=1723001908~hmac=9b18f6952b4cb4ead0ac4ca00787075fc61179fce41582da0f1ecb515226ae5b&w=1800",
];

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [likes, setLikes] = useState<number[]>(
    new Array(initialPhotos.length).fill(0)
  );
  const [shares, setShares] = useState<number[]>(
    new Array(initialPhotos.length).fill(0)
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setPhotos([...photos, reader.result as string]);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = (e: MouseEvent<HTMLDivElement>) => {
    fileInputRef.current?.click();
  };

  const handleLike = (index: number) => {
    setLikes((prevLikes) =>
      prevLikes.map((likeCount, i) => (i === index ? likeCount + 1 : likeCount))
    );
  };

  const handleShare = (index: number) => {
    setShares((prevShares) =>
      prevShares.map((shareCount, i) =>
        i === index ? shareCount + 1 : shareCount
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Captura momentos especiales y compartelos en esta gran comunidad.
      </h2>
      <div
        className="w-24 h-24 flex items-center justify-center cursor-pointer mb-4 rounded-md border-blue-500 border-dashed border-2"
        onClick={handleUploadClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(59 130 246)"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative w-[90%] h-[430px] bg-gray-200 flex items-center justify-center rounded-md"
          >
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="object-cover h-full w-full rounded-md"
            />
            <HeartShare
              onLike={() => handleLike(index)}
              likeCount={likes[index]}
              onShare={() => handleShare(index)}
              shareCount={shares[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
