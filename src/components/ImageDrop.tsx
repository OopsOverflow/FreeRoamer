import React, { useRef, useState } from 'react';
import { Box, Flex, IconButton, Text, Icon } from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

interface Props {
  images: File[];
  onDrop: (acceptedFiles: File[]) => void;
  onDelete: (index: number) => void;
}

const ImageDropzone: React.FC<Props> = ({ images, onDrop, onDelete }) => {
  const [isHovering, setIsHovering] = useState(false);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
  });

  return (
    <Box>
      <Box
        ref={dropzoneRef}
        {...getRootProps()}
        onDragEnter={() => setIsHovering(true)}
        onDragLeave={() => setIsHovering(false)}
        rounded="md"
        p={6}
        bg={isHovering ? 'gray.300' : 'gray.100'}
        cursor={isHovering ? 'pointer' : 'default'}
        transition="all 0.2s"
        _hover={{ bg: 'teal.100' }}
        maxWidth={'md'}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Flex direction="column">
            <Icon size="48px" color="gray.500" as={FiUpload} />
            <Box ml={4}>
              <Text fontSize="lg" color="gray.500">
                Drop the files here
              </Text>
            </Box>
          </Flex>
        ) : (
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="100%"
          >
            <Icon size="48px" color="gray.500" as={FiUpload} />
            <Box ml={4}>
              <Text fontSize="lg" color="gray.500">
                Drag and drop some files here, or click to select files
              </Text>
            </Box>
          </Flex>
        )}
      </Box>
      <Box as="table" width="100%" mt={2}>
        <Box as="tbody">
          {images?.map((image, index) => (
            <Box as="tr" key={index}>
              <Box as="td" p={2}>
                <Text>image {index}</Text>
              </Box>
              <Box as="td" p={2} textAlign="right">
                <IconButton
                  size="sm"
                  aria-label="Delete image"
                  icon={<FaTrash />}
                  onClick={() => onDelete(index)}
                  variant="outline"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ImageDropzone;
