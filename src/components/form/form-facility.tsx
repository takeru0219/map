import { 
    Box, 
    FormControl, 
    FormLabel, 
    Flex,
    Input, 
    Select,
    Text, } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { facilityKind } from "../../utils/constants";
import { Facility } from "../../utils/firebase/firestore";
import timestampToDate from '../../utils/constants';

type Props = {
    facility?: Facility,
    onSubmitChange(): void
}

const FacilityComponent: React.FC<any> = ({facility, onSubmitChange}: Props) => {
    const [name, setName] = useState<string | null>();
    const [kind, setKind] = useState<string | null>();
    
    useEffect(() => {
        setName(facility?.name)
        setKind(facility?.kind)
    }, [facility])
    
    return (
        <Box w='100%' p='6' key={facility?.id}>
            <Text marginBottom='4'>お店の情報</Text>
            <FormControl>
                <Box marginBottom='1em'>
                    <FormLabel>店名</FormLabel>
                    <Input
                        placeholder="店名"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>
                <Box marginBottom='1em'>
                <FormLabel>種類</FormLabel>
                    <Select onChange={(e) => setKind(e.target.value)} placeholder='種類'>
                        {facility && <option selected>{facility.kind}</option>} 
                        {facilityKind.filter((f) => 
                            f != facility?.kind).map((e) => 
                                <option>{e}</option>)}
                    </Select>
                </Box>
                {facility && (
                    <Flex direction={['column', 'row']} justifyContent='space-between'>
                        <Box marginBottom='1em'>
                            <Text textAlign='right'>
                                最終更新日: {timestampToDate(facility.lastChanged)}
                            </Text>
                            <Text textAlign='right'>
                                最終更新者: {facility.lastChangedBy}
                            </Text>
                        </Box>
                        <Box marginBottom='1em'>
                            <Text textAlign='right'>
                                登録日: {timestampToDate(facility.firstRegistered)}
                            </Text>
                            <Text textAlign='right'>
                                ID: {facility.id}
                            </Text>
                        </Box>
                    </Flex>
                )}
            </FormControl>
        </Box>
    )
}

export default FacilityComponent