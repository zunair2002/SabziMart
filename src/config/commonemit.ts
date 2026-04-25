import axios from "axios";


async function commonemitHandler(event:string,data:any,socketid?:string){
try {
    await axios.post('http://localhost:4000/notify',{socketid,event,data})
} catch (error) {
    console.log(error);
}
}

export default commonemitHandler;