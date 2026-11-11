import { useState, useEffect } from "react";
import { fetchWithCache } from "../cache.js";
// dynamic stuff again so we use state and effect hooks

function Results(){
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // returns already existing cache or fetches from API and saves it in the cache
                // also im calling the variable "data" because its already parsed from the response inside the fetchWithCache function
                const data = await fetchWithCache("/api/v4/competitions/2001/matches?status=FINISHED", {
                    headers: {'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_TOKEN}
                });
                // set the results state with the fetched data
                setResults(data.matches);
            } catch (error) {
                console.error("Failed to fetch results:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    return (
        <>
        <h1>Results</h1>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <ul>
                {results.slice(-10).reverse().map((match) => (
                    <li key={match.id}>
                        {match.homeTeam.name} {match.score.fullTime.home} - {match.score.fullTime.away} {match.awayTeam.name} ({new Date(match.utcDate).toLocaleDateString('fi-FI')})
                    </li>
                ))}
            </ul>
        )}
        </>
    )
}
export default Results;