import { useEffect, useState } from 'react';
import axios from '../config/axios';

export const getData = (url, setLoading, setError, setData) => {
    setLoading(true);
    axios
        .get(url)
        .then(res => {
            const d = res.data;
            if (d.code) {
                setError(d.message);
            } else {
                setData(d);
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => setLoading(false));
};

export const useGetData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData(url, setLoading, setError, setData);
    }, []);

    return {
        data,
        loading,
        error,
    };
};

export const usePostData = (url, data) => {
    return function (setLoading, setData, setError) {
        setLoading(true);
        axios
            .post(url, data)
            .then(response => {
                const d = response.data;
                if (d.code) {
                    setError(d.message);
                } else {
                    setError(null);
                    setData(d);
                }
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    };
};