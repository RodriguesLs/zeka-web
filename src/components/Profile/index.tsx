import { ComponentType, useCallback, useEffect, useRef, useState } from 'react';
import { FiLogOut, FiUnlock, FiUser } from 'react-icons/fi';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Avatar,
  useDisclosure,
  HStack,
  Link,
  VStack,
  Icon,
  Box,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { IconBaseProps } from 'react-icons';

import Button from '../Button';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef();
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuIsOpen(false);
      }
    };

    if (menuIsOpen) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [menuIsOpen]);

  const handleToggleMenu = useCallback(() => {
    setMenuIsOpen((oldState) => !oldState);
  }, []);

  return (
    <>
      <ProfileAvatar name={user?.avatar_name} menuIsOpen={menuIsOpen} onClick={handleToggleMenu} />
      {menuIsOpen && (
        <VStack
          ref={menuRef}
          position='absolute'
          top='68px'
          right='1rem'
          w='260px'
          zIndex='2'
          bg='background.white'
          alignItems='baseline'
          borderWidth='1px'
          borderColor='gray.300'
          borderRadius='6px'
        >
          <VStack w='100%' p='1rem' gap='1rem'>
            <MenuItem label='Meu perfil' icon={FiUser} href='/' />
            <MenuItem label='Assinatura' icon={FiUnlock} href='/' />
          </VStack>
          <Box
            as='button'
            w='100%'
            p='1rem'
            display='flex'
            alignItems='center'
            color='red.500'
            fontWeight='bold'
            onClick={onOpen}
            borderTopWidth={1}
            borderColor='gray.300'
          >
            <Icon as={FiLogOut} w='22px' h='22px' mr='1rem' />
            Sair da plataforma
          </Box>
        </VStack>
      )}

      <AlertDialog
        motionPreset='slideInBottom'
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Sair da plataforma?
            </AlertDialogHeader>
            <AlertDialogBody>Você tem certeza que quer sair da plataforma?</AlertDialogBody>
            <AlertDialogFooter>
              <HStack width='100%' spacing='0.5rem'>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button onClick={signOut} variant='danger'>
                  Sim, desejo sair
                </Button>
              </HStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

interface ProfileAvatarProps {
  menuIsOpen: boolean;
  onClick: () => void;
  name: string;
}

const ProfileAvatar = ({ menuIsOpen, name, onClick }: ProfileAvatarProps) => {
  return (
    <Avatar
      size='sm'
      name={name}
      background='none'
      padding={4}
      borderWidth={2}
      borderColor={menuIsOpen ? 'brand.500' : 'gray.300'}
      cursor='pointer'
      _hover={{ borderColor: 'brand.500' }}
      onClick={onClick}
    />
  );
};

interface MenuItemProps {
  icon: ComponentType<IconBaseProps>;
  label: string;
  href: string;
}

const MenuItem = ({ label, icon, href }: MenuItemProps) => {
  return (
    <Link
      as={RouterLink}
      to={href}
      w='100%'
      display='flex'
      alignItems='center'
      _hover={{ color: 'brand.500' }}
    >
      <Icon as={icon} w='22px' h='22px' mr='1rem' />
      {label}
    </Link>
  );
};

export default Profile;
