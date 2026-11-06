import { useState, useEffect } from "react";

function TopScorers() {
    const [scorers, setScorers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopScorers = async () => {
            try{
                //fetch
                const response = await fetch("/api/v4/competitions/2001/scorers", {
                    // the API requires a HTTP header with the auth token (to enforce the limits of using the API)
                    headers: {'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_TOKEN}
                });
                const data = await response.json();
                // API wraps the scorers in a "scorers" array
                setScorers(data.scorers);
                
            } catch (error) {
                console.error("Failed to fetch top scorers:", error);
                
            } finally{
                setLoading(false);
            }
        };
        fetchTopScorers();
    }, []);

    return (
        <>
        <h1>Top Scorers</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <ol>
                {scorers.map((scorer) => (
                    <li key={scorer.player.id}>
                        {scorer.player.name} - {scorer.goals} goals
                    </li>
                ))}
            </ol>
        )}
        </>
    )
}
export default TopScorers;