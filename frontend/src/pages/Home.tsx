import React, { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import { getUpcomingAnime } from '../services/animeService';
import { Anime } from '../types/anime';

const Home: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingAnime = async () => {
      try {
        setLoading(true);
        const data = await getUpcomingAnime();
        setAnimeList(data);
      } catch (err) {
        setError('Failed to fetch anime data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAnime();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-400">Loading upcoming anime...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upcoming Anime</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Home;
