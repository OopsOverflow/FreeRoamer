import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Link as ChakraLink,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Center,
} from '@chakra-ui/react';
import { FaBars, FaMapMarked, FaRegWindowClose } from 'react-icons/fa';
import { Logo } from '../Logo';
import ColorModeToggle from './ColorModeToggle';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Links = [{ name: 'Home', href: '/' }];

const NavLink = (
  props: ComponentPropsWithoutRef<'a'> & { children: ReactNode; href: string },
) => (
  <Link href={props.href} passHref>
    <ChakraLink
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      {...props}
    >
      {props.children}
    </ChakraLink>
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { data: session } = useSession();

  return (
    <>
      <Box
        bg={
          colorMode == 'light'
            ? `rgba(255, 255, 255, 0.8)`
            : `rgba(26, 33, 42, 0.8)`
        }
        sx={{ backdropFilter: `saturate(180%) blur(5px)` }}
        px={4}
        width={'full'}
        position={'fixed'}
        left={0}
        top={0}
        zIndex={10}
      >
        <Flex
          maxWidth={'7xl'}
          margin={'auto'}
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <IconButton
            size={'md'}
            icon={
              isOpen ? (
                <Center>
                  <FaRegWindowClose />
                </Center>
              ) : (
                <Center>
                  <FaBars />
                </Center>
              )
            }
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link href={'/'}>
              <a>
                <Logo boxSize={7} />
              </a>
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link, index) => (
                <NavLink key={index + link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Link href={'/new-route'}>
              <Button
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
                leftIcon={<FaMapMarked />}
              >
                New Route
              </Button>
            </Link>
            <ColorModeToggle mr={4} />
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={session?.user?.image ?? ''} />
              </MenuButton>
              <MenuList>
                <Link href={'/register-route'} passHref>
                  <MenuItem as={'a'}>Register Route</MenuItem>
                </Link>
                <Link href={'/register-route'} passHref>
                  <MenuItem as={'a'}>My Profile</MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink
                  key={index + link.name}
                  href={link.href}
                  onClick={onClose}
                >
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
