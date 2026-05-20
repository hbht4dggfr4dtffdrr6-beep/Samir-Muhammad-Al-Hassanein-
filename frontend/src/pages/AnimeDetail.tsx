import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeDetail } from '../services/animeService';
import { Anime } from '../types/anime';

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getAnimeDetail(id);
        setAnime(data);
      } catch (err) {
        setError('Failed to fetch anime details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-400">{error || 'Anime not found'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-8">
        <img
          src={anime.posterUrl}
          alt={anime.title}
          className="w-64 h-auto rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
          <p className="text-gray-300 mb-4">{anime.description}</p>
          <div className="space-y-2 text-gray-400">
            <p><strong>Status:</strong> {anime.status}</p>
            <p><strong>Episodes:</strong> {anime.episodes || 'Unknown'}</p>
            <p><strong>Release Date:</strong> {anime.releaseDate}</p>
            <p><strong>Genres:</strong> {anime.genres?.join(', ') || 'N/A'}</p>
          </div>
          <button className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded font-semibold transition">
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
