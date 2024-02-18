import {gql,useQuery} from '@apollo/client';

export const useGetUserByIDApi = (id) => {

    const getUserById = gql`
    query User($id: ID!) {
        user(ID: $id) {
          id
          name
          age
          bio
          createdAt
        }
      }`;

    const {data, loading} = useQuery(getUserById, {
        variables:{
          id: id
        }
      });

    return {
        data,
        loading,
    }
}