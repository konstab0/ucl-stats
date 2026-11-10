import { useState, useEffect } from "react";

function Standings() {
    const [standing, setStanding] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await fetch("/api/v4/competitions/2001/standings", {
                    headers: {'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_TOKEN}
                });
                const data = await response.json();
                setStanding(data.standings[0].table);
            } catch (error) {
                console.error("Failed to fetch standings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStandings();
    }, []);
    return (
        <>
        <h1>Standings</h1>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <ol>
                {standing.map((team) => (
                    <li key={team.team.id}>
                        {team.team.name} - {team.points} points
                    </li>
                ))}
            </ol>
        )}
        </>
    )
}
export default Standings;