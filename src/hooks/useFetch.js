import { useState, useEffect } from "react"

const useFetch = (url, options) => {

    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [res_status, setStatus] = useState(0);
    
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
                    setData(content);
                    setError(null);
                }   
            }
            catch(err) {
                setError(err.message);
                console.log("Error",error);
            }
          };
      
        fetchData();
       
        return () => {
            success = false;
            console.log('unmount');
        };
    
        
      }, [url,error]);

      
    return {data,res_status};
    
};

export default useFetch;