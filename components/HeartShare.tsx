import { useState } from "react";
import { motion } from "framer-motion";

// Definición de tipos para las props
interface HeartShareProps {
  onLike: (liked: boolean) => void;
  likeCount: number;
  onShare: (shared: boolean) => void;
  shareCount: number;
}

const HeartShare: React.FC<HeartShareProps> = ({
  onLike,
  likeCount,
  onShare,
  shareCount,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  const handleLikeClick = () => {
    setLiked((prevLiked) => {
      const newLiked = !prevLiked;
      onLike(newLiked);
      return newLiked;
    });
  };

  const handleShareClick = () => {
    setShared((prevShared) => {
      const newShared = !prevShared;
      onShare(newShared);
      return newShared;
    });
  };

  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-2">
      {/* Icono de Me gusta */}
      <motion.div
        className={`cursor-pointer ${liked ? "text-red-500" : "text-red-500"}`}
        onClick={handleLikeClick}
        animate={{ scale: liked ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </motion.div>
      <span className="text-lg font-semibold">{likeCount}</span>

      {/* Icono de Compartir */}
      <motion.div
        className={`cursor-pointer ${
          shared ? "text-green-400" : "text-green-400"
        }`}
        onClick={handleShareClick}
        animate={{ scale: shared ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      </motion.div>
      <span className="text-lg font-semibold">{shareCount}</span>
    </div>
  );
};

export default HeartShare;
