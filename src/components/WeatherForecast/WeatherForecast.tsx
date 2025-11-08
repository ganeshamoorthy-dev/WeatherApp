import styled from "styled-components";
import { WeatherForeCastModel } from "./WeatherForecastModel";
import { Box, Typography } from "@mui/material";

const StyledWeatherForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  border-radius: 12px;
  border: 2px solid transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    border-color: #667eea;

    &::before {
      opacity: 0.1;
    }

    & .time,
    & .temp {
      color: #667eea;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  @media (max-width: 576px) {
    min-width: 88px;
    padding: 12px 10px;
    border-radius: 10px;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  & .time {
    color: #64748b;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 4px;
    transition: color 0.3s ease;

    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }

  & .weather-condition {
    color: #94a3b8;
    font-size: 0.75rem;
  }

  & img {
    height: 56px;
    width: 56px;
    margin: 8px 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    transition: transform 0.3s ease;

    @media (max-width: 576px) {
      height: 48px;
      width: 48px;
      margin: 6px 0;
    }
  }

  &:hover img {
    transform: scale(1.1);
  }

  & .temp {
    color: #1e293b;
    font-weight: 700;
    font-size: 1.1rem;
    transition: color 0.3s ease;

    @media (max-width: 576px) {
      font-size: 1rem;
    }
  }
`;

function WeatherForecast(props: WeatherForeCastModel) {
  return (
    <StyledWeatherForecastContainer
      onClick={() => {
        if (props.onClick) {
          props.onClick(props);
        }
      }}
    >
      <Typography variant="body1" className="time">
        {props.time}
      </Typography>
      <Box>
        <img src={props.imgSrc} alt="" />
      </Box>
      <Typography variant="body1" className="temp">
        {props.temperature}&#176;C
      </Typography>
    </StyledWeatherForecastContainer>
  );
}

export default WeatherForecast;
