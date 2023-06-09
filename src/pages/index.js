import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import scene from '../../public/scene.jpg';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import Spinner from '../../components/Spinner';
import Weather from '../../components/Weather';

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          setError('Please enter a valid city name.');
        })
        .finally(() => {
          setCity('');
          setLoading(false);
        });
    }, 200);
  };

  return (
    <div>
      <Head>
        <title>Weather - Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />

      {/* background image */}
      <Image src={scene} alt="" layout="fill" className="object-cover" />

      {/* search bar */}
      <div className="absolute flex justify-center items-center w-full">
        <form onSubmit={fetchWeather} className="flex justify-between border-2 border-white rounded-xl w-80 p-3 mt-8 z-10">
          <div>
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Search a City"
              autoComplete="off"
              className="bg-transparent text-white focus:outline-none"
            />
          </div>
          <button onClick={fetchWeather} className="text-white text-2xl">
            <BsSearch />
          </button>
        </form>
      </div>

      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : error ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 z-10">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        weather.main && <Weather data={weather} />
      )}
    </div>
  );
};

export default Home;