import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "../components/weatherCard";
import type { WeatherData } from "../types/weather";

const defaultNepaliCities = [
  "Butwal",
  "Pokhara",
  "Biratnagar",
  "Jhapa",
  "Baglung",
  "Kathmandu",
];

const Home = () => {
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);
  const [searchCity, setSearchCity] = useState("");
  const [searchedWeather, setSearchedWeather] = useState<WeatherData | null>(
    null
  );
  const apiKey = "cf107f47569c8e106ba1a59feec363e1";

  useEffect(() => {
    const fetchDefaultCities = async () => {
      const results = await Promise.all(
        defaultNepaliCities.map((city) =>
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city},NP&appid=${apiKey}&units=metric`
            )
            .then((res) => res.data)
            .catch(() => null)
        )
      );
      setWeatherList(results.filter(Boolean));
    };

    fetchDefaultCities();
  }, []);

  const handleSearch = async () => {
    if (!searchCity.trim()) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`
      );
      setSearchedWeather(res.data);
    } catch {
      alert("City not found!");
      setSearchedWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      {/* <h1 className="text-3xl font-bold text-center mb-6">Weather</h1> */}

      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Search any city..."
          className="px-4 py-2 rounded-l-md border border-gray-300 w-64 focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {searchedWeather && (
        <div className="mb-8 flex justify-center">
          <WeatherCard data={searchedWeather} />
        </div>
      )}

      {/* <h2 className="text-xl font-semibold mb-4 text-center">Weather</h2> */}
      <div className="flex flex-wrap justify-center gap-6">
        {weatherList.map((data, index) => (
          <WeatherCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Home;
