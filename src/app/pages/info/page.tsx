'use client';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import WeatherCard from '@/app/components/WeatherCard';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

function InfoPage() {
    const searchParams = useSearchParams();
    const city = searchParams.get('city');
    const locality = searchParams.get('locality');
    const localityId = searchParams.get('locality_id');
    const [weatherData, setWeatherData] = useState(null);
    const key = process.env.NEXT_PUBLIC_WEATHER_KEY;
    console.log(locality, city)

    useEffect(() => {
        if (localityId) {
            const fetchData = async () => {
                const response = await fetch(`https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`, {
                    method: 'GET',
                    headers: {
                        'X-Zomato-Api-Key': `${key}`,
                    }
                });
                const data = await response.json();
                setWeatherData(data.locality_weather_data);
            };
            fetchData();
        }
    }, [key, localityId]);
    console.log(weatherData);

    if (!weatherData) {
        return (
            <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-cover" style={{
                backgroundImage: `url('/bg2.jpg')`,
            }}>
                <CircularProgress color="inherit" />
            </div>
        );
    }


    const getImageProps = (key: any, value: any) => {
        switch (key) {
            case "temperature":
                if (value !== null && value !== undefined) {
                    if (value > 32) {
                        return { imageSrc: '/sun.png', imageAlt: 'Sunny' };
                    } else if (value > 23) {
                        return { imageSrc: '/cloudy (1).png', imageAlt: 'Cloudy' };
                    } else {
                        return { imageSrc: '/rainy-day.png', imageAlt: 'Cool' };
                    }
                } else {
                    return { imageSrc: '/error.png', imageAlt: 'Error' };
                }
            case "humidity":
                if (value !== null && value !== undefined) {
                    return { imageSrc: '/humidity.png', imageAlt: 'Humidity' };
                } else {
                    return { imageSrc: '/error.png', imageAlt: 'Error' };
                }
            case "wind_speed":
                if (value !== null && value !== undefined) {
                    return { imageSrc: '/wind.png', imageAlt: 'Wind' };
                } else {
                    return { imageSrc: '/error.png', imageAlt: 'Error' };
                }
            case "rain_intensity":
                if (value !== null && value !== undefined) {
                    return { imageSrc: '/kid.png', imageAlt: 'Rain' };
                } else {
                    return { imageSrc: '/error.png', imageAlt: 'Error' };
                }
            case "wind_direction":
                if (value !== null && value !== undefined) {
                    return { imageSrc: '/speed.png', imageAlt: 'Rain' };
                } else {
                    return { imageSrc: '/error.png', imageAlt: 'Error' };
                }
            case "rain_accumulation":
                if (value !== null && value !== undefined) {
                    return { imageSrc: '/raining.png', imageAlt: 'Rain' };
                } else {
                    return { imageSrc: '/error.png', imageAlt: 'Error' };
                }
            default:
                return { imageSrc: '/error.png', imageAlt: 'Unknown' };
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="h-dvh bg-cover flex flex-col items-center justify-center py-8 relative" style={{
                backgroundImage: `url('/bg5.jpg')`,
            }}>

                <h1 className="text-3xl font-bold text-white mb-[3rem] rounded-md p-4 bg-gradient-to-b from-blue-500 to-blue-300  ">{locality} , {city}</h1>
                <div className="flex justify-between items-center px-12 gap-4 md:gap-2 grid  sm:grid-cols-2 lg:grid-cols-6 md:grid-cols-3 ">

                    {Object.entries(weatherData).map(([key, value]) => {

                        const { imageSrc, imageAlt } = getImageProps(key, value);

                        return (
                            <WeatherCard
                                imageSrc={imageSrc}
                                imageAlt={imageAlt}
                                type={key}
                                value={value === null || value === undefined ? null : String(value)}
                                key={key}
                            />
                        );
                    })}

                </div>
                <div className=' relative top-[5rem]'>
                    <Link href='/pages/landing' className='rounded-md p-5 text-white bg-gradient-to-b from-blue-600 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-lg '>Search Another Location </Link>
                </div>
            </div>
        </Suspense>
    );
}

export default dynamic(() => Promise.resolve(InfoPage), {
    ssr: false,
});
