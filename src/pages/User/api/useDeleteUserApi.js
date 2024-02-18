import {gql,useMutation,useQuery} from '@apollo/client';

export default function useDeleteUserApi(){

    const deleteUserMutation = gql`
        mutation DeleteUser($id: ID!) {
            deleteUser(ID: $id)
        }`;

    const [deleteUser, { data: res, loading,called }] = useMutation(deleteUserMutation);

    const deleteUserToApi = async (id) => {
        try {
            const { data } = await deleteUser({
                variables: { id:id}
            });
            return data.createUser;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };

    return {
        deleteUserToApi,
        res,
        loading,
        called
    }
}