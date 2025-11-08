import styled from "@emotion/styled";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import { TodayForecastModel } from "./TodayForecastModel";
import { WeatherForeCastResponseModel } from "../../model/WeatherForecastResponseModel";
import { CurrentWeatherModel } from "../CurrentWeather/CurrentWeatherModel";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { WeatherForeCastModel } from "../WeatherForecast/WeatherForecastModel";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import { TimeUtil } from "../../utils/TimeUtil";

const StyledTodayForecastContainer = styled.div`
  display: flex;
  gap: 24px;
  animation: fadeInUp 0.6s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  & .weather-forecast-list-container {
    flex: 1;
    padding: 20px;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
      padding: 16px;
      border-radius: 16px;
    }

    @media (max-width: 576px) {
      padding: 12px;
      border-radius: 12px;
    }

    & .forecast-title {
      color: #667eea;
      font-weight: 700;
      margin-bottom: 16px;
      padding-left: 8px;
      font-size: 1.1rem;

      @media (max-width: 576px) {
        font-size: 1rem;
        margin-bottom: 12px;
      }
    }

    & .weather-forecast-list {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 8px 4px;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
        margin: 0 8px;
      }

      &::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
      }

      @media (max-width: 576px) {
        gap: 8px;
        padding: 4px 2px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 576px) {
    gap: 16px;
  }
`;

const getCurrentWeatherConfig = (weatherData: WeatherForeCastResponseModel, onClick?: () => void) => {
  const currentWeatherData = weatherData.current;
  const currentWeatherConfig: CurrentWeatherModel = {
    widthInPercent: 35,
    location: weatherData.location.name,
    temperature: currentWeatherData.temp_c,
    condition: currentWeatherData.condition.text,
    imgSrc: currentWeatherData.condition.icon.replaceAll("64", "128"),
    isDay: !!currentWeatherData.is_day,
    time: `Today, ${TimeUtil.getDateString(weatherData.current.last_updated_epoch as number)}`,
    onClick: onClick,
  };
  return currentWeatherConfig;
};

function TodayForecast(props: TodayForecastModel) {
  const { weatherDetails, handleForecastClickEvent } = props;

  const getWeatherHourlyForecastConfigList = (): WeatherForeCastModel[] => {
    const todayHourlyForecastList = weatherDetails.forecast.forecastday.at(0)?.hour;
    const foreCastList = todayHourlyForecastList?.filter((value) => value.time_epoch * 1000 > new Date().getTime());
    if (foreCastList && foreCastList.length > 0) {
      const WeatherForeCastConfigList = foreCastList?.map((forecast) => {
        const config: WeatherForeCastModel = {
          id: forecast.time_epoch,
          time: TimeUtil.convertTo12Hour(forecast.time.split(" ").at(1) || ""),
          imgSrc: forecast.condition.icon,
          temperature: forecast.temp_c.toString(),
          conditionText: forecast.condition.text,
          onClick: handleForecastClickEvent,
        };
        return config;
      });
      return WeatherForeCastConfigList;
    }
    return [];
  };

  const weatherForecastList = getWeatherHourlyForecastConfigList();

  const handleCurrentWeatherClick = () => {
    // Find the current hour's data from the forecast
    const currentWeatherData = weatherDetails.current;
    const currentEpoch = currentWeatherData.last_updated_epoch || 0;
    
    // Find the hour entry that matches or is closest to the current time
    const todayHours = weatherDetails.forecast.forecastday.at(0)?.hour || [];
    
    // Find the exact hour or the most recent hour before current time
    let currentHourData = todayHours.find(h => h.time_epoch === currentEpoch);
    
    if (!currentHourData) {
      // If no exact match, find the closest hour before or at current time with air_quality data
      const hoursBeforeCurrent = todayHours
        .filter(h => h.time_epoch <= currentEpoch && h.air_quality)
        .sort((a, b) => b.time_epoch - a.time_epoch);
      
      currentHourData = hoursBeforeCurrent[0];
    }
    
    if (currentHourData) {
      const currentConfig: WeatherForeCastModel = {
        id: currentHourData.time_epoch,
        time: TimeUtil.convertTo12Hour(currentHourData.time.split(" ").at(1) || ""),
        imgSrc: currentHourData.condition.icon,
        temperature: currentHourData.temp_c.toString(),
        conditionText: currentHourData.condition.text,
        onClick: handleForecastClickEvent,
      };
      handleForecastClickEvent(currentConfig);
    }
  };

  return (
    <StyledTodayForecastContainer>
      <CurrentWeather {...getCurrentWeatherConfig(weatherDetails, handleCurrentWeatherClick)} />

      <Box className="weather-forecast-list-container">
        <Typography className="forecast-title" variant="h6">
          Today's Hourly Forecast
        </Typography>
        {weatherForecastList.length > 0 && (
          <Box className="weather-forecast-list">
            {weatherForecastList.map((config) => (
              <WeatherForecast key={config.time} {...config} />
            ))}
          </Box>
        )}
      </Box>
    </StyledTodayForecastContainer>
  );
}

export default TodayForecast;
