import Axios from 'axios'
export default {
    // videoList : (UID)=>{
    //     return fetch('http://192.168.0.104:3000/videoList/'+UID)
    //             .then(res=>{
    //                 if(res.status !== 401){
    //                     return res.json().then(data => data);
    //                 }
    //                 else
    //                     return {result:"error"};
    //             });
    // }, 

    isAuthenticated : (UID) =>{
        // const data = {UID:UID}
      return Axios.get('http://192.168.0.104:3000/isAuth'+UID).then((res) => {
            if(res.status !== 401){
                return res.data;
            }
            else
                return { isAuthenticated : false};
        })
    }

    
    // videoList : ()=>{
    //     return fetch('https://rishabh-arch.github.io/signage_react_native_tv/assets/videoList.json')
    //             .then(res=>{
    //                 if(res.status !== 401){
    //                     return res.json().then(data => data);
    //                 }
    //                 else
    //                     return {result:"error"};
    //             });
    // }
}