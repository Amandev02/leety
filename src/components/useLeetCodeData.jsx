import { useState, useEffect } from "react";

const useLeetCodeData = (username) => {
    const [data, setData] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const statsResponse = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
                const detailsResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);

                if (!statsResponse.ok || !detailsResponse.ok) {
                    throw new Error("Failed to fetch data");
                }

                const statsData = await statsResponse.json();
                const userDetailsData = await detailsResponse.json();

                setData(statsData);
                setUserDetails(userDetailsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    return { data, userDetails, loading, error };
};

export default useLeetCodeData;
