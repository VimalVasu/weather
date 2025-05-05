// src/app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const city = url.searchParams.get("city") || "Manhattan";
  const apiKey = process.env.WEATHER_API_KEY!;
  const units = "imperial";

  // 1) Call the OpenWeatherMap API
  const apiRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather` +
    `?q=${encodeURIComponent(city)}` +
    `&units=${units}` +
    `&appid=${apiKey}`
  );

  // 2) If it fails, return a JSON error with 502 status
  if (!apiRes.ok) {
    // read the raw body so we can echo or inspect if you like:
    const errorText = await apiRes.text();
    return new NextResponse(
      JSON.stringify({
        error: `Weather API error: ${apiRes.status}`,
        details: errorText
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  // 3) Otherwise parse & return the JSON payload
  const data = await apiRes.json();
  return NextResponse.json(data);
}
