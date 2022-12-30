import { BarChart, AreaChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer , Tooltip, Area } from 'recharts';
import { Button, HStack, SimpleGrid } from '@chakra-ui/react';
import { Card } from '@/components';
import { StyledDiv, StyledTitle } from './dashboard.styled';
import { useNavigate } from 'react-router-dom';
import { parseExcelToJSON } from '@/services/xlsx/xlsxService';
import insertInBatch from './services/insertInBatch';
import { useQuery } from '@tanstack/react-query';
import fetchData from './services/fetchData';

const Dashboard = () => {
  const { data, error, isLoading } = useQuery(['admin-summary'], fetchData);
  // console.log({data})
  // console.log({error})
  // console.log({isLoading})
  const handleClick = () => document.getElementById('file-csv').click();
  const handleChange = async (e) => {
    const file = e.target.files[0]
    const data: any = await parseExcelToJSON(file);

    let initialI = 0;
    let finalI = 1000;
    let counter = 0;

    while(counter < data.length) {
    // console.log({ data: data.slice(initialI, finalI) });
    // console.log({ date: data.slice(initialI, finalI)[0] });
      await insertInBatch(data.slice(initialI, finalI));

      initialI = finalI;
      counter = finalI;
      finalI += 1000;
    }

    // await insertInBatch(data);

    // queryClient.invalidateQueries(['users']);
  }

  // const navigate = useNavigate();

  const styledLink: any = {
    backgroundColor: '#31aeb9',
    padding: '10px 20px',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '0.875rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  }

  return (
    <>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        {/* <a href='users.csv' style={styledLink} download='usuarios-exemplo.csv'>
          Download planilha de exemplo
        </a> */}
        <input type="file" id="file-csv" onChange={handleChange} style={{display: 'none'}}/> 
        <Button variant='primary' style={styledLink} onClick={handleClick}>
          Importar dados manualmente
        </Button>
      </HStack>
      <StyledDiv>
        <h1>Resumo dos totais</h1><br />

        <StyledTitle><b>Número total de colaboradores:</b> {data?.total_employees}</StyledTitle>
        <StyledTitle><b>Número de colaboradores que já iniciou:</b> {data?.total_employees_initialized} </StyledTitle>
        <StyledTitle><b>Número de colaboradores que já finalizou:</b> {data?.total_employees_finished} </StyledTitle>
      </StyledDiv>

      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Taxa de conclusão'>
          <Chart />
        </Card>
        <Card title='Taxa de finalizados por dia'>
          <LineChart />
        </Card>
      </SimpleGrid>
      <br />
      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Taxa de conclusão por curso'>
          <ChartByCourse />
        </Card>
        <Card title='Taxa de reprovação'>
          <LineChart />
        </Card>
      </SimpleGrid>
    </>
  );
};

const chartData = [
  { name: 'Jan', taxa: 100 },
  { name: 'Fev', taxa: 200 },
  { name: 'Mar', taxa: 100 },
  { name: 'Abr', taxa: 200 },
  { name: 'Jun', taxa: 100 },
  { name: 'Jul', taxa: 400 },
];

const chartDataByCourse = [
  { name: 'Recursos humanos', taxa: 100 },
  { name: 'Integração e tecnologia', taxa: 200 },
  { name: 'Manutenção de máquinas', taxa: 100 },
  { name: 'Recursos humanos 2', taxa: 100 },
  { name: 'Integração e tecnologia 2', taxa: 200 },
  { name: 'Manutenção de máquinas 2', taxa: 100 },
];

const areaData = [
  {
    name: '1',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '2',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '3',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '4',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '5',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '6',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
]

const Chart = () => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={3}>
        <BarChart data={chartData}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='taxa' fill='#31aeb9' barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const ChartByCourse = () => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={3}>
        <BarChart data={chartDataByCourse}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='taxa' fill='#31aeb9' barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const LineChart = () => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={3}>
        <AreaChart
          width={500}
          height={400}
          data={areaData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default Dashboard;
