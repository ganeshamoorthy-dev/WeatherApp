import { useState } from "react";
import { getWeatherForecast, getWeatherLocationListForAutoComplete } from "../../services/WeatherAppService";
import { Box, CircularProgress, Typography } from "@mui/material";
import styled from "styled-components";
import WeatherLocationSearchField from "../WeatherLocationSearchField/WeatherLocationSearchField";
import { LocationSearchResponseModel } from "../../model/locationSearchResponseModel";
import { Astro, Current, ForecastDay, WeatherForeCastResponseModel } from "../../model/WeatherForecastResponseModel";
import TodayForecast from "../TodayForecast/TodayForecast";
import WeatherInsights from "../weatherInsights/WeatherInsights";
import { WeatherForeCastModel } from "../WeatherForecast/WeatherForecastModel";
import WeatherForecastAccordion from "../WeatherForecastAccordion/WeatherForecastAccordion";
import { WeatherForecastAccordionModel } from "../WeatherForecastAccordion/WeatherForecastAccordionModel";
import AirQuality from "../AirQuality/AirQuality";
import { TimeUtil } from "../../utils/TimeUtil";
import EmptyCard from "../EmptyCard/EmptyCard";
import WeatherAppIcon from "../../assets/weather-icon.png";
import ErrorCard from "../ErrorCard/ErrorCard";

interface CurrentWeatherInsights {
  astro: Astro;
  insights: Current;
}

const StyledWeatherAppBaseContainer = styled.div`
  max-width: 1400px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: transparent;

  & .weather-forecast-accordion {
    margin-top: 24px;
    animation: fadeInUp 0.5s ease-out;
  }

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

  & .page-content {
    padding: 24px 32px 48px;
    
    @media (max-width: 1024px) {
      padding: 20px 24px 40px;
    }

    @media (max-width: 768px) {
      padding: 16px 16px 32px;
    }

    @media (max-width: 480px) {
      padding: 12px 12px 24px;
    }
  }

  & .page-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px);

    @media (max-width: 1024px) {
      padding: 16px 24px;
      gap: 20px;
    }

    @media (max-width: 768px) {
      padding: 12px 16px;
      gap: 12px;
      flex-direction: column;
    }

    @media (max-width: 480px) {
      padding: 12px;
    }

    & .search-field {
      flex: 1;
      max-width: 600px;

      @media (max-width: 768px) {
        max-width: 100%;
        width: 100%;
      }
    }

    & .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;

      @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
      }

      & img {
        width: 56px;
        height: 56px;
        filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3));
        transition: transform 0.3s ease;

        @media (max-width: 768px) {
          width: 48px;
          height: 48px;
        }

        @media (max-width: 480px) {
          width: 40px;
          height: 40px;
        }

        &:hover {
          transform: scale(1.1) rotate(5deg);
        }
      }

      & .description {
        color: white;
        text-transform: uppercase;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: 2px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        @media (max-width: 768px) {
          font-size: 1.3rem;
        }

        @media (max-width: 480px) {
          font-size: 1.1rem;
          letter-spacing: 1px;
        }
      }
    }
  }
`;

