import { useForm } from "react-hook-form"
import useEditUserApi from "../api/useEditUserApi";
import { useEffect } from "react";
import { useToast } from '@chakra-ui/react'

// logic part has been separated from ui part
// this is logic part of edit user account form
export function useEditUser() {

    const toast = useToast();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitSuccessful,isValid,isDirty,errors }
      } = useForm({ 
        mode: "onChange",criteriaMode: "all"
    });

    const { editUserToApi, loading, res,called } = useEditUserApi();

    const onSubmit = async (data) => {
        try{
            await editUserToApi(data);
        }catch(error){
            console.error('Error submitting user data:', error);    
        }
    }

    useEffect(()=>{
        if(res && called) {
            toast({
                title: 'User Edited.',
                description: "We've edited user account.",
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
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