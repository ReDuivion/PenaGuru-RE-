'use client'
import { supabase} from "../../config/supabase"
import { useState, useEffect} from "react"

export default function Page() {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        async function ambilList() {
            try {
               const {data, error} = await supabase
            }
        }
    })
    return(
        <>
        
        </>
    )
}
