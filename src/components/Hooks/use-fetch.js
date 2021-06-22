import { useState, useEffect } from 'react'
import axios from 'axios'


const useFetch =  () => {
  const [isLoading, setIsLoading] = useState(false)
  const [finishLoading, setFinishLoading] = useState(false)

    const api = async (method, url, item) => {
      setIsLoading(true)
      const toDo= await axios({
        method: method,
        url: url,
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        data: item,
        })
        setIsLoading(false)
        setFinishLoading(true)
        return toDo.data ; 
    }
  return { api,  isLoading, finishLoading}
}


export default useFetch
