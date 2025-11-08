import styled from "@emotion/styled";
import { WeatherAttributeModel } from "./WeatherAttributeModel";
import { Box, Typography } from "@mui/material";

const StyledWeatherAttributeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 18px;
  gap: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: default;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    border-color: rgba(102, 126, 234, 0.2);
    background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 14px;
    border-radius: 14px;
  }

  @media (max-width: 576px) {
    padding: 14px 12px;
    gap: 12px;
    border-radius: 12px;
  }

  & .attr-image {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
    border-radius: 12px;
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
      border-radius: 10px;
    }

    @media (max-width: 576px) {
      width: 40px;
      height: 40px;
      border-radius: 8px;
    }

    & img {
      width: 32px;
      height: 32px;
      object-fit: contain;
      filter: opacity(0.85);

      @media (max-width: 768px) {
        width: 28px;
        height: 28px;
      }

      @media (max-width: 576px) {
        width: 24px;
        height: 24px;
      }
    }
  }

  &:hover .attr-image {
    transform: scale(1.1);
  }

  & .attr-text-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 4px;
    min-width: 0;

    & .title {
      color: #64748b;
      font-weight: 700;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;

      @media (max-width: 576px) {
        font-size: 0.7rem;
      }
    }

    & .value {
      color: #1e293b;
      font-weight: 700;
      font-size: 1.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 768px) {
        font-size: 1.15rem;
      }

      @media (max-width: 576px) {
        font-size: 1rem;
      }
    }
  }
`;

function WeatherAttribute(props: WeatherAttributeModel) {
  return (
    <StyledWeatherAttributeContainer>
      <Box className="attr-image">
        <img src={props.imgSrc} alt={props.title} />
      </Box>
      <Box className="attr-text-wrapper">
        <Typography variant="caption" className="title">
          {props.title}
        </Typography>
        <Typography variant="h6" component="div" className="value">
          {props.value}
        </Typography>
      </Box>
    </StyledWeatherAttributeContainer>
  );
}
export default WeatherAttribute;
