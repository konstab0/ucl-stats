import { useState, useEffect } from "react";
import { fetchWithCache } from "../cache.js";
// dynamic stuff so we need useState to update scorers list and effect to fetch data from API

function TopScorers() {
    const [scorers, setScorers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopScorers = async () => {
            try{
                //fetch
                const data = await fetchWithCache("/api/v4/competitions/2001/scorers", {
                    // the API requires a HTTP header with the auth token (to enforce the limits of using the API)
                    headers: {'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_TOKEN}
                });
                // set the scorers state with the fetched data
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