import {gql,useMutation} from '@apollo/client';

export default function useAddUserApi(data){

    const addUserMutation = gql`
        mutation CreateUser($userInput: UserInput!) {
            createUser(userInput: $userInput) {
            age
            bio
            name
            }
        }`;

    const [addUser, { data: res, loading,called }] = useMutation(addUserMutation);

    const addUserToApi = async (userData) => {
        try {
            const { data } = await addUser({
                variables: { userInput: {
                    name: userData.name,
                    age: parseInt(userData.age),
                    bio: userData.bio
                } }
            });
            return data.createUser;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    };

    return {
        addUserToApi,
        res,
        loading,
        called
    }
}