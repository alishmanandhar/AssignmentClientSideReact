import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    useDisclosure,
    useToast,
  } from '@chakra-ui/react'
import { FiTrash } from 'react-icons/fi';
import useDeleteUserApi from '../api/useDeleteUserApi';
import { useEffect } from 'react';

const DeleteUser = ({username,id,refetch,setUserData,data}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { deleteUserToApi, loading, res,called } = useDeleteUserApi();
    const toast = useToast();

    useEffect(()=>{
        if(res?.deleteUser){
            toast({
                title: 'Account Deleted.',
                description: "We've deleted account!.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
              });
            
            onClose();
            setUserData(data.filter(item=>item.id != id))

        }
    },[res])
    
    return (
        <>
            <FiTrash cursor={'pointer'} color="red" onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Delete User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Are you sure you want to delete user {username}?</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='red' onClick={()=>deleteUserToApi(id)} >Delete</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteUser;