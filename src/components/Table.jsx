import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'

// Table global component
const TableCompoenent = ({header,row}) => {
    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    {
                        header?.map((item,index)=>(
                            <Th key={index}>{item}</Th>
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