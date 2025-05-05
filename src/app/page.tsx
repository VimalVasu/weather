// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const city = "Manhattan";
    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || `Status ${res.status}`);
        }
        return res.json() as Promise<WeatherData>;
      })
      .then((data) => setWeather(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Loading Manhattan’s weather…</p>;
  if (error) return <p className="p-8 text-red-600">Error: {error}</p>;

  return (
    <main className="min-h-screen p-8 bg-blue-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Manhattan Weather</h1>
      {weather && (
        <div className="p-6 bg-white rounded shadow text-center">
          <p className="text-2xl mb-2">
            {Math.round(weather.main.temp)}°F
          </p>
          <p className="capitalize mb-4">
            {weather.weather[0].description}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            width={100}
            height={100}
          />
        </div>
      )}
    </main>
  );
}
