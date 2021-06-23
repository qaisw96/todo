import { useState, useEffect } from 'react'

const useForm = (callback) => {
    const [item, setItem] = useState({})

    const handleInputChange = e => {
      setItem({ ...item, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      // const checkAddOrUpdate = e.target.go.value
      // checkAddOrUpdate === 'add' ? props.handleSubmit(item) : props.handleUpdate(item)
      // handleSubmit(item)
      e.preventDefault();
      e.target.reset();
      callback(item)
      // setItem({});
    };
    // const handleUpdate = (e) => {
    //   e.preventDefault();
    //   e.target.reset();
    //   callback(item)
    //   setItem({});
    // };

    return { item, setItem, handleInputChange,  handleSubmit }
  
}

export default useForm