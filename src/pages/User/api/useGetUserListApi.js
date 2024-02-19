import {gql,useQuery} from '@apollo/client';

export const useGetUserListApi = (number,name,sort,pageNumber) => {

    const getUsers = gql`
        query GetUsers($pageNumber:Int, $number: Int,$name: String, $sort: String ){
            getUsers(pageNumber:$pageNumber, number: $number, name: $name, sort: $sort) {
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
          sort:sort,
          pageNumber:pageNumber
        }
      });

    return {
        data,
        loading,
        refetch
    }
}