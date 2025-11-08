import styled from "styled-components";
import { AirQualityModel } from "./AirQualityModel";
import { Tooltip, Typography, Box } from "@mui/material";
import StyledBarChart from "../BarChart/BarChart";
import { BarChartPropModel } from "../BarChart/BarChartModel";
import StyledGaugeChart from "../GaugeChart/GaugeChart";
import { GaugeChartModel } from "../GaugeChart/GaugeChartModel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const AirQualityIndexMapperForUsEPA: { [key: number]: { text: string; color: string } } = {};
AirQualityIndexMapperForUsEPA[1] = { text: "Good", color: "Green" };
AirQualityIndexMapperForUsEPA[2] = { text: "Moderate", color: "#ffeb3b" };
AirQualityIndexMapperForUsEPA[3] = { text: "Sensitive Groups", color: "Orange" };
AirQualityIndexMapperForUsEPA[4] = { text: "Unhealthy", color: "Red" };
AirQualityIndexMapperForUsEPA[5] = { text: "Very Unhealthy", color: "Purple" };
AirQualityIndexMapperForUsEPA[6] = { text: "Hazardous", color: "Maroon" };

const AirQualityIndexMapperForGbIndex: { [key: number]: { text: string; color: string } } = {};
AirQualityIndexMapperForGbIndex[1] = { text: "Low", color: "Green" };
AirQualityIndexMapperForGbIndex[2] = { text: "Low", color: "Green" };
AirQualityIndexMapperForGbIndex[3] = { text: "Low", color: "Green" };
AirQualityIndexMapperForGbIndex[4] = { text: "Moderate", color: "#ffeb3b" };
AirQualityIndexMapperForGbIndex[5] = { text: "Moderate", color: "#ffeb3b" };
AirQualityIndexMapperForGbIndex[6] = { text: "Moderate", color: "#ffeb3b" };
AirQualityIndexMapperForGbIndex[7] = { text: "High", color: "Orange" };
AirQualityIndexMapperForGbIndex[8] = { text: "High", color: "Orange" };
AirQualityIndexMapperForGbIndex[9] = { text: "High", color: "Orange" };
AirQualityIndexMapperForGbIndex[10] = { text: "Very High", color: "Red" };

const StyledAirQualityContainer = styled.div`
  padding: 24px;
  background: white;
  margin-top: 24px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out;

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

  & .title {
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

  & .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 20px;

    @media (max-width: 1024px) {
      gap: 20px;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    @media (max-width: 576px) {
      gap: 12px;
    }
  }

  & .air-pollutant-level-chart {
    position: relative;
    padding: 20px;
    border-radius: 16px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    @media (max-width: 768px) {
      padding: 16px;
      border-radius: 12px;
    }

    & .chart-title {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 700;
      color: #667eea;
      font-size: 1rem;
      text-align: center;

      @media (max-width: 576px) {
        font-size: 0.9rem;
        top: 16px;
      }
    }
  }

  & .air-quality-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    @media (max-width: 768px) {
      padding: 16px;
      border-radius: 12px;
    }

    & .chart-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-align: center;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 8px;
      font-size: 1rem;

      @media (max-width: 576px) {
        font-size: 0.9rem;
        gap: 6px;
      }
    }
  }
`;

function AirQuality(props: AirQualityModel) {
  const { data, selectedTime, selectedDate } = props;

  function prepareBarChartConfig(): BarChartPropModel {
    const barChartConfig: BarChartPropModel = {
      data: [data.co, data.no2, data.o3, data.so2, data.pm2_5, data.pm10],
      xAxisLabel: ["Co2", "No2", "O3", "So2", "PM2.5", "PM10"],
      yAxisLabel: "Pollutant Level (μg/m³)",
      barColors: ["#FF6347", "#FF4500", "#1E90FF", "#32CD32", "#FFD700", "#FF8C00"],
    };
    return barChartConfig;
  }

  function prepareGaugeChartConfigForUsEPA(): GaugeChartModel {
    const index = data["us-epa-index"];
    const gaugeChartConfig: GaugeChartModel = {
      value: data["us-epa-index"],
      fillColor: AirQualityIndexMapperForUsEPA[index].color,
      text: AirQualityIndexMapperForUsEPA[index].text,
      minValue: 0,
      maxValue: 6,
      valueFontSize: 20,
    };
    return gaugeChartConfig;
  }

  function prepareGaugeChartConfigForGbIndex(): GaugeChartModel {
    const index = data["gb-defra-index"];
    const gaugeChartConfig: GaugeChartModel = {
      value: data["gb-defra-index"],
      fillColor: AirQualityIndexMapperForGbIndex[index].color,
      text: AirQualityIndexMapperForGbIndex[index].text,
      minValue: 0,
      maxValue: 6,
      valueFontSize: 20,
    };
    return gaugeChartConfig;
  }

  return (
    <StyledAirQualityContainer>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        marginBottom: 1
      }}>
        <Typography variant="h6" className="title">
          Air Quality
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

      <div className="content">
        <div className="air-pollutant-level-chart">
          <Typography variant="body1" className="chart-title">
            Air Pollutant Levels
          </Typography>
          <StyledBarChart {...prepareBarChartConfig()}></StyledBarChart>
        </div>

        <div className="air-quality-chart">
          <Typography variant="body1" className="chart-title">
            US EPA Index
            <Tooltip
              arrow
              disableInteractive
              placement="top"
              title={
                <Typography variant="body2">
                  A US-based index that Measures air quality based on the levels of pollutants. It categorizes air quality into 6 levels,
                  ranging from Good (1) to Hazardous (6). This helps assess potential health risks from air pollution.
                </Typography>
              }
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Typography>
          <StyledGaugeChart {...prepareGaugeChartConfigForUsEPA()}></StyledGaugeChart>
        </div>

        <div className="air-quality-chart">
          <Typography variant="body1" className="chart-title">
            GB DEFRA Index
            <Tooltip
              disableInteractive
              enterTouchDelay={100}
              arrow
              placement="top"
              title={
                <Typography variant="body2">
                  A UK-based air quality index that tracks the concentration of pollutants and categorizes air quality into 5 levels, from
                  Low (1) to Very High (10). It provides information about potential health risks due to air pollution.
                </Typography>
              }
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Typography>
          <StyledGaugeChart {...prepareGaugeChartConfigForGbIndex()}></StyledGaugeChart>
        </div>
      </div>
    </StyledAirQualityContainer>
  );
}

export default AirQuality;
