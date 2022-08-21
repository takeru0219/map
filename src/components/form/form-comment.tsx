import { 
    Box, 
    Button, 
    Container, 
    Divider, 
    HStack,
    Text,
    Textarea } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Facility, Comment } from "../../utils/firebase/firestore";

type Props = {
    facility: Facility
}

const CommentComponent: React.FC<any> = (props: Props) => {
    const [inputComment, setInputComment] = useState<string | null>(null);
    const comments: Comment[] = props.facility.comment

    const timestampToDate = (ts: Timestamp): string => {
        const date = ts.toDate()
        const yyyy = date.getFullYear()
        const MM = `0${date.getMonth() + 1}`.slice(-2)
        const dd = `0${date.getDate()}`.slice(-2)
        return `${yyyy}/${MM}/${dd}`
    }

    const commentContainer = (c: Comment) => (
        <Container>
            <Box p='4'>
                <Text fontSize='xl'>
                    {c.comment}
                </Text>
                <Text 
                fontSize='sm' 
                align="right">
                    登録者: {c.by}
                </Text>
                <Text 
                fontSize='sm' 
                align="right">
                    登録日: {timestampToDate(c.firstRegistered)}
                </Text>
                {/* TODO: ユーザ制御に合わせて制御する */}
                {c.by === 'takeru0219@gmail.com' && (
                    <HStack justifyContent='flex-end'>
                        <Button 
                        colorScheme='teal' 
                        size='sm'
                        marginTop='1'
                        width='50%'
                        textAlign='right'
                        onClick={(e) => {console.log(e);console.log(c)}}>
                            コメント削除
                        </Button>
                    </HStack>

                )}
            </Box>
            <Divider />
        </Container>    
    )

    return (
        <Box w='100%' p='6'>
            <Text>みんなのコメント</Text>
            {comments && comments.map(e => commentContainer(e))}
            <HStack>
                <Textarea 
                placeholder='コメントを入力してください'
                onChange={(e) => setInputComment(e.target.value)} />
                <Button>登録</Button>
            </HStack>
        </Box>
    )
}

export default CommentComponent