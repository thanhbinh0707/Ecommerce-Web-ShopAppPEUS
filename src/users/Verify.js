import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../helper/AxiosInstance";
const Verify = (props) => {
    const {id} = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const verify = async () => {
         try {
             const res = await AxiosInstance().post(`/users/verify/${id}`);
             console.log(res);
             // Assuming the server sends back a simple true/false or a JSON object
             setResult(res.data); // or a specific field like res.data.success
         } catch (err) {
             console.log(err);
             setResult(false);
         }
        };
        verify();
     }, [id]);
     
   
    
     if (result === null) {
        return (
            <div>
                <h1>Verifying...</h1>
                <p>Please wait, do not close this window.</p>
            </div>
        );
    } else if (result === false) {
        return (
            <div>
                <h1>Verification failed...</h1>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Verification successful!</h1>
                <p>You can close this window...</p>
            </div>
        );
    }
   

};
export default Verify;



