import { Button, Divider, Flex, Spinner } from "@chakra-ui/react"
import Title from "../../../components/Title"
import { FiArrowLeft } from "react-icons/fi"
import { Link } from "react-router-dom"
import LeftSideLabelInput from "../../../components/LeftSideLabelInput"
import {useAddUser} from "./useAddUser"
import { useEffect } from "react"

const AddUser = () =>{

    const {register, handleSubmit, onSubmit, res, loading} = useAddUser();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex alignItems={'center'} gap={'0.5rem'}>
                <Link to={"/"}><FiArrowLeft fontSize={'1.5rem'} /></Link>
                <Title title={"Add User"} />
            </Flex>
            <Divider/>
        {/* User Add Form starts here */}
            <LeftSideLabelInput register={register} name="name" label={"Full Name"} placeholder={"John Doe"} inputType={"text"} required={true} />
            <LeftSideLabelInput register={register} name="age" label={"Age"} placeholder={"30"} inputType={"number"} required={true}/>
            <LeftSideLabelInput register={register} name="bio" label={"Bio"} placeholder={"Something about yourself!"} inputType={"textarea"} />
            <Button w={'10rem'} type="submit" disabled={loading}>
                Save
                {loading? <Spinner/> :""}
            </Button>
        </form>
    )
}

export default AddUser;