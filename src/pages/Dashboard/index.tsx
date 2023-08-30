import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  Tooltip,
  LineChart,
} from 'recharts';
import {
  Box,
  SimpleGrid,
  Spinner,
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

  const trailsInitialized = [
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
  ];

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
          <FunilFinalizacao discipline_finalization={disciplineFinalization} />
        </Card>
        <Card title='Trilhas iniciadas: semanal'>
          <ChartByCourseOnly2 proficiency={trailsInitialized} />
        </Card>
      </SimpleGrid>
    </MainDiv>
  );
};

const LineInitializeActivities = ({ dataLineWeek }: any) => {
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

const UseDailyPeriod = ({ platform_use_day_period }: any) => {
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

const ChartResults = ({ dataChart }: any) => {
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

const UseDailyChart = ({ dataDayUseWeek }: any) => {
  return (
    <ResponsiveContainer width='100%' aspect={2}>
      <BarChart data={dataDayUseWeek}>
        <XAxis dataKey='name' stroke='#000' />
        <YAxis />
        <CartesianGrid stroke='#ccc' strokeDasharray='1' />
        <Bar dataKey='qtt' fill='#D5A6BD' barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const ChartByCourseOnly = ({ proficiency }: any) => {
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

const ChartByCourseOnly2 = ({ proficiency }: any) => {
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

const ChartByCourseOnly3 = ({ proficiency }: any) => {
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

const ChartByCourseOnly4 = ({ proficiency }: any) => {
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

export default Dashboard;
