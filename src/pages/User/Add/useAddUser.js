import { useForm } from "react-hook-form"
import useAddUserApi from "../api/useAddUserApi";
import { useEffect } from "react";
import { useToast } from '@chakra-ui/react'

// this is logic part for add user form
// logic and ui has been separated
export function useAddUser() {

    const toast = useToast();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitSuccessful,errors },
      } = useForm();

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
            toast({
                title: 'User created.',
                description: "We've created user account.",
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              reset();
        }
    },[res])

    return {
        register,
        handleSubmit,
        onSubmit,
        res,
        loading
    }
}