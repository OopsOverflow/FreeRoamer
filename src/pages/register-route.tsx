import { Box, Flex, Heading } from '@chakra-ui/react';
import Dropzone from '@components/Dropzone';
import DashboardLayout from '@layouts/DashboardLayout';
import React from 'react';
import PageHeading from '@components/PageHeading';
import * as process from 'process';
import PostForm from '@components/PostForm';
import CenteredMap from '@components/Maps/CenteredMap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const uploadRoute = async (file: File) => {
  // upload to aws s3 using the route /api/s3/upload
  // get the url from the response
  const { url } = await fetch('/api/s3/upload', {
    method: 'POST',
    body: JSON.stringify({
      name: file.name,
      type: file.type,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  // upload the file to the url
  await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      Cors: '*',
    },
  });

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${
    process.env.AWS_BUCKET_REGION
  }.amazonaws.com/${file.name.replaceAll(' ', '+')}`;
};

const uploadImages = async (files: File[]) => {
  return await Promise.all(files.map(uploadRoute));
};

function RegisterRoute() {
  const { data: session, status } = useSession();
  // @ts-ignore
  const userId = session?.user?.id;
  const router = useRouter();
  // if not authenticated, redirect to login page
  if (status === 'unauthenticated') {
    router.push('/login').then((r) => console.log(r));
  }

  const [file, setFile] = React.useState<File | null>(null);
  const [data, setData] = React.useState(null);
  const formRef = React.useRef(null);
  const [images, setImages] = React.useState<File[]>([]);
  const handleDelete = (index: number) => {
    setImages((prevImages) => {
      prevImages.splice(index, 1);
      return [...prevImages];
    });
  };

  const handleCancel = () => {
    setFile(null);
    setData(null);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      // add the file to the images array
      setImages((prevImages) => [...prevImages, file]);

      // set the file to the first file in the array
    });
  };

  const onFileUploaded = async (file: File) => {
    console.log(file);
    setFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      // @ts-ignore
      const data = JSON.parse(event.target.result);
      console.log(data);
      setData(data);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get('trackName') as string;
    const timeToComplete = formData.get('timeToComplete') as string;
    const activityType = formData.get('activityType') as string;
    const difficulty = formData.get('difficulty') as string;
    const description = formData.get('description') as string;
    let mapUrl = '';
    if (file) {
      mapUrl = await uploadRoute(file);
    }
    const imageUrls = await uploadImages(images);

    const res = await fetch('/api/submit-post', {
      method: 'POST',
      body: JSON.stringify({
        title,
        timeToComplete,
        activityType,
        difficulty,
        description,
        imageUrls,
        mapUrl,
        userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    // @ts-ignore
    formRef.current!.reset();

    // You can now use the form data to do something, such as sending it to the server
  };

  return (
    <Box
      height={'full'}
      width={'full'}
      mx={'auto'}
      maxW={'7xl'}
      px={{ base: 2, md: 5 }}
      pb={{ base: 16, md: 28 }}
      mt={16}
    >
      <PageHeading
        text={'Register a Route'}
        subtext={'Share your previous adventures with the world'}
      />
      <Flex
        direction={'column'}
        alignItems={'center'}
        minWidth={'100%'}
        height={'full'}
        px={'auto'}
        mt={16}
      >
        <Dropzone onFileAccepted={(file) => onFileUploaded(file)} />
        {file && (
          <>
            <CenteredMap geojson={data} />
            <Heading as={'h2'} size={'lg'} mt={16}>
              Route Details
            </Heading>
            <PostForm
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              handleDrop={handleDrop}
              handleDelete={handleDelete}
              images={images}
              formRef={formRef}
            />
          </>
        )}
      </Flex>
    </Box>
  );
}

RegisterRoute.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default RegisterRoute;
