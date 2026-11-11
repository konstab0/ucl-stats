import { useState, useEffect } from "react";
import { fetchWithCache } from "../cache.js";
// dynamic stuff so we need useState to update scorers list and effect to fetch data from API

function TopScorers() {
    const [scorers, setScorers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopScorers = async () => {
            try {
                //fetch
                const data = await fetchWithCache("/api/v4/competitions/2001/scorers", {
                    // the API requires a HTTP header with the auth token (to enforce the limits of using the API)
                    headers: { 'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_TOKEN }
                });
                // set the scorers state with the fetched data
                setScorers(data.scorers);

            } catch (error) {
                console.error("Failed to fetch top scorers:", error);

            } finally {
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
                <div>
                    {scorers.map((scorer) => (
                        <div className="card bg-dark text-light mb-3" key={scorer.player.id}>
                            <div className="card-body d-flex align-items-center gap-3">
                                {scorer.team.crest && (
                                    <img
                                        src={scorer.team.crest}
                                        alt=""
                                        width="48"
                                        height="48"
                                        className="object-fit-contain"
                                    />
                                )}

                                <div className="flex-grow-1">
                                    <h2 className="h5 mb-1">{scorer.player.name}</h2>
                                    <div>{scorer.team.name}</div>
                                </div>

                                <div className="fw-bold">{scorer.goals} goals</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
export default TopScorers;