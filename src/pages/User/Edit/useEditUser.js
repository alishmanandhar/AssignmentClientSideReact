import { useForm } from "react-hook-form"
import useEditUserApi from "../api/useEditUserApi";

// logic part has been separated from ui part
// this is logic part of edit user account form
export function useEditUser() {


    const {
        register,
        handleSubmit,
        formState: { isValid,isDirty,errors }
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