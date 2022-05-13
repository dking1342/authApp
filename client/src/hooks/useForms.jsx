import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { UserContext } from '../store/user';
import { callback, useFetch } from './useFetch';



export const useForms = (initialState) => {
    const [values,setValues] = useState(initialState);
    const [formData,setFormData] = useState(null);
    const [formError,setFormError]=useState(null);
    const [url,setUrl]=useState(null);
    const [method,setMethod]=useState(null);
    const history = useHistory();
    const { userLogin, loginError } = useContext(UserContext);

    const resolve = (result) => {
        if(result){
            if(result.success){
                userLogin(result.payload);
                history.push('/dashboard');
            }
            if(!result.success){
                setFormError(result.payload);
                loginError(result.payload);
            }
        }
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]:e.target.value
        });
    }

    const resetForm = () => {
        setValues(initialState);
    }

    let { 
        data, 
        isLoading, 
        loadData 
    } = useFetch({
        fetchFn:()=>
            callback(`http://localhost:5000/api/auth/${url}`,method,values)
    })

    const onSubmit = (e,formUrl,formMethod) => {
        e.preventDefault();
        setUrl(formUrl);   
        setMethod(formMethod);   
    }

    useEffect(()=>{
        if(url){
            loadData();
            resetForm();
        }
    },[url])

    useEffect(()=>{
        setFormData(data);
        resolve(formData);
    },[data,isLoading,formData]);

    return {
        values,
        isLoading,
        formError,
        setFormError,
        onChange,
        onSubmit,
        resetForm,
    }
}