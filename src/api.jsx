import axios from "axios";

export async function fetchWeather(city, setError) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c4d2ef03c983fdd2987e05ad85f582f8`;

  try {
    const response = await axios.get(url);
    setError("");
    return response.data;
  } catch (error) {
    setError("City Not Found!");
    return error;
  }
}
