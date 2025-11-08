export interface CurrentWeatherModel {
  widthInPercent?: number;
  time: string;
  location: string;
  temperature: number;
  condition: string;
  imgSrc: string;
  isDay: boolean;
  onClick?: () => void;
}
