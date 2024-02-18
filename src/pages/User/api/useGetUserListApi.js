import {gql,useQuery} from '@apollo/client';

export const useGetUserListApi = (number,name,sort) => {

    const getUsers = gql`
        query GetUsers($number: Int,$name: String, $sort: String ){
            getUsers(number: $number, name: $name, sort: $sort) {
            id
            name
            age
            bio
            createdAt
            }
        }`;

    const {data, loading,refetch} = useQuery(getUsers, {
        variables:{
          number: number,
          name:name,
          sort:sort
        }
      });

    return {
        data,
        loading,
        refetch
    }
}