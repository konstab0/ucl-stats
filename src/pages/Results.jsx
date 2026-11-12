import { useState, useEffect } from "react";
import { fetchWithCache } from "../cache.js";
// dynamic stuff again so we use state and effect hooks

function Results() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // returns already existing cache or fetches from API and saves it in the cache
                // also im calling the variable "data" because its already parsed from the response inside the fetchWithCache function
                const data = await fetchWithCache("/v4/competitions/2001/matches?status=FINISHED");
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
                <div>
                    {results.slice(-10).reverse().map((match) => (
                        <div className="card bg-dark text-light mb-3" key={match.id}>
                            <div className="card-body">
                                <p className="text-center">
                                    {new Date(match.utcDate).toLocaleDateString('fi-FI')}
                                </p>

                                <div className="row align-items-center text-center">
                                    <div className="col-4">
                                        {match.homeTeam.crest && (
                                            <img
                                                src={match.homeTeam.crest}
                                                alt=""
                                                width="48"
                                                height="48"
                                                className="object-fit-contain mb-2"
                                            />
                                        )}
                                        <div>{match.homeTeam.name}</div>
                                    </div>

                                    <div className="col-4 fs-4 fw-bold">
                                        {match.score.fullTime.home} - {match.score.fullTime.away}
                                    </div>

                                    <div className="col-4">
                                        {match.awayTeam.crest && (
                                            <img
                                                src={match.awayTeam.crest}
                                                alt=""
                                                width="48"
                                                height="48"
                                                className="object-fit-contain mb-2"
                                            />
                                        )}
                                        <div>{match.awayTeam.name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
export default Results;