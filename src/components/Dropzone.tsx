import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, useColorModeValue, Icon } from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';

export default function Dropzone({
  onFileAccepted,
}: {
  onFileAccepted: (acceptedFile: any) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      onFileAccepted(acceptedFiles[0]);
    },
    [onFileAccepted],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: { 'application/json': ['.json', '.gpx'] },
  });

  const dropText = isDragActive
    ? 'Drop the files here ...'
    : "Drag 'n' drop .json file here, or click to select files";

  const activeBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500',
  );

  return (
    <Center
      p={10}
      cursor="pointer"
      bg={isDragActive ? activeBg : 'transparent'}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="3px dashed"
      borderColor={borderColor}
      {...getRootProps()}
      mb={8}
    >
      <input {...getInputProps()} />
      <Icon as={AiFillFileAdd} mr={2} />
      <p>{dropText}</p>
    </Center>
  );
}
