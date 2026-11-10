import { useState, useEffect } from "react";
// dynamic stuff again so we use state and effect hooks

function Results(){
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch("/api/v4/competitions/2001/matches?status=FINISHED", {
                    headers: {'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_TOKEN}
                });
                const data = await response.json();
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
                {results.map((match) => (
                    <li key={match.id}>
                        {match.homeTeam.name} {match.score.fullTime.home} - {match.score.fullTime.away} {match.awayTeam.name}
                    </li>
                ))}
            </ul>
        )}
        </>
    )
}
export default Results;