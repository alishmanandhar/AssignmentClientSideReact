import TableCompoenent from "../../../components/Table";
import {USER_FIELDS} from "../../../constants/Constants"
import {
    Tr,
    Td,
    Flex,
    Skeleton,
    Divider,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
  } from '@chakra-ui/react'
import { useGetUserListApi } from "../api/useGetUserListApi";
import { FiEdit3, FiPlusSquare, FiSearch } from "react-icons/fi";
import Title from "../../../components/Title";
import SubTitle from "../../../components/SubTitle";
import { Link } from "react-router-dom";
import DeleteUser from "../Delete/DeleteUser";
import { useEffect, useState } from "react";

// main component
const UserList = () => {

    const [search,setSearch] = useState("");
    const [sort, setSort] = useState("desc");
    const {data, loading,refetch} = useGetUserListApi(20,search,sort);

    useEffect(()=>{
        refetch();
    },[search, sort])

    return (
        <>
            <Flex justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={'2rem'}>
                    <Title title={"USER LIST"} />

                    {/* Search user by name */}
                    <InputGroup minW={"15rem"}>
                        <InputLeftElement pointerEvents='none'>
                            <FiSearch />
                        </InputLeftElement>
                        <Input type='text' placeholder='Username' onChange={(e)=>setSearch(e.target.value)} />
                    </InputGroup>

                    {/* Sorting user data by created date */}
                    <Select onChange={(e)=>setSort(e.target.value)} defaultValue={"desc"}>
                        <option value='asc'>Ascending</option>
                        <option value='desc'>Decending</option>
                    </Select>

                </Flex>

                {/* add user route */}
                <Link to={'/add-user'}>
                    <Flex alignItems={'center'} gap={'0.5rem'} cursor={'pointer'}>
                        <SubTitle subtitle={'Add User'}/>
                        <FiPlusSquare fontSize={'1.5rem'} />
                    </Flex>
                </Link>

            </Flex>

            <Divider/>

            {/* Table component */}
            <TableCompoenent header={USER_FIELDS} row={<UserListRow data={data} loading={loading} refetch={refetch} />} />
        </>
    )
}

// table list row
const UserListRow = ({data, loading,refetch}) => {

    useEffect(()=>{
        refetch();
    },[])

    // data is loading
    if(loading) return (
        <>
            <Shimmer />
            <Shimmer />
            <Shimmer />
        </>
    )

    // map user data
    return (
        data?.getUsers?.map((item)=>(
            <Tr key={item.id}>    
                <Td>{item.name}</Td> 
                <Td>{item.age}</Td> 
                <Td>{item.bio}</Td> 
                <Td>{item.createdAt.split('T')[0]}</Td> 
                <Td>
                    {/* update and delete user account */}
                    <Flex gap={2}>
                        <Link to={`/edit-user/${item.id}`}>
                            <FiEdit3 color="blue" />
                        </Link>
                        
                        <DeleteUser username={item.name} id={item.id} refetch={refetch}/>
                    </Flex>
                </Td> 
            </Tr>
        ))
    )
}

// adding shimmer effect on data loading
const Shimmer = () => {
    return (
        <Tr>
            <Td><Skeleton height='20px' /></Td>
            <Td><Skeleton height='20px' /></Td>
            <Td><Skeleton height='20px' /></Td>
            <Td><Skeleton height='20px' /></Td>
            <Td><Skeleton height='20px' /></Td>
        </Tr>
    )
}

export default UserList;