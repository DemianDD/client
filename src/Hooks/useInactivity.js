import { useEffect } from "react";
import localStorageService from "../Services/localStorage.service";

function useInactivity(state, setState, callback){
    useEffect(() => {
        const storedToken = localStorageService.getToken();
        if (storedToken) {
            setState(storedToken);
        }
    
        localStorageService.saveLastActivity();
    
        const activityCheckLoop = setInterval(() => {
          if (state) {
            const lastActivity = localStorageService.getLastActivity();
            const lastActivityDate = lastActivity ? new Date(lastActivity) : new Date();
            const now = new Date();
      
            if ((now - lastActivityDate) > (60 * 1000)) {
                callback();
            }
            console.log('checked activity timer');
          }
        }, 15 * 1000);
    
        return () => clearInterval(activityCheckLoop);
    }, [state]);

    const updateLastActivity = () => {
        localStorageService.saveLastActivity();
        console.log('reset activity timer')
    };

    return updateLastActivity;
}

export default useInactivity;