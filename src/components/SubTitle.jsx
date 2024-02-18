import { Text } from "@chakra-ui/react"

// use this component for sub-title for all pages
const SubTitle = ({subtitle}) =>{
    return (
        <Text fontSize={'1rem'} mb={'0.5rem'} mt={'0.5rem'} fontWeight={'500'}>
            {subtitle}
        </Text>
    )
}

export default SubTitle;