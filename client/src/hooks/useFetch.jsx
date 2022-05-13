import { useCallback, useEffect, useState } from 'react';

export const callback = (url,method='GET',body=null,token=null) => {
    if(method === 'GET'){
        return fetch(url)
    } else {
        return fetch(url,{
            method,
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer  ${token}`
            },
            body:JSON.stringify(body)
        })
    }
}

// Options:
// fetchFn (required): the function to execute to get data
// loadOnMount (opt): load the data on component mount
// clearDataOnLoad (opt): clear old data on new load regardless of success state
export const useFetch = ({
    loadOnMount = false,
    clearDataOnLoad = false,
    fetchFn = null,
  } = {}) => {
    // Our data fetching state variables
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
  
    // A function to handle all the data fetching logic
    const loadData = useCallback(async (event) => {
      setIsLoading(true);
      setError();
      if (clearDataOnLoad === true) setData();
  
      try {
        const resp = await fetchFn(event);
        let d = await resp.json();
        setData(d);
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    },[clearDataOnLoad,fetchFn]);
  
    // 'onMount'
    // maybe load the data if required
    useEffect(() => {
      if (loadOnMount && fetchFn !== null) loadData();
    }, [fetchFn,loadData,loadOnMount]);
  
    // Return the state and the load function to the component
    return { data, isLoading, error, loadData };
  };
