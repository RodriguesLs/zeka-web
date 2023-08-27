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
  Line,
  Legend,
  Tooltip,
  LineChart,
} from 'recharts';
import {
  Box,
  SimpleGrid,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Card } from '@/components';
import { MainDiv, StyledH1 } from './dashboard.styled';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchData from './services/fetchData';
import {
  Error,
  HorizontalBarChart,
  AvailableDiagnostics,
  DiagnosticsFinalizedChart,
  FunilFinalizacao
} from '@/components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as TooltipChart,
  Legend as LegendChart,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar as BarChartJs } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  TooltipChart,
  LegendChart,
);

const labels = [
  'Já acessaram',
  'Iniciaram diag.',
  'Fianlizaram diag.',
  'Iniciaram Trilhas',
  'Fin. Trilhas',
  'Fin. o curso',
  'Nunca acessaram',
];

const Dashboard = () => {
  const { data, error, isLoading } = useQuery(['admin-summary'], fetchData);
  const handleChange = async (e) => {};
  const navigate = useNavigate();

  const dataEngajament = [
    data?.engajament?.already_access,
    data?.engajament?.initialized_diagnostic,
    data?.engajament?.finished_diagnostic,
    data?.engajament?.initialized_course,
    data?.engajament?.finished_course,
    data?.engajament?.finished_total_course,
    data?.engajament?.never_access,
  ];

  const chartDataResults = [
    { name: 'Inativas', taxa: data?.licenses?.inactive || 20 },
    { name: 'Ativas', taxa: data?.licenses?.active || 50 },
    { name: 'Total', taxa: data?.licenses?.total },
  ];

  const dataLineWeek = [
    { name: 'S28', qtt: data?.initialized_activities?.week_1 },
    { name: 'S29', qtt: data?.initialized_activities?.week_2 },
    { name: 'S30', qtt: data?.initialized_activities?.week_3 },
    { name: 'S31', qtt: data?.initialized_activities?.week_4 },
    { name: 'S32', qtt: data?.initialized_activities?.week_5 },
    { name: 'S33', qtt: data?.initialized_activities?.week_6 },
    { name: 'S34', qtt: data?.initialized_activities?.week_7 },
    { name: 'S35', qtt: data?.initialized_activities?.week_8 },
  ];

  const dataDayUseWeek = [
    { name: 'Segunda', qtt: data?.platform_use_day_week?.monday },
    { name: 'Terça', qtt: data?.platform_use_day_week?.tuesday },
    { name: 'Quarta', qtt: data?.platform_use_day_week?.wednesday },
    { name: 'Quinta', qtt: data?.platform_use_day_week?.thursday },
    { name: 'Sexta', qtt: data?.platform_use_day_week?.friday },
    { name: 'Sábado', qtt: data?.platform_use_day_week?.saturday },
    { name: 'Domingo', qtt: data?.platform_use_day_week?.sunday },
  ];

  const platformUseDayPeriod = [
    { name: 'Manhã', qtt: data?.platform_use_day_period?.mane },
    { name: 'Tarde', qtt: data?.platform_use_day_period?.meridiem },
    { name: 'Noite', qtt: data?.platform_use_day_period?.nox },
  ];

  const diagnosticsFinalizedByDiscipline = [
    { name: 'Natureza', finalizados: data?.diagnostics_by_discipline?.nature?.finalized },
    { name: 'Humanas', finalizados: data?.diagnostics_by_discipline?.humans?.finalized },
    { name: 'Português', finalizados: data?.diagnostics_by_discipline?.portuguese?.finalized },
    { name: 'Matemática', finalizados: data?.diagnostics_by_discipline?.math?.finalized },
    { name: 'Total', finalizados: 71 },
  ];

  const diagnosticsByWeek = [
    { name: 'S28', finalizados: data?.diagnostics_by_week?.week_1 },
    { name: 'S29', finalizados: data?.diagnostics_by_week?.week_2 },
    { name: 'S30', finalizados: data?.diagnostics_by_week?.week_3 },
    { name: 'S31', finalizados: data?.diagnostics_by_week?.week_4 },
    { name: 'S32', finalizados: data?.diagnostics_by_week?.week_5 },
    { name: 'S33', finalizados: data?.diagnostics_by_week?.week_6 },
    { name: 'S34', finalizados: data?.diagnostics_by_week?.week_7 },
    { name: 'S35', finalizados: data?.diagnostics_by_week?.week_8 },
  ];

  const proficiencyNature = [
    { name: '25%', percent: data?.proficiency?.nature?.x_25 },
    { name: '50%', percent: data?.proficiency?.nature?.x_50 },
    { name: '75%', percent: data?.proficiency?.nature?.x_75 },
    { name: '100%', percent: data?.proficiency?.nature?.x_100 },
  ];

  const proficiencyHumans = [
    { name: '25%', percent: data?.proficiency?.humans?.x_25 },
    { name: '50%', percent: data?.proficiency?.humans?.x_50 },
    { name: '75%', percent: data?.proficiency?.humans?.x_75 },
    { name: '100%', percent: data?.proficiency?.humans?.x_100 },
  ];

  const proficiencyPortuguese = [
    { name: '25%', percent: data?.proficiency?.portuguese?.x_25 },
    { name: '50%', percent: data?.proficiency?.portuguese?.x_50 },
    { name: '75%', percent: data?.proficiency?.portuguese?.x_75 },
    { name: '100%', percent: data?.proficiency?.portuguese?.x_100 },
  ];

  const proficiencyMath = [
    { name: '25%', percent: data?.proficiency?.math?.x_25 },
    { name: '50%', percent: data?.proficiency?.math?.x_50 },
    { name: '75%', percent: data?.proficiency?.math?.x_75 },
    { name: '100%', percent: data?.proficiency?.math?.x_100 },
  ];

  const trailsInitialized= [
    { name: 'S28', percent: data?.trails_initialized?.week_1 },
    { name: 'S29', percent: data?.trails_initialized?.week_2 },
    { name: 'S30', percent: data?.trails_initialized?.week_3 },
    { name: 'S31', percent: data?.trails_initialized?.week_4 },
    { name: 'S32', percent: data?.trails_initialized?.week_5 },
    { name: 'S33', percent: data?.trails_initialized?.week_6 },
    { name: 'S34', percent: data?.trails_initialized?.week_7 },
    { name: 'S35', percent: data?.trails_initialized?.week_8 },
  ];

  const finalizedInitialized = {
    iniciados: data?.finalized_initialized?.iniciados,
    finalizados: data?.finalized_initialized?.finalizados,
  };

  const disciplineFinalization = [
    {
      name: 'Ciências da Natureza',
      iniciaram: data?.discipline_finalization?.nature?.initalize,
      finalizaram_trilha: data?.discipline_finalization?.nature?.finalized,
      finalizaram_curso: data?.discipline_finalization?.nature?.finish_course,
    },
    {
      name: 'Ciências Humanas',
      iniciaram: data?.discipline_finalization?.humans?.initalize,
      finalizaram_trilha: data?.discipline_finalization?.humans?.finalized,
      finalizaram_curso: data?.discipline_finalization?.humans?.finish_course,
    },
    {
      name: 'Português',
      iniciaram: data?.discipline_finalization?.portuguese?.initalize,
      finalizaram_trilha: data?.discipline_finalization?.portuguese?.finalized,
      finalizaram_curso: data?.discipline_finalization?.portuguese?.finish_course,
    },
    {
      name: 'Matemática',
      iniciaram: data?.discipline_finalization?.math?.initalize,
      finalizaram_trilha: data?.discipline_finalization?.math?.finalized,
      finalizaram_curso: data?.discipline_finalization?.math?.finish_course,
    },
  ]

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  const dataNewd = {
    labels,
    datasets: [
      {
        label: '',
        data: dataEngajament,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
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
      <>
        <br />
        <StyledH1>Engajamento</StyledH1>
        <hr />
        <br />
        <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
          <Card title='Licenças'>
            <ChartResults dataChart={chartDataResults} />
          </Card>
          <Card title='Funil de engajamento'>
            <BarChartJs options={options} data={dataNewd} />
          </Card>
          <Card title='Atividades iniciadas - semanal'>
            <LineInitializeActivities dataLineWeek={dataLineWeek} />
          </Card>
        </SimpleGrid>
        <br />
        <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
          <Card title='Uso da plataforma - dia da semana'>
            <UseDailyChart dataDayUseWeek={dataDayUseWeek} />
          </Card>
          <Card title='Uso da plataforma - período do dia'>
            <UseDailyPeriod platform_use_day_period={platformUseDayPeriod} />
          </Card>
        </SimpleGrid>
      </>
      <>
        <br />
        <StyledH1>Aprendizagem</StyledH1>
        <hr />
        <br />
        <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
          <Card title=''>
            <AvailableDiagnostics finalized_initialized={finalizedInitialized} />
          </Card>
          <Card title=''>
            <HorizontalBarChart diagnosticsFinalizedByDiscipline={diagnosticsFinalizedByDiscipline}/>
          </Card>
          <Card title=''>
            <DiagnosticsFinalizedChart diagnosticsByWeek= {diagnosticsByWeek}/>
          </Card>
        </SimpleGrid>
      </>
      <br />
      <StyledH1>Proficiência Inicial - Diagnósticos avaliativos</StyledH1>
      <hr />
      <br />
      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Ciências da Natureza'>
          <ChartByCourseOnly proficiency={proficiencyNature} />
        </Card>
        <Card title='Ciências humanas'>
          <ChartByCourseOnly2 proficiency={proficiencyHumans} />
        </Card>
        <Card title='Português'>
          <ChartByCourseOnly3 proficiency={proficiencyPortuguese} />
        </Card>
        <Card title='Matemática'>
          <ChartByCourseOnly4 proficiency={proficiencyMath} />
        </Card>
      </SimpleGrid>
      <br />
      <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
        <Card title='Funil de finalização por matéria'>
          <FunilFinalizacao discipline_finalization={disciplineFinalization}/>
        </Card>
        <Card title='Trilhas iniciadas: semanal'>
          <ChartByCourseOnly2 proficiency={trailsInitialized} />
        </Card>
      </SimpleGrid>
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

const UseDailyChartData = [
  { name: 'Domingo', taxa: 2 },
  { name: 'Segunda', taxa: 16 },
  { name: 'Terça', taxa: 9 },
  { name: 'Quarta', taxa: 11 },
  { name: 'Quinta', taxa: 5 },
  { name: 'Sexta', taxa: 3 },
  { name: 'Sábado', taxa: 21 },
];

const chartDataByCourse = [
  { name: 'Recursos humanos', taxa: 100 },
  { name: 'Integração e tecnologia', taxa: 200 },
  { name: 'Manutenção de máquinas', taxa: 100 },
  { name: 'Recursos humanos 2', taxa: 100 },
  { name: 'Integração e tecnologia 2', taxa: 200 },
  { name: 'Manutenção de máquinas 2', taxa: 100 },
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

const LineInitializeActivities = ({ dataLineWeek }) => {
  return (
    <ResponsiveContainer width="100%" height="85%">
      <LineChart
        width={500}
        height={300}
        data={dataLineWeek}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="qtt" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const UseDailyPeriod = ({ platform_use_day_period }) => {
  return (
    <ResponsiveContainer width="100%" height="85%">
      <LineChart
        width={500}
        height={300}
        data={platform_use_day_period}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="qtt" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ChartResults = ({ dataChart }) => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={2}>
        <BarChart data={dataChart}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='taxa' fill='#31aeb9' barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const UseDailyChart = () => {
  return (
    <ResponsiveContainer width='100%' aspect={2}>
      <BarChart data={UseDailyChartData}>
        <XAxis dataKey='name' stroke='#000' />
        <YAxis />
        <CartesianGrid stroke='#ccc' strokeDasharray='1' />
        <Bar dataKey='taxa' fill='#D5A6BD' barSize={50} />
      </BarChart>
    </ResponsiveContainer>
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
    <text x={0} y={y} textAnchor='start'>
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
    <>
      <h1>Teste</h1>
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

const ChartByCourseOnly = ({ proficiency }) => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={2}>
        <BarChart data={proficiency}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='percent' fill='#A2C4CA' barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const ChartByCourseOnly2 = ({ proficiency }) => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={2}>
        <BarChart data={proficiency}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='percent' fill='#A2C4CA' barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const ChartByCourseOnly3 = ({ proficiency }) => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={2}>
        <BarChart data={proficiency}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='percent' fill='#F3B26B' barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const ChartByCourseOnly4 = ({ proficiency }) => {
  return (
    <>
      <ResponsiveContainer width='100%' aspect={2}>
        <BarChart data={proficiency}>
          <XAxis dataKey='name' stroke='#31aeb9' />
          <YAxis />
          <CartesianGrid stroke='#ccc' strokeDasharray='1' />
          <Bar dataKey='percent' fill='#F3B26B' barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const SimpleStripedTable = () => (
  <TableContainer>
    <Table variant='striped' colorScheme='teal'>
      {/* <TableCaption>Table optional details</TableCaption> */}
      <Thead>
        <Tr>
          <Th>Alunos que:</Th>
          <Th>Geral</Th>
          <Th>Ciências da Natureza</Th>
          <Th isNumeric>Ciências Humanas</Th>
          <Th isNumeric>Português</Th>
          <Th isNumeric>Redação</Th>
          <Th isNumeric>Matemática</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Iniciaram pelo menos uma trilha</Td>
          <Td isNumeric>10</Td>
          <Td isNumeric>15</Td>
          <Td isNumeric>25</Td>
          <Td isNumeric>25</Td>
          <Td isNumeric>25</Td>
          <Td isNumeric>25</Td>
        </Tr>
        <Tr>
          <Td>Finalizaram pelo menos uma trilha</Td>
          <Td isNumeric>15</Td>
          <Td isNumeric>40</Td>
          <Td isNumeric>22</Td>
          <Td isNumeric>22</Td>
          <Td isNumeric>22</Td>
          <Td isNumeric>22</Td>
        </Tr>
        <Tr>
          <Td>Finalizaram todas as trilhas</Td>
          <Td isNumeric>15</Td>
          <Td isNumeric>40</Td>
          <Td isNumeric>22</Td>
          <Td isNumeric>22</Td>
          <Td isNumeric>22</Td>
          <Td isNumeric>22</Td>
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
  { name: 'Faltantes', value: 23 },
  { name: 'Finalizaram', value: 300 },
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
