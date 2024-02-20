import { useForm } from "react-hook-form"
import useAddUserApi from "../api/useAddUserApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// this is logic part for add user form
// logic and ui has been separated
export function useAddUser() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid,isDirty,errors },
      } = useForm({ 
        defaultValues:{name:"",age:null,bio:""},
        mode: "onChange",criteriaMode: "all"
    });

    const { addUserToApi, loading, res,called } = useAddUserApi();

    const onSubmit = async (data) => {
        try{
            await addUserToApi(data);
        }catch(error){
            console.error('Error submitting user data:', error);    
        }
    }

    useEffect(()=>{
        if(res && called) {
              reset();
              navigate("/");
        }
    },[res])

    return {
        register,
        handleSubmit,
        onSubmit,
        res,
        loading,
        isValid,
        isDirty,
        errors
    }
}