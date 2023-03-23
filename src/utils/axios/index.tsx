import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseAxiosProps {
  url: string;
  type?: 'GET' | 'POST' | 'DELETE';
  dataPost?: any;
}

const useAxios = ({ url, type = 'GET', dataPost }: UseAxiosProps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: type,
          url: `${endpoint}${url}`,
          ...(type === 'POST' && { data: { ...dataPost } }),
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useAxios;
