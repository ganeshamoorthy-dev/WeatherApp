import { AirQualityDataModel } from "../../model/WeatherForecastResponseModel";

export interface AirQualityModel {
  data: AirQualityDataModel;
  selectedTime?: string;
  selectedDate?: string;
}
