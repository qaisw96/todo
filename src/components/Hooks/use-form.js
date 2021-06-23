import { useState} from 'react'

const useForm = () => {
    const [item, setItem] = useState({})

    const handleInputChange = e => {
      setItem({ ...item, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      e.target.reset();
      setItem({});
    };
    return { item, setItem, handleInputChange,  handleSubmit }
  
}

export default useForm