function WeatherAppBase() {
  const [weatherForeCast, setWeatherForecast] = useState<WeatherForeCastResponseModel>();
  const [currentWeatherInsights, setCurrentWeatherInsights] = useState<CurrentWeatherInsights>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string; } | null>(null);

  const handleForecastClickEvent = (value: WeatherForeCastModel) => {
    updateWeatherInsights(value);
  };

  const handleRetry = () => {
    setError(null);
    setWeatherForecast(undefined);
    setCurrentWeatherInsights(undefined);
  };

  function updateWeatherInsights(data: WeatherForeCastModel): void {
    const dayInsights = weatherForeCast?.forecast.forecastday.find(
      (dayConfig) => new Date(dayConfig.date_epoch * 1000).getDay() === new Date(data.id * 1000).getDay()
    );
    const hourlyInsight = dayInsights?.hour.find((hourlyConfig) => hourlyConfig.time_epoch === data.id) as Current;
    const selectedInsights: CurrentWeatherInsights = {
      astro: dayInsights?.astro as Astro,
      insights: hourlyInsight,
    };
    setCurrentWeatherInsights(selectedInsights);
  }

  function prepareWeatherForecastAccordionConfig(position: number, isAccordionOpen: boolean = false): WeatherForecastAccordionModel {
    const forecast = weatherForeCast?.forecast.forecastday.at(position) as ForecastDay;
    const config: WeatherForecastAccordionModel = {
      isAccordionOpen: isAccordionOpen,
      header: {
        title:
          position === 1 ? `Tomorrow, ${TimeUtil.getDateString(forecast.date_epoch)}` : `${TimeUtil.getDateString(forecast.date_epoch)}`,
        temperature: forecast?.day.avgtemp_c as number,
        imgSrc: forecast?.day.condition.icon as string,
      },
      content: { data: getHourlyDataFromDayForecastData(forecast) },
    };
    return config;
  }

  const getHourlyDataFromDayForecastData = (foreCastDay: ForecastDay): WeatherForeCastModel[] => {
    return foreCastDay.hour.map((hourData) => {
      const config: WeatherForeCastModel = {
        id: hourData.time_epoch,
        time: TimeUtil.convertTo12Hour(hourData.time.split(" ").at(1) ?? ""),
        imgSrc: hourData.condition.icon,
        temperature: hourData.temp_c.toString(),
        conditionText: hourData.condition.text,
        onClick: handleForecastClickEvent,
      };
      return config;
    });
  };

  async function handleWeatherLocationChange(value: LocationSearchResponseModel): Promise<void> {
    await getWeatherDetails(value.name);
  }

  async function handleTodayForecastClickEvent() {

    const currentWeatherInsights = weatherForeCast?.forecast.forecastday.at(0) as ForecastDay;
    const insights = weatherForeCast?.current;
    if (currentWeatherInsights && insights) {
      setCurrentWeatherInsights({ astro: currentWeatherInsights.astro, insights });
    }

  }

  async function getWeatherDetails(name: string): Promise<void> {
    try {
      if (name.length > 0) {
        setLoading(true);
        setError(null); // Clear any previous errors
        const response = await getWeatherForecast(name);
        const currentWeatherInsights = response.forecast.forecastday.at(0) as ForecastDay;
        const insights = response.current;
        setCurrentWeatherInsights({ astro: currentWeatherInsights.astro, insights });
        setWeatherForecast(response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching weather details:", error);
      setLoading(false);

      // Handle different error types
      let errorMessage = "Unable to fetch weather data. Please try again later.";
      let errorCode = "UNKNOWN_ERROR";

      if (error instanceof Error) {
        if (error.message.includes("network") || error.message.includes("fetch")) {
          errorMessage = "Network error. Please check your internet connection and try again.";
          errorCode = "NETWORK_ERROR";
        } else if (error.message.includes("404")) {
          errorMessage = "Location not found. Please check the city name and try again.";
          errorCode = "LOCATION_NOT_FOUND";
        } else if (error.message.includes("401") || error.message.includes("403")) {
          errorMessage = "Authentication error. Please contact support.";
          errorCode = "AUTH_ERROR";
        } else if (error.message.includes("timeout")) {
          errorMessage = "Request timed out. Please try again.";
          errorCode = "TIMEOUT_ERROR";
        }
      }

      setError({ message: errorMessage, code: errorCode });
    }
  }

  return (
    <Box>
      {loading && (
        <Box className="loader">
          <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}>
            {/* Outer rotating circle */}
            <Box sx={{ position: 'relative', width: 120, height: 120 }}>
              <CircularProgress
                size={120}
                thickness={2}
                sx={{
                  color: 'rgba(255, 255, 255, 0.2)',
                  position: 'absolute',
                }}
              />
              <CircularProgress
                size={120}
                thickness={2}
                variant="determinate"
                value={25}
                sx={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  position: 'absolute',
                  animation: 'rotate 2s linear infinite',
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
              {/* Inner spinning circle */}
              <CircularProgress
                size={80}
                thickness={4}
                sx={{
                  color: 'white',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-40px',
                  marginLeft: '-40px',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  }
                }}
              />
              {/* Center dot pulse */}
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 16,
                height: 16,
                backgroundColor: 'white',
                borderRadius: '50%',
                marginTop: '-8px',
                marginLeft: '-8px',
                animation: 'pulse 1.5s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': {
                    transform: 'scale(1)',
                    opacity: 1,
                  },
                  '50%': {
                    transform: 'scale(1.5)',
                    opacity: 0.7,
                  },
                },
              }} />
            </Box>

            {/* Loading text with fade animation */}
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                animation: 'fadeInOut 2s ease-in-out infinite',
                '@keyframes fadeInOut': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                },
              }}
            >
              Loading
            </Typography>

            {/* Bouncing dots */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    '@keyframes bounce': {
                      '0%, 80%, 100%': {
                        transform: 'translateY(0)',
                        opacity: 0.7,
                      },
                      '40%': {
                        transform: 'translateY(-20px)',
                        opacity: 1,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
      <StyledWeatherAppBaseContainer>
        <Box className="page-header" component={"div"}>
          <Box className="logo">
            <img src={WeatherAppIcon} alt="weather-app-logo" />
            <span className="description">Weather Wise</span>
          </Box>
          <Box className="search-field">
            <WeatherLocationSearchField
              onChange={handleWeatherLocationChange}
              optionsResolver={getWeatherLocationListForAutoComplete}
            ></WeatherLocationSearchField>
          </Box>
        </Box>
        <Box className="page-content">
          {error ? (
            <ErrorCard
              title="Weather Data Error"
              message={error.message}
              errorCode={error.code}
              onRetry={handleRetry}
              showHomeButton={false}
            />
          ) : weatherForeCast && currentWeatherInsights ? (
            <>
              <Box component="main">
                <TodayForecast weatherDetails={weatherForeCast} handleForecastClickEvent={handleTodayForecastClickEvent} />
              </Box>

              {[1, 2].map((index) => (
                <Box key={index} className="weather-forecast-accordion">
                  <WeatherForecastAccordion {...prepareWeatherForecastAccordionConfig(index, true)} />
                </Box>
              ))}

              <Box>
                <WeatherInsights insights={currentWeatherInsights.insights} astro={currentWeatherInsights.astro} />
              </Box>

              <Box>
                {currentWeatherInsights.insights?.air_quality ? (
                  <AirQuality
                    data={currentWeatherInsights.insights.air_quality}
                    selectedDate={currentWeatherInsights.insights.last_updated ? TimeUtil.getDateString(new Date(currentWeatherInsights.insights.last_updated).getTime() / 1000) : undefined}
                    selectedTime={currentWeatherInsights.insights.last_updated ? TimeUtil.convertTo12Hour(currentWeatherInsights.insights.last_updated.split(" ")[1]) : undefined}
                  />
                ) : (
                  <Box sx={{
                    padding: '24px',
                    background: 'white',
                    marginTop: '24px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    '@media (max-width: 768px)': {
                      padding: '20px',
                      borderRadius: '16px',
                      marginTop: '20px',
                    },
                    '@media (max-width: 576px)': {
                      padding: '16px',
                      borderRadius: '12px',
                      marginTop: '16px',
                    }
                  }}>
                    <Typography variant="h6" sx={{
                      color: '#667eea',
                      fontWeight: 700,
                      marginBottom: 1
                    }}>
                      Air Quality Data Not Available
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      Air quality information is not available for this time period. Click on the current weather card to view current air quality data.
                    </Typography>
                  </Box>
                )}
              </Box>
            </>
          ) : (
            <Box className="empty-card">
              <EmptyCard />
            </Box>
          )}
        </Box>
      </StyledWeatherAppBaseContainer>
    </Box>
  );
}
export default WeatherAppBase;
