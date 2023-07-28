import { useRef, useState } from 'react';
import { Box, Button, HStack, Spinner } from '@chakra-ui/react';
import { MainDiv } from './dashboard.styled';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { downloadCSV } from './services/fetchData';
import { CSVLink } from 'react-csv'
import { Error } from '@/components';

const FarolPlan = () => {
  const [transactionData, setTransactionData] = useState([]);
  const csvLink = useRef<HTMLDivElement | any>(null);
  const { data, error, isLoading } = useQuery(['admin-summary'], downloadCSV);
  const navigate = useNavigate();

  const styledLink: any = {
    backgroundColor: '#31aeb9',
    padding: '10px 20px',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '0.875rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  };

  const onClick = async () => {
    if (transactionData?.length > 0) return csvLink?.current?.link?.click();
    if (data?.length > 0) {
      await setTransactionData(data);

      csvLink?.current?.link?.click();
    } else {
      const newData: any = await downloadCSV();

      await setTransactionData(newData);

      csvLink?.current?.link?.click();
    }
  };

  if (isLoading) {
    return (
      <Box w='100%' pt='10rem' display='grid' placeContent='center'>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return <Error buttonText='Voltar para página inicial' description='A Zeka.edu está fora do ar.' onClick={() => navigate('/')}/>;
  }

  return (
    <MainDiv>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        {/* <a href='users.csv' style={styledLink} download='usuarios-exemplo.csv'>
          Download planilha de exemplo
        </a>
        <input type="file" id="file-csv" onChange={handleChange} style={{display: 'none'}}/>  */}
        <Button variant='primary' style={styledLink} onClick={onClick}>
          Download relatório
        </Button>
        <CSVLink
          data={transactionData}
          filename='transactions.csv'
          className='hidden'
          ref={csvLink}
          target='_blank'
        />
      </HStack>
    </MainDiv>
  );
};

export default FarolPlan;
