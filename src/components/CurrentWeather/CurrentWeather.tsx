import { Box, Chip, Typography } from "@mui/material";
import styled from "styled-components";
import { CurrentWeatherModel } from "./CurrentWeatherModel";
import { WbSunny } from "@mui/icons-material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import PlaceIcon from "@mui/icons-material/Place";

interface StyledCurrentWeatherContainerModel {
  width: number;
  isDay: boolean;
}

const StyledCurrentWeatherContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop != "isDay",
})<StyledCurrentWeatherContainerModel>`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background: ${props => props.isDay 
    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' 
    : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  transition: all 0.4s ease;
  min-width: 420px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.isDay 
      ? 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)' 
      : 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)'};
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    cursor: ${props => props.onClick ? 'pointer' : 'default'};
  }

  @media (max-width: 1024px) {
    min-width: 360px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    min-width: 100%;
    padding: 20px;
    border-radius: 16px;
  }

  @media (max-width: 576px) {
    padding: 16px;
    border-radius: 12px;
  }

  & .weather-details {
    display: flex;
    gap: 32px;
    align-items: center;
    position: relative;
    z-index: 1;
    flex: 1;

    @media (max-width: 576px) {
      gap: 20px;
    }

    & .weather-content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 8px;
      color: white;
    }
  }

  & img {
    width: 120px;
    height: 120px;
    align-self: center;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    position: relative;
    z-index: 1;

    @media (max-width: 1024px) {
      width: 100px;
      height: 100px;
    }

    @media (max-width: 576px) {
      width: 80px;
      height: 80px;
    }
  }

  & .location {
    display: flex;
    align-items: center;
    gap: 4px;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    & svg {
      flex-shrink: 0;
    }
  }

  & .time {
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
  }

  & .temperature {
    font-size: 3.5rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    line-height: 1;

    @media (max-width: 1024px) {
      font-size: 3rem;
    }

    @media (max-width: 576px) {
      font-size: 2.5rem;
    }
  }

  & .is-day {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 2;
    background: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white !important;
    font-weight: 600;
    padding: 8px 12px !important;

    @media (max-width: 576px) {
      top: 12px;
      right: 12px;
      padding: 6px 10px !important;
    }
  }
`;

const DayIcon = () => <WbSunny sx={{ fill: "#FFD700" }} />;
const NightIcon = () => <NightsStayIcon sx={{ color: "#E0E7FF" }} />;

function CurrentWeather(props: CurrentWeatherModel) {
  const { location, temperature, imgSrc, widthInPercent, isDay, time, onClick } = props;
  return (
    <>
      <StyledCurrentWeatherContainer 
        width={widthInPercent ?? 100} 
        isDay={isDay}
        onClick={onClick}
      >
        <Box component={"section"} className="weather-details">
          <Box component={"div"} className="weather-content">
            <Typography className="time" variant="subtitle1">
              {time}
            </Typography>
            <Typography className="temperature" variant="h2">{temperature}&#176;C</Typography>
            <Typography className="location" variant="body1">
              <PlaceIcon fontSize="small"></PlaceIcon>
              {location}
            </Typography>
          </Box>
          <img src={imgSrc} alt="weather icon" />
        </Box>

        <Chip
          className="is-day"
          variant="outlined"
          icon={isDay ? <DayIcon /> : <NightIcon />}
          label={isDay ? "DAY" : "NIGHT"}
        />
      </StyledCurrentWeatherContainer>
    </>
  );
}
export default CurrentWeather;
