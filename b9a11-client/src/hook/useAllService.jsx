import axios from "axios";
import { useEffect, useState } from "react";


const useAllService = () => {
    const [services, useServices] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios('https://b9a11-server-red.vercel.app/tutor');
            useServices(data);
        };
        getData();
    }, []);
    return services;
};

export default useAllService;