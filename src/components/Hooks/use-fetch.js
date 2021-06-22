import superagent from 'superagent'
import { useState, useEffect } from 'react'
// const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [finishLoading, setFinishLoading] = useState(false)
  
  useEffect(() => {
      setIsLoading(true)
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setData(result.results)
          setIsLoading(false)
          setFinishLoading(true)
        })
// fetchData()
  }, [url])
return { data, isLoading, finishLoading }
  }
        

export default useFetch
