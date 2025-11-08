import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { WeatherForecastAccordionModel } from "./WeatherForecastAccordionModel";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WeatherForecastAccordionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  color: #fff;

  & .weather-condition {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-right: 12px;

    @media (max-width: 576px) {
      gap: 12px;
      margin-right: 8px;
    }
  }

  & img {
    width: 56px;
    height: 56px;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));

    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
    }

    @media (max-width: 576px) {
      width: 40px;
      height: 40px;
    }
  }

  & .title {
    font-weight: 600;
    font-size: 1.1rem;

    @media (max-width: 576px) {
      font-size: 0.95rem;
    }
  }

  & .temperature {
    font-weight: 700;
    font-size: 1.3rem;

    @media (max-width: 576px) {
      font-size: 1.1rem;
    }
  }
`;

const WeatherForecastAccordionContentContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 4px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

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
`;

function WeatherForecastAccordion(props: WeatherForecastAccordionModel) {
  return (
    <>
      <Accordion 
        defaultExpanded={props.isAccordionOpen ?? false}
        sx={{
          borderRadius: '16px !important',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          '&:before': { display: 'none' },
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <AccordionSummary
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '72px !important',
            '& .MuiAccordionSummary-content.Mui-expanded, & .MuiAccordionSummary-content ': { 
              margin: '16px 0px !important' 
            },
            '@media (max-width: 576px)': {
              minHeight: '64px !important',
              '& .MuiAccordionSummary-content.Mui-expanded, & .MuiAccordionSummary-content ': { 
                margin: '12px 0px !important' 
              },
            }
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: "#fff", fontSize: '2rem' }} />}
        >
          <WeatherForecastAccordionHeaderContainer>
            <Typography variant="subtitle1" className="title">
              {props.header.title}
            </Typography>
            <Box className="weather-condition">
              <Typography variant="h6" className="temperature">{props.header.temperature}&#176;C</Typography>
              <img src={props.header.imgSrc} alt="weather icon" />
            </Box>
          </WeatherForecastAccordionHeaderContainer>
        </AccordionSummary>

        <AccordionDetails 
          sx={{ 
            backgroundColor: "#ffffff",
            padding: '20px',
            '@media (max-width: 768px)': {
              padding: '16px',
            },
            '@media (max-width: 576px)': {
              padding: '12px',
            }
          }}
        >
          <WeatherForecastAccordionContentContainer>
            {props?.content?.data?.map((weatherForecastData) => (
              <WeatherForecast key={weatherForecastData.id} {...weatherForecastData} />
            ))}
          </WeatherForecastAccordionContentContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
export default WeatherForecastAccordion;
