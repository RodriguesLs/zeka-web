import { Outlet } from 'react-router-dom';
import { Grid, GridItem, Heading } from '@chakra-ui/react';
// import amebaTurquesa from '@/assets/img/ameba_roxa.png';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import { useTitlePage } from '@/contexts/TitlePageContext';

// import Zendesk from 'react-zendesk';

// const ZENDESK_KEY = import.meta.env.VITE_API_ZENDESK_KEY;

const DefaultLogged = () => {
  const { title } = useTitlePage();

  return (
    <>
      <Grid
        templateAreas={`"aside header"
                        "aside content"`}
        gridTemplateColumns={'auto 1fr'}
        gridTemplateRows={'64px 1fr'}
        minH='100vh'
        bg='background.layout'
      >
        <GridItem area='header' w='100%'>
          <Header />
        </GridItem>
        <GridItem area='aside' h='100%'>
          <Sidebar />
        </GridItem>
        <GridItem backgroundImage={''} area='content' p='1.5rem'>
          <Heading fontSize='1.5rem' mb='2rem'>
            {title}
          </Heading>
          <Outlet />
        </GridItem>
      </Grid>
      {/* <Zendesk defer zendeskKey={ZENDESK_KEY} /> */}
    </>
  );
};

export default DefaultLogged;
