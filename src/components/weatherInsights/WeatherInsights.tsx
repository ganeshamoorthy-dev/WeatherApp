import styled from "styled-components";
import { WeatherInsightsModel } from "./WeatherInsightsModel";
import { WeatherAttributeModel } from "../WeatherAttribute/WeatherAttributeModel";
import windImg from "../../assets/Icon awesome-wind.svg";
import SunRiseImg from "../../assets/Icon feather-sunrise.svg";
import SunsetImg from "../../assets/Icon feather-sunset.svg";
import PrecipitationImg from "../../assets/Icon weather-raindrop.svg";
import HumidityImg from "../../assets/Exclusion 2.svg";
import PressureImg from "../../assets/Group 62.svg";
import FeelsLikeImg from "../../assets/Icon awesome-temperature-high.svg";
import VisibilityImg from "../../assets/Icon material-visibility.svg";
import WeatherAttribute from "../WeatherAttribute/WeatherAttribute";
import { Typography, Box } from "@mui/material";
import { TimeUtil } from "../../utils/TimeUtil";

const StyledWeatherDetailsContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const StyledWeatherDetailsContainer = styled.div`
  padding: 24px;
  margin-top: 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.7s ease-out;

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

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
    margin-top: 20px;
  }

  @media (max-width: 576px) {
    padding: 16px;
    border-radius: 12px;
    margin-top: 16px;
  }

  & .header {
    color: #667eea;
    font-weight: 700;
    margin-bottom: 4px;
    padding-left: 4px;
    font-size: 1.3rem;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }

    @media (max-width: 576px) {
      font-size: 1.1rem;
    }
  }
`;

function createWeatherAttributeConfig(title: string, value: string, imgSrc: string): WeatherAttributeModel {
  return {
    title,
    value,
    imgSrc,
  };
}

function WeatherInsights(props: WeatherInsightsModel) {
  const { insights, astro } = props;

  // Extract date and time from insights
  const timeString = insights.last_updated || insights.time;
  const selectedDate = timeString
    ? TimeUtil.getDateString(new Date(timeString).getTime() / 1000)
    : undefined;
  const selectedTime = timeString
    ? TimeUtil.convertTo12Hour(timeString.split(" ")[1])
    : undefined;

  function getWeatherAttributeConfigList(): WeatherAttributeModel[] {
    const windSpeedConfig = createWeatherAttributeConfig("WIND", `${insights.wind_mph} Mph`, windImg);
    const sunRiseConfig = createWeatherAttributeConfig("SUNRISE", astro.sunrise, SunRiseImg);
    const sunSetConfig = createWeatherAttributeConfig("SUNSET", astro.sunset, SunsetImg);
    const precipitationConfig = createWeatherAttributeConfig("PRECIPITATION", `${insights.precip_mm.toString()} Mm`, PrecipitationImg);
    const humidityConfig = createWeatherAttributeConfig("HUMIDITY", `${insights.humidity.toString()} %`, HumidityImg);
    const pressureConfig = createWeatherAttributeConfig("PRESSURE", `${insights.pressure_mb.toString()} Mb`, PressureImg);
    const feelsLikeConfig = createWeatherAttributeConfig("FEELS LIKE", `${insights.feelslike_c.toString()}`, FeelsLikeImg);
    const visibilityConfig = createWeatherAttributeConfig("VISIBILITY", `${insights.vis_km} Km`, VisibilityImg);

    return [
      sunRiseConfig,
      sunSetConfig,
      windSpeedConfig,
      precipitationConfig,
      humidityConfig,
      pressureConfig,
      feelsLikeConfig,
      visibilityConfig,
    ];
  }

  return (
    <StyledWeatherDetailsContainer>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        marginBottom: 1
      }}>
        <Typography variant="h6" className="header">
          Weather Insights
        </Typography>
        {selectedDate && selectedTime && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            padding: '8px 16px',
            borderRadius: '8px',
            '@media (max-width: 576px)': {
              padding: '6px 12px',
            }
          }}>
            <Typography variant="body2" sx={{
              color: '#667eea',
              fontWeight: 600,
              '@media (max-width: 576px)': {
                fontSize: '0.8rem',
              }
            }}>
              📅 {selectedDate} • 🕒 {selectedTime}
            </Typography>
          </Box>
        )}
      </Box>
      <StyledWeatherDetailsContent>
        {getWeatherAttributeConfigList().map((config) => (
          <WeatherAttribute key={config.title} {...config} />
        ))}
      </StyledWeatherDetailsContent>
    </StyledWeatherDetailsContainer>
  );
}

export default WeatherInsights;
