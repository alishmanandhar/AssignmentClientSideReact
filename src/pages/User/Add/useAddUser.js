import { useForm } from "react-hook-form"
import useAddUserApi from "../api/useAddUserApi";
import { useEffect } from "react";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

// this is logic part for add user form
// logic and ui has been separated
export function useAddUser() {

    const toast = useToast();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitSuccessful,isValid,isDirty,errors },
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
        if(isSubmitSuccessful) {
            toast({
                title: 'User created.',
                description: "We've created user account.",
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              
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