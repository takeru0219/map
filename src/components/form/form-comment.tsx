import { 
    Box, 
    Button, 
    Container, 
    Divider, 
    HStack,
    Text,
    Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { Facility, Comment } from "../../utils/firebase/firestore";
import timestampToDate from '../../utils/constants';

type Props = {
    facility?: Facility,
    onCommentSubmit(): void
}

const CommentComponent: React.FC<any> = ({facility, onCommentSubmit}: Props) => {
    const [inputComment, setInputComment] = useState<string | null>(null);
    const comments: Comment[] | null = facility ? facility.comment : null

    return (
        <Box w='100%' p='6'>
            <Text marginBottom='4'>みんなのコメント</Text>
            {comments && comments.map((c) => (
                <Container key={c.id}>
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
            ))}
            {facility && (
                <HStack>
                    <Textarea 
                    placeholder='コメントを入力してください'
                    onChange={(e) => setInputComment(e.target.value)} />
                    <Button
                    onClick={(e) => onCommentSubmit()}>登録</Button>
                </HStack>
            )}
        </Box>
    )
}

export default CommentComponent