import { useRef, useState } from 'react';
import { Box, Button, HStack, Spinner } from '@chakra-ui/react';
import { MainDiv } from './dashboard.styled';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { downloadCSV, downloadLatestCSV } from './services/fetchData';
import { CSVLink } from 'react-csv'
import { Error } from '@/components';

const FarolPlan = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [transactionDataLatest, setTransactionDataLatest] = useState([]);
  const csvLink = useRef<HTMLDivElement | any>(null);
  const csvLinkLatest = useRef<HTMLDivElement | any>(null);
  const { data, error, isLoading } = useQuery(['admin-summary'], downloadCSV);
  const {
    data: dataLatest,
    error: errorLatest,
    isLoading: isLoadingLatest,
  } = useQuery(['admin-summary-latest'], downloadLatestCSV);
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

  const onClickLatest = async () => {
    if (transactionDataLatest?.length > 0) return csvLinkLatest?.current?.link?.click();
    if (dataLatest?.length > 0) {
      await setTransactionDataLatest(dataLatest);

      csvLinkLatest?.current?.link?.click();
    } else {
      const nData: any = await downloadLatestCSV();

      await setTransactionDataLatest(nData);

      csvLinkLatest?.current?.link?.click();
    }
  };

  if (isLoading || isLoadingLatest) {
    return (
      <Box w='100%' pt='10rem' display='grid' placeContent='center'>
        <Spinner />
      </Box>
    );
  }

  if (error || errorLatest) {
    return <Error buttonText='Voltar para página inicial' description='A Zeka.edu está fora do ar.' onClick={() => navigate('/')}/>;
  }

  return (
    <MainDiv>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
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
        <Button variant='primary' style={styledLink} onClick={onClickLatest}>
          Download latest-activities
        </Button>
        <CSVLink
          data={transactionDataLatest}
          filename='latest-activities.csv'
          className='hidden'
          ref={csvLinkLatest}
          target='_blank'
        />
      </HStack>
    </MainDiv>
  );
};

export default FarolPlan;
