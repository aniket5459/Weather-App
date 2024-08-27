'use client'
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { cities } from "../../utils/cities";
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from "sweetalert2";

interface City {
    id: any;
    label: any;
    cityName: any;
}

function LandingPage() {
    const [search, setSearch] = useState<string>('');
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [locality, setLocality] = useState<string | null>('');
    const [city, setCity] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const key = process.env.NEXT_PUBLIC_WEATHER_KEY;
        console.log(key);
        setIsLoading(true);

        if (currentId) {
            try {
                const response = await fetch(`https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${currentId}`, {
                    method: 'GET',
                    headers: {
                        'X-Zomato-Api-Key': `${key}`,
                    }
                });

                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
                }

                const data = await response.json();
                console.log('Data received:', data);
                router.push(`/pages/info?locality_id=${currentId}&city=${city}&locality=${locality}`);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        } else {
            console.log("No city selected.");
            setIsLoading(false);
            Swal.fire({
                icon: 'warning',
                title: 'PLease enter a valid Location',
                text: 'Please try a different search term.',
            });
            setSearch('');

        }
    };

    useEffect(() => {
        if (search.length > 0) {
            const filteredCities = cities.filter((city: City) =>
                city.label.toLowerCase().includes(search.toLowerCase()) ||
                city.cityName.toLowerCase().includes(search.toLowerCase())
            );
            setSuggestions(filteredCities);

        } else {
            setSuggestions([]);
        }

    }, [search]);

    const handleSuggestionClick = (suggestion: City) => {
        setSearch(suggestion.label);
        setCurrentId(suggestion.id);
        setLocality(suggestion.label);
        setCity(suggestion.cityName);
        setSuggestions([]);
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center h-dvh bg-cover" style={{
                backgroundImage: `url('/bg2.jpg')`,
            }}>
                <CircularProgress color="inherit" />
            </div>
        );
    }

    return (
        <div className="h-dvh bg-cover" style={{
            backgroundImage: `url('/bg2.jpg')`,
        }}>
            <div className="flex justify-center items-center relative top-[40%]">
                <h2 className="text-4xl text-white md:text-7xl">Weather Application</h2>
            </div>
            <div className="relative top-[43%]">
                <SearchBar
                    onChange={(e) => setSearch(e.target.value)}
                    onSubmit={handleSubmit}
                    value={search}
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                />
            </div>
        </div>
    );
}

export default LandingPage;
