import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Center,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { OAuthButtonGroup } from '../components/Auth/OAuthButtonGroup';
import { PasswordField } from '../components/Auth/PasswordField';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


function Login() {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated")
      router.push("/");
  }, [status]);


    return (
      <Center
        height={"100%"}
        width={"100%"}
      >
        <Container
          maxW="lg"
          py={{base: '12', md: '24'}}
          px={{base: '0', sm: '8'}}
        >
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{base: '2', md: '3'}} textAlign="center">
                <Heading size={useBreakpointValue({base: 'xs', md: 'sm'})}>
                  Log in to your account
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Don&apos;t have an account?</Text>
                  <Button variant="link" colorScheme="blue">
                    Sign up
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{base: '0', sm: '8'}}
              px={{base: '4', sm: '10'}}
              bg={useBreakpointValue({base: 'transparent', sm: 'bg-surface'})}
              boxShadow={{base: 'none', sm: useColorModeValue('md', 'dark-lg')}}
              borderRadius={{base: 'none', sm: 'xl'}}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email"/>
                  </FormControl>
                  <PasswordField/>
                </Stack>
                <HStack justify="space-between">
                  <Checkbox defaultChecked>Remember me</Checkbox>
                  <Button variant="link" colorScheme="blue" size="sm">
                    Forgot password?
                  </Button>
                </HStack>
                <Stack spacing="6">
                  <Button variant="solid" colorScheme={'blue'}>
                    Sign in
                  </Button>
                  <HStack>
                    <Divider/>
                    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                      or continue with
                    </Text>
                    <Divider/>
                  </HStack>
                  <OAuthButtonGroup/>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Center>
    );
    
}

export default Login;