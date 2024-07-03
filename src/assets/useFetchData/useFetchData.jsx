import {useState, useEffect} from 'react'

/*
* Return loading data
* @param {sting} url - url of api to load
* @returns { Object }
*/
const useFetchData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const url = 'http://localhost:3001/user/login';
    //const data = { email: 'tony@stark.com', password: 'password123' };
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { data, loading, error };
  };
  
  export default useFetchData;

  /*
const url = 'https://api.example.com/resource';
const data = { key1: 'value1', key2: 'value2' };

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
  */