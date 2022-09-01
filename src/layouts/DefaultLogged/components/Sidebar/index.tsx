import { FiHome, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaYoutube, FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

import NavLink from './NavLink';

import logoImg from '@/assets/img/logo.svg';
import { useSidebar } from '@/contexts/SidebarContext';

import * as S from './styles';

const Sidebar = () => {
  const { isVisible, toggleSidebar } = useSidebar();

  return (
    <S.Container>
      <S.ButtonToggleSidebar onClick={toggleSidebar}>
        {isVisible ? <FiChevronLeft /> : <FiChevronRight />}
      </S.ButtonToggleSidebar>
      <img src={logoImg} alt='logo zeka img' loading='lazy' />
      <S.NavContainer hideTitle={!isVisible}>
        <NavLink to='/dashboard' icon={FiHome} title='Dashboard' hideTitle={!isVisible} />
        <NavLink to='/usuarios' icon={FiUser} title='Usuários' hideTitle={!isVisible} />
      </S.NavContainer>
      {isVisible && <ListSocial />}
    </S.Container>
  );
};

const ListSocial = () => {
  return (
    <S.SocialContainer>
      <p>ZEKA na mídia</p>
      <ul className='listSocial'>
        <li>
          <a href='https://facebook.com' target='blank'>
            <FaFacebook />
          </a>
        </li>
        <li>
          <a href='https://instagram.com' target='blank'>
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href='https://linkedin.com' target='blank'>
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a href='https://twitter.com' target='blank'>
            <FaTwitter />
          </a>
        </li>
        <li>
          <a href='https://youtube.com' target='blank'>
            <FaYoutube />
          </a>
        </li>
      </ul>
    </S.SocialContainer>
  );
};

export default Sidebar;
