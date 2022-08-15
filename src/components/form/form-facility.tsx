import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { facilityKind } from "../../utils/constants";
import { Facility } from "../../utils/firebase/firestore";

type Props = {
    facility: Facility
}

const FacilityComponent: React.FC<any> = (props: Props) => {
    console.log(props.facility)
    const handleSubmit = () => null
    const [name, setName] = useState(props.facility.name);
    const [firstRegistered, setFirstRegistred] = useState(props.facility.firstRegistered.toDateString);
    const [id, setId] = useState(props.facility.id);
    const [kind, setKind] = useState(props.facility.kind);
    const [lastChanged, setLastChanged] = useState(props.facility.lastChanged);
    const [lastChangedBy, setLastChangedBy] = useState(props.facility.lastChangedBy);
    const [lngLatLike, setLngLatLike] = useState(props.facility.lngLatLike);
    

    return (
        <Box w='100%' p='6'>
            <FormControl>
                <FormLabel>店名</FormLabel>
                <Input 
                    placeholder="店名"
                    value={name}
                    onChange={e => setName(e.target.name)}
                />
                <FormLabel>種類</FormLabel>
                    <Select placeholder="種類">
                        <option>ラーメン</option>
                    </Select>
            </FormControl>
        </Box>
        // <form onSubmit={handleSubmit}>
        //     <label>
        //         店名: 
        //         <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        //     </label>
        //     <label>
        //         種類: 
        //         <input type="text" value={kind} onChange={e => setKind(e.target.value)}/>
        //     </label>
        //     <label>
        //         種類: 
        //         <input type="text" value={kind} onChange={e => setKind(e.target.value)}/>
        //     </label>
        // </form>
    )
}

export default FacilityComponent