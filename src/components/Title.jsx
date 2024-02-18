import { Text } from "@chakra-ui/react"

// use this component for title for all pages
const Title = ({title}) =>{
    return (
        <Text minW={"15rem"} fontSize={'1.5rem'} mb={'0.5rem'} mt={'0.5rem'} fontWeight={'semibold'}>
            {title}
        </Text>
    )
}

export default Title;