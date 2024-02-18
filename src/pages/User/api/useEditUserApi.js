import {gql,useMutation,useQuery} from '@apollo/client';

export default function useEditUserApi(){

    const editUserMutation = gql`
        mutation EditUser($id: ID!, $userInput: UserInput) {
            editUser(ID: $id, userInput: $userInput)
          }`;

    const [editUser, { data: res, loading,called }] = useMutation(editUserMutation);

    const editUserToApi = async (userData) => {
        try {
            const { data } = await editUser({
                variables: { id:userData.id,userInput: {
                    name: userData.name,
                    age: parseInt(userData.age),
                    bio: userData.bio,
                    createdAt: userData.createdAt
                } }
            });
            return data.createUser;
        } catch (error) {
            console.error('Error editing user:', error);
            throw error;
        }
    };

    return {
        editUserToApi,
        res,
        loading,
        called
    }
}