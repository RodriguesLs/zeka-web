import { useCallback, useEffect, useRef, useState } from 'react';
import { FiLogOut, FiUnlock, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

import * as S from './styles';

const Profile = () => {
  const { signOut } = useAuth();

  const menuRef = useRef<HTMLDivElement>(null);

  const [menuIsVisible, setMenuIsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuIsVisible(false);
      }
    };

    if (menuIsVisible) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [menuIsVisible]);

  const handleToggleMenu = useCallback(() => {
    setMenuIsVisible((oldState) => !oldState);
  }, []);

  return (
    <>
      <S.ProfileBadgeContainer onClick={handleToggleMenu} isVisible={menuIsVisible} tabIndex={0}>
        VF
      </S.ProfileBadgeContainer>
      {menuIsVisible && (
        <S.MenuContainer ref={menuRef}>
          <ul>
            <li>
              <Link to='/'>
                <FiUser />
                Meu perfil
              </Link>
            </li>
            <li>
              <Link to='/'>
                <FiUnlock />
                Assinatura
              </Link>
            </li>
          </ul>
          <S.SignOutButton onClick={signOut}>
            <FiLogOut />
            Sair da plataforma
          </S.SignOutButton>
        </S.MenuContainer>
      )}
    </>
  );
};

export default Profile;
