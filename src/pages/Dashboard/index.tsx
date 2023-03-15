import { useRef, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer ,
  PieChart,
  Pie,
} from 'recharts';
import { Button, HStack, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Card } from '@/components';
import { StyledDiv, SummaryDiv, MainDiv, StyledTableGrid } from './dashboard.styled';
import { useNavigate } from 'react-router-dom';
import { parseExcelToJSON } from '@/services/xlsx/xlsxService';
import { useQuery } from '@tanstack/react-query';
import fetchData, { downloadCSV } from './services/fetchData';
import { CSVLink } from 'react-csv'

const Dashboard = () => {
  const [transactionData, setTransactionData] = useState([]);
  const csvLink = useRef<HTMLDivElement | any>(null);
  const { data, error, isLoading } = useQuery(['admin-summary'], fetchData);
  const handleChange = async (e) => {}

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

  const getTransactionData = async () => {
    const data: any = await downloadCSV();
    debugger;
    setTransactionData(data);

    csvLink.current.link.click();
  }

  return (
    <MainDiv>
      <HStack width='100%' mb='1rem' gap='1rem' justifyContent='end'>
        {/* <a href='users.csv' style={styledLink} download='usuarios-exemplo.csv'>
          Download planilha de exemplo
        </a>
        <input type="file" id="file-csv" onChange={handleChange} style={{display: 'none'}}/>  */}
        <Button variant='primary' style={styledLink} onClick={getTransactionData}>
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
      <StyledDiv>
        <SummaryDiv>Cadastros: <p>{data?.total_employees}</p></SummaryDiv>
        <SummaryDiv>Já acessaram: <p>{data?.total_employees_initialized}</p></SummaryDiv>
        <SummaryDiv>Nunca acessaram: <p>{data?.total_employees_not_initialized}</p></SummaryDiv>
        <SummaryDiv className="finish_one">Finalizaram pelo menos um: <p>{data?.total_employees_finished}</p></SummaryDiv>
      </StyledDiv>

      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Taxa de finalização'>
          <PieResumeChart pData={data}/>
        </Card>
        <Card title='Taxa de finalização'>
          <PieResumeChart pData={data}/>
        </Card>
      </SimpleGrid>
      <br />
      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Taxa de finalizados por dia'>
          <Chart />
        </Card>
      </SimpleGrid>
      <br />
      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Taxa de conclusão por curso'>
          <ChartByCourse />
        </Card>
      </SimpleGrid>
      <br />
      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Proficiência em Ciências da Natureza'>
          <ChartByCourseOnly />
        </Card>
        <Card title='Proficiência em Ciências humanas'>
          <ChartByCourseOnly2 />
        </Card>
      </SimpleGrid>
      <br />
      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Proficiência em Português'>
          <ChartByCourseOnly2 />
        </Card>
        <Card title='Proficiência em Matemática'>
          <ChartByCourseOnly />
        </Card>
      </SimpleGrid>
      <StyledTableGrid>
        <h1>Cursos finalizados por aluno</h1>
        <SimpleStripedTable />
      </StyledTableGrid>
      <StyledTableGrid>
        <h1>Finalização de diagnóstico por aluno</h1>
        <SimpleStripedTable2 />
      </StyledTableGrid>
    </MainDiv>
  );
};

const chartData = [
  { name: '01 de fev', taxa: 100 },
  { name: '02 de fev', taxa: 200 },
  { name: '03 de fev', taxa: 100 },
  { name: '04 de fev', taxa: 200 },
  { name: '05 de fev', taxa: 100 },
  { name: '06 de fev', taxa: 400 },
  { name: '07 de fev', taxa: 100 },
  { name: '08 de fev', taxa: 200 },
  { name: '09 de fev', taxa: 100 },
  { name: '10 de fev', taxa: 200 },
  { name: '11 de fev', taxa: 100 },
  { name: '12 de fev', taxa: 400 },
];

const chartDataByCourse = [
  { name: 'Recursos humanos', taxa: 100 },
  { name: 'Integração e tecnologia', taxa: 200 },
  { name: 'Manutenção de máquinas', taxa: 100 },
  { name: 'Recursos humanos 2', taxa: 100 },
  { name: 'Integração e tecnologia 2', taxa: 200 },
  { name: 'Manutenção de máquinas 2', taxa: 100 },
];

const chartDataByCourseOnly = [
  { name: '7', taxa: 20 },
  { name: '8', taxa: 23 },
  { name: '9', taxa: 7 },
  { name: '10', taxa: 2 },
  { name: '5.5', taxa: 19 },
  { name: '4', taxa: 3 },
];

const radialData = [
  {
    name: '35-39',
    value: 100
  },
  {
    name: '35-39',
    value: 350
  }
];

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
          <Bar dataKey='taxa' fill='#0b64c5' barSize={150} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const ChartByCourseOnly = () => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={3}>
        <BarChart data={chartDataByCourseOnly}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='taxa' fill='#Fbe926' barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const ChartByCourseOnly2 = () => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={3}>
        <BarChart data={chartDataByCourseOnly}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='taxa' fill='#9a9a97' barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const PieResumeChart = ({ pData }) => {
  // const pieData = pData?.map(p => ({ name: `${'lol'}`, value: p?.total_employees || 25 }));
  const radialData2 = [
    {
      name: 'finilized',
      value: pData?.total_employees_finished
    },
    {
      name: 'total',
      value: pData?.total_employees
    }
  ]
  return (
    <ResponsiveContainer width={'100%'} aspect={3}>
      <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={radialData2}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
    </ResponsiveContainer>
  )
}

const SimpleStripedTable = () => (
  <TableContainer>
    <Table variant='striped' colorScheme='teal'>
      <TableCaption>Table optional details</TableCaption>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Curso</Th>
          <Th isNumeric>Quantidade</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td isNumeric>25.4</Td>
        </Tr>
        <Tr>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td isNumeric>25.4</Td>
        </Tr>
      </Tbody>
    </Table>
  </TableContainer>
);

const SimpleStripedTable2 = () => (
  <TableContainer>
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Curso</Th>
          <Th>Data de finalização</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td></Td>
          <Td>NÃO INICIADO</Td>
        </Tr>
        <Tr>
          <Td>feet</Td>
          <Td>centimetres (cm)</Td>
          <Td></Td>
          <Td>INICIADO</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td>07/02/2023</Td>
          <Td>FINALIZADO</Td>
        </Tr>
      </Tbody>
    </Table>
  </TableContainer>
);

export default Dashboard;
