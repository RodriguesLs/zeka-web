import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  ComposedChart,
  Legend,
  Area,
  Line,
  Scatter,
  Tooltip,
} from 'recharts';
import {
  Box,
  SimpleGrid,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Card } from '@/components';
import { StyledDiv, SummaryDiv, MainDiv, StyledTableGrid } from './dashboard.styled';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchData from './services/fetchData';
import { Error } from '@/components';

const Dashboard = () => {
  const { data, error, isLoading } = useQuery(['admin-summary'], fetchData);
  const handleChange = async (e) => {};
  const navigate = useNavigate();

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
      <StyledDiv>
        <SummaryDiv>Dias para a prova: <p>{data?.total_employees}</p></SummaryDiv>
        <SummaryDiv>Alunos: <p>{data?.total_employees}</p></SummaryDiv>
        <SummaryDiv>Já acessaram: <p>{data?.total_employees_initialized}</p></SummaryDiv>
        <SummaryDiv>Finalizaram os diagnósticos: <p>{data?.total_employees_not_initialized}</p></SummaryDiv>
        <SummaryDiv className="finish_one">Finalizaram uma trilha: <p>{data?.total_employees_finished}</p></SummaryDiv>
        <SummaryDiv className="finish_one">Iniciaram uma trilha: <p>{data?.total_employees_finished}</p></SummaryDiv>
        <SummaryDiv className="finish_one">Nunca acessaram: <p>{data?.total_employees_finished}</p></SummaryDiv>
      </StyledDiv>

      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title=''>
          <ChartResults />
        </Card>
        <Card title=''>
          <SimpleBarChart dataNewChart={dataNewChart} xKey='name' yKey='pv' />
        </Card>
      </SimpleGrid>

      <br />
      <h1>Diagnósticos</h1>
      <hr />
      <br />
      <StyledDiv>
        <SummaryDiv>
          Dias para a prova: <p>{data?.total_employees}</p>
        </SummaryDiv>
        <SummaryDiv>Alunos: <p>{data?.total_employees}</p></SummaryDiv>
        <SummaryDiv>Já acessaram: <p>{data?.total_employees_initialized}</p></SummaryDiv>
        <SummaryDiv>Finalizaram os diagnósticos: <p>{data?.total_employees_not_initialized}</p></SummaryDiv>
        <SummaryDiv className='finish_one'>Finalizaram uma trilha: <p>{data?.total_employees_finished}</p></SummaryDiv>
        <SummaryDiv className='finish_one'>Iniciaram uma trilha: <p>{data?.total_employees_finished}</p></SummaryDiv>
        <SummaryDiv className='finish_one'>Nunca acessaram: <p>{data?.total_employees_finished}</p></SummaryDiv>
      </StyledDiv>

      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title=''>
          <PieChart2 data={dataPieChart} />
        </Card>
        <Card title=''>
          <SimpleBarChart dataNewChart={dataNewChart} xKey='name' yKey='pv' />
        </Card>
      </SimpleGrid>
      <br />
      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Taxa de finalizados por dia'>
          <WeekDiagnostic data={dataWeek} />
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

const chartDataResults = [
  { name: 'Alunos', taxa: 130 },
  { name: 'Já acesseram', taxa: 120 },
  { name: 'Fin. diagnóstico', taxa: 80 },
  { name: 'Fin. uma trilha', taxa: 50 },
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

const dataNewChart = [
  { name: "Page A", pv: 240 },
  { name: "B", pv: 2210 },
  { name: "C", pv: 2300 },
  { name: "Page D", pv: 2000 },
  { name: "Zero", pv: 0 },
  { name: "Hi", pv: 123 },
  { name: "Bye", pv: 2091 }
];

const blues = [
  ["#457AA6"],
  ["#457AA6", "#E3EBF2"],
  ["#264F73", "#457AA6", "#E3EBF2"],
  ["#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"],
  ["#1A334A", "#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"]
];

let ctx;

const BAR_AXIS_SPACE = 10;

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

const ChartResults = () => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={3}>
        <BarChart data={chartDataResults}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='taxa' fill='#31aeb9' barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const getColor = (length, index) => {
  if (length <= blues.length) {
    return blues[length - 1][index];
  }

  return blues[blues.length - 1][index % blues.length];
};

const YAxisLeftTick = ({ y, payload: { value } }) => {
  return (
    <text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
      {value}
    </text>
  );
};

const measureText14HelveticaNeue = (text: string) => {
  if (!ctx) {
    ctx = document.createElement('canvas').getContext('2d');
    ctx.font = "14px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

const SimpleBarChart = ({ dataNewChart, yKey, xKey }) => {
  const maxTextWidth = useMemo(
    () =>
      dataNewChart.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [dataNewChart, yKey]
  );

  return (
    <ResponsiveContainer width={"100%"} height={50 * dataNewChart.length} debounce={50}>
      <BarChart
        data={dataNewChart}
        layout="vertical"
        margin={{ left: 10, right: maxTextWidth + (BAR_AXIS_SPACE - 8) }}
      >
        <XAxis hide axisLine={false} type="number" />
        <YAxis
          yAxisId={0}
          dataKey={xKey}
          type="category"
          axisLine={false}
          tickLine={false}
          tick={YAxisLeftTick}
        />
        <YAxis
          orientation="right"
          yAxisId={1}
          dataKey={yKey}
          type="category"
          axisLine={false}
          tickLine={false}
          tickFormatter={value => value.toLocaleString()}
          mirror
          tick={{
            transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`
          }}
        />
        <Bar dataKey={yKey} minPointSize={2} barSize={32}>
          {dataNewChart.map((d, idx) => {
            return <Cell key={d[xKey]} fill={getColor(dataNewChart.length, idx)} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
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

const dataPieChart = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChart2 = ({ data }) => {
  return (
    <ResponsiveContainer height={'100%'} width={'100%'}>
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))} */}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const dataWeek = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
];

const WeekDiagnostic = ({ data }: any) => {
  return (
    <ComposedChart
      width={1000}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke='#f5f5f5' />
      <XAxis dataKey='name' scale='band' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='uv' barSize={20} fill='#413ea0' />
      <Line type='monotone' dataKey='uv' stroke='#ff7300' />
    </ComposedChart>
  );
};

export default Dashboard;
