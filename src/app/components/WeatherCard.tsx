
import React from "react";
import { WiThermometer, WiHumidity, WiStrongWind, WiRainWind, WiWindDeg } from "weather-icons-react";

interface WeatherCardProps {
    imageSrc?: string;
    imageAlt?: string;
    value?: string | number | null;
    type?: string;
}

const formatType = (type: string | undefined) => {
    if (!type) return '';

    return type
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const getUnitAndIcon = (type: string | undefined) => {
    switch (type) {
        case 'temperature':
            return { unit: '°C', Icon: WiThermometer };
        case 'humidity':
            return { unit: '%', Icon: WiHumidity };
        case 'wind_speed':
            return { unit: 'km/h', Icon: WiStrongWind };
        case 'rain_accumulation':
            return { unit: 'mm', Icon: WiRainWind };
        case 'wind_direction':
            return { unit: '°', Icon: WiWindDeg };
        default:
            return { unit: '', Icon: null };
    }
};

const WeatherCard: React.FC<WeatherCardProps> = ({ imageSrc, imageAlt, value, type }) => {
    const { unit, Icon } = getUnitAndIcon(type);
    const displayValue = value === null || value === undefined || value === "" ? "Data not Available" : `${value} ${unit}`;

    return (
        <div className="bg-gradient-to-b from-blue-400 to-blue-300 text-white p-4 rounded-xl shadow-2xl w-[18rem] mx-auto ">
            <div className="text-2xl flex items-center justify-center font-bold">
                <h2 className="capitalize">{formatType(type)}</h2>
            </div>
            <div className="flex justify-center items-center mb-4 pt-2">
                <img src={imageSrc} alt={imageAlt} className="h-45 w-45" />
            </div>
            <div className="flex items-center justify-center text-2xl font-bold gap-1">
                {Icon && <Icon size={40} />}
                <p>{displayValue}</p>
            </div>
        </div>
    );
};

export default WeatherCard;
