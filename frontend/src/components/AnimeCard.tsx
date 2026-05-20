import React from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../types/anime';

interface Props {
  anime: Anime;
}

const AnimeCard: React.FC<Props> = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition cursor-pointer shadow-lg">
        <img
          src={anime.posterUrl}
          alt={anime.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 truncate">{anime.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{anime.status}</p>
          <p className="text-sm text-gray-500">📅 {anime.releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
