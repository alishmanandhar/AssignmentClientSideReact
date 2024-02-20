import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";


// Table global component
const TableCompoenent = ({headerSort,setHeaderSort,row}) => {
    
    useEffect(()=>{
        setHeaderSort(prevHeaderSort => (
            prevHeaderSort.map(item => ({
                ...item,
                sortType: 'desc' // Set sortType to 'Desc' for each object
            }))
        ));
    },[])


    const handleSortClick = (index, sortTyp) => {
        setHeaderSort(prevHeaderSort => {
            const updatedHeader = prevHeaderSort.map((item, i) => {
                if (i === index && item.sort) {
                    return {
                        ...item,
                        sortType: sortTyp // Set sortType to ASC for the clicked item
                    };
                }
                return item;
            });
            return updatedHeader;
        });
    };

    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    {
                        headerSort?.map((item,index)=>(
                            <Th key={index}>
                                <Flex alignItems={"center"} gap={'0.5rem'}>
                                    {item.label}
                                    {
                                        item.sort && <>
                                            {
                                                item?.sortType == "desc"?
                                                <AiOutlineArrowDown cursor={"pointer"} fontSize={"1rem"}  onClick={() => handleSortClick(index,"asc")} />
                                                :
                                                <AiOutlineArrowUp cursor={"pointer"} fontSize={"1rem"}  onClick={() => handleSortClick(index,"desc")} />
                                            }
                                        </>
                                    }

                                </Flex>
                            </Th>
                        ))
                    }

                </Tr>
                </Thead>
                <Tbody>
                    {row}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableCompoenent;