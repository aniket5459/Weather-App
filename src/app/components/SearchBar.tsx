import { GoSearch } from "react-icons/go";
import { cn } from "../utils/cn";

type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    suggestions: { id: any, label: string, cityName: string }[];
    onSuggestionClick: (suggestion: { id: any, label: string, cityName: string }) => void;
};

function SearchBar(props: Props) {
    return (
        <form onSubmit={props.onSubmit} className={cn("flex justify-center items-center", props.className)} >
            <label className="relative gap-2 ">
                <button type="submit" className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <GoSearch className="text-2xl text-slate-500" />
                </button>
                <input
                    className="placeholder:italic placeholder:text-slate-400 block bg-white sm:w-[30rem] md:w-[60rem] border border-gray-300 w-[20rem] rounded-full py-4 pl-[3rem] pr-3 shadow-lg focus:outline-none focus:border-blue-600 focus:ring-blue-600 focus:ring-1 sm:text-sm transition"
                    value={props.value}
                    onChange={props.onChange}
                    placeholder="Search for any location..."
                    type="text"
                    name="search"
                    autoComplete="off"
                />
                {props.suggestions.length > 0 && (
                    <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto scrollbar-hide">
                        {props.suggestions.map((suggestion) => (
                            <li
                                key={suggestion.id}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all"
                                onClick={() => props.onSuggestionClick(suggestion)}
                            >
                                <span className="ml-3 text-gray-900 text-sm">{suggestion.label} ({suggestion.cityName})</span>
                            </li>
                        ))}
                    </ul>
                )}
            </label>
        </form>
    );
}

export default SearchBar;
