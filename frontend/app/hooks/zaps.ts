"use client"
import { useEffect, useState } from "react";
import { Zap } from "../types/zap";
import axios from "axios";

export function useZaps(){
    const [loading , setLoading]  = useState(false);
    const [zaps , setZaps] = useState<Zap[]>([]);
    useEffect(() => {
        const getzap = async () => {
            setLoading(true);
                const res = await axios.get("http://localhost:3001/api/v1/zap/userzap" , {
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setZaps(res.data.zaps);
                setLoading(false) 
        }
        getzap();   
    } , [])
    return {loading , zaps}
}