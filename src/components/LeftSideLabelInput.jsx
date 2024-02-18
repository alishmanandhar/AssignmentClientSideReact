import { Flex, Input, Text } from "@chakra-ui/react"

// global input
const LeftSideLabelInput = ({label, inputType, placeholder, defaultValue, required,name, register}) => {
    return (
        <Flex gap={'1rem'} mb={'0.5rem'} mt={'0.5rem'}>
            <Text width={"7rem"}>{label}{required?"*":""}</Text>
            {/* using react hook form */}
            {
                inputType == "Date" ?
                <Input 
                    type={inputType}
                    placeholder={placeholder}
                    defaultValue={defaultValue?.split('T')[0]}
                    required={required}
                    {...register(name)}
                    />
                :
                <Input 
                    type={inputType}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    required={required}
                    {...register(name)}
                    />
            }
        </Flex>
    )
}

export default LeftSideLabelInput;