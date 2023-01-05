import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import ImageDrop from '@components/ImageDrop';

interface PostFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
  handleDrop: (acceptedFiles: File[]) => void;
  handleDelete: (index: number) => void;
  images: File[];
  formRef: React.RefObject<HTMLFormElement>;
}

function PostForm({
  handleSubmit,
  formRef,
  handleCancel,
  images,
  handleDrop,
  handleDelete,
}: PostFormProps) {
  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <FormControl maxWidth={'4xl'} mt={8}>
        <FormLabel>Track Name</FormLabel>
        <Input
          type={''}
          placeholder={'California Rocky Trail'}
          name={'trackName'}
        />
        <FormHelperText>
          This is the post title that will be shared with other users
        </FormHelperText>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'center', md: 'space-between' }}
          gap={{ base: 2, md: 100 }}
          alignItems={'center'}
          mt={8}
          width={'100%'}
        >
          <Container p={0}>
            <FormLabel>Time to Complete</FormLabel>
            <Input
              placeholder="Time to finish the track"
              size="md"
              type="time"
              name={'timeToComplete'}
            />
          </Container>
          <Container p={0} width={'fit-content'}>
            <FormLabel mt={5}>I was ...</FormLabel>
            <RadioGroup defaultValue="2" name={'activityType'}>
              <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="1">
                  Walking
                </Radio>
                <Radio colorScheme="green" value="2">
                  Biking
                </Radio>
                <Radio colorScheme="blue" value="3">
                  Hiking
                </Radio>
              </Stack>
            </RadioGroup>
          </Container>
          <Container p={0} width={'fit-content'}>
            <FormLabel mt={5}>Difficulty</FormLabel>
            <RadioGroup defaultValue="2" name={'difficulty'}>
              <Stack spacing={5} direction="row">
                <Radio colorScheme="green" value="1">
                  Easy
                </Radio>
                <Radio colorScheme="yellow" value="2">
                  Medium
                </Radio>
                <Radio colorScheme="red" value="3">
                  Hard
                </Radio>
              </Stack>
            </RadioGroup>
          </Container>
        </Flex>
        <FormLabel mt={8}>Description</FormLabel>
        <Textarea
          placeholder={'This is a great trail to hike with your dog ...'}
          minHeight={60}
          name={'description'}
        />

        <Center mt={8}>
          <ImageDrop
            images={images}
            onDrop={handleDrop}
            onDelete={handleDelete}
          />
        </Center>

        <Flex justifyContent="flex-end" mt={4}>
          <Button
            colorScheme="red"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </Button>
          <Button colorScheme="yellow" ml={3} type={'reset'}>
            Reset
          </Button>
          <Button ml={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
}

export default PostForm;
