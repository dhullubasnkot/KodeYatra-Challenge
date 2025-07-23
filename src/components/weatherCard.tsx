import type { WeatherData } from "../types/weather";

interface Props {
  data: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center w-64">
      <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
      <img
        src={iconUrl}
        alt={data.weather[0].description}
        className="mx-auto"
      />
      <p className="text-3xl font-bold">{data.main.temp}°C</p>
      <p className="capitalize">{data.weather[0].description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Min: {data.main.temp_min}°C | Max: {data.main.temp_max}°C
      </p>
      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <span>💧 {data.main.humidity}%</span>
        <span>🌬️ {data.wind.speed} km/h</span>
      </div>
    </div>
  );
};

export default WeatherCard;
