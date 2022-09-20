import { useState, useEffect } from "react"
import bindResult from "../functions/bindResult";

const useFetch = (url, options, counter, click, selected) => {
    
    const [data,setData] = useState('');
    const [error,setError] = useState(null);
    const [res_status, setStatus] = useState(0);
    const [timestamp, setTimestamp] = useState('');
    
    useEffect(() => {
        let success = true;
        const fetchData = async () => {

            try {
                const response = await fetch(url, options);
                
                setStatus(response.status);
                if (!response.ok) {
                    throw new Error(
                      `${response.status} ${response.statusText}`
                    );
                }
                const content = await response.json();

                if(success){
                    setData(bindResult(content, selected));
                    setError(null);
                }   
            }
            catch(err) {
                setError(err.message);
            }
            const time = new Date();
            setTimestamp(time);
          };
        if (click){
            fetchData();
        }
       
        return () => {
            success = false;
        };
    
        
      }, [counter]);

    if (!data){
        // setData('');
    }
    
    return {data,res_status, timestamp, error};
    
};

export default useFetch;