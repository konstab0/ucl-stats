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
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th></th>
                        <th>Team</th>
                        <th>Points</th>
                        <th>Matches</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                    </tr>
                </thead>
                <tbody>
                    {standing.map((team) => (
                        <tr key={team.team.id}>
                            <td>{team.position}</td>
                            <td><img src={team.team.crest} alt={team.team.name} width="20" /></td>
                            <td>{team.team.name}</td>
                            <td>{team.points}</td>
                            <td>{team.playedGames}</td>
                            <td>{team.won}</td>
                            <td>{team.draw}</td>
                            <td>{team.lost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </>
    )
}
export default Standings;