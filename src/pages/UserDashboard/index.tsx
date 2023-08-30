import fetchData from './services/fetchData';
import { MainDiv, StyledH1, ProgressBox, ProgressHeader, ProgressTitle, ProgressParagraph } from './user-dashboard.styled';
// import ProgressBar from '@/components/ProgressBar';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import useAuth from '@/hooks/useAuth';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { Card, DiagnosticCourseProgressChart } from '@/components';

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
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

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
const UseDailyChart = ({ diagnosticsProgress }: any) => {
  return (
    <ResponsiveContainer width='100%' aspect={2}>
      <BarChart data={diagnosticsProgress}>
        <XAxis dataKey='name' stroke='#000' />
        <YAxis />
        <CartesianGrid stroke='#ccc' strokeDasharray='1' />
        <Bar dataKey='progress' fill='#D5A6BD' barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const UserDashboard = () => {
  const { user: { student: { guid } } } = useAuth();
  const { data, isLoading } = useQuery(['student-summary-guid'], () => fetchData(guid));

  if (isLoading) return <Spinner />;

  const labels = [
    'A Jornada Começa Aqui',
    'Ciências Humanas',
    'Ciências da Natureza',
    'Português',
    'Redação',
    'Matemática',
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
        display: false,
        position: 'right' as const,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  const dataEngajament = [
    data?.channel_progress?.initial_way,
    data?.channel_progress?.humans,
    data?.channel_progress?.nature,
    data?.channel_progress?.portuguese,
    data?.channel_progress?.writing,
    data?.channel_progress?.math,
  ];

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

  const humanLabels = ['A Física do Esporte', 'Biologia e Vida na Quadra', 'Química de Atleta'];
  const portugueseLabels = [
    'Corpo, Imagem e Ação: Comunicação!',
    'Formas Diferentes de se Comunicar',
    'Linguagem, Comunicação e Tecnologia',
    'Torre de Babel - Como o mundo se comunica?',
    'Você Convence ou é Convencido?',
  ];
  const writingLabels = ['No Oceano da Redação'];
  const mathLabels = ['A Realidade dos Números', 'O Mundo dos Números'];
  const natureLabels = [
    'A Tecnologia Muda a Nossa Vida',
    'Alongado na Cultura',
    'Corrida Pelo Planeta',
    'Essa Luta é de Todos',
    'Nossa Gente Muda Muito',
  ];

  const {
    diagnostic_progress,
    humans_courses_progress,
    portuguese_courses_progress,
    nature_courses_progress,
    math_courses_progress,
    writing_courses_progress,
    proficiency_diagnostics,
    discipline_progress : { nature, humans, portuguese, math }
  } = data;

  return (
    <>
      <MainDiv>
        <StyledH1>Progresso</StyledH1>
        <hr />
        <ProgressHeader>
          <ProgressBox>
            <ProgressTitle>Ciências Humanas</ProgressTitle>
            <ProgressParagraph>{nature || 0}%</ProgressParagraph>
          </ProgressBox>
          <ProgressBox>
            <ProgressTitle>Ciências da Natureza</ProgressTitle>
            <ProgressParagraph>{humans || 0}%</ProgressParagraph>
          </ProgressBox>
          <ProgressBox>
            <ProgressTitle>Português</ProgressTitle>
            <ProgressParagraph>{portuguese || 0}%</ProgressParagraph>
          </ProgressBox>
          <ProgressBox>
            <ProgressTitle>Matemática</ProgressTitle>
            <ProgressParagraph>{math || 0}%</ProgressParagraph>
          </ProgressBox>
        </ProgressHeader>

        <StyledH1>Progresso por canal</StyledH1>
        <hr />
        <Box w='100%' h='400px' bg='background.white' p='1rem' borderRadius='6px'>
          <BarChartJs options={options} data={dataNewd} />
        </Box>
        <br />
        <SimpleGrid
          as='section'
          width='100%'
          height='400px'
          gap='1rem'
          minChildWidth='320px'
          alignItems='flex-start'
        >
          <Card title='Diagnósticos'>
            <DiagnosticCourseProgressChart data={diagnostic_progress} />
          </Card>
          <Card title='Ciências Humanas - percentual de conclusão'>
            <DiagnosticCourseProgressChart data={humans_courses_progress} barSize={120} />
          </Card>
        </SimpleGrid>
        <br />
        <br />
        <SimpleGrid as='section' width='100%' height='400px' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
          <Card title='Português - percentual de conclusão'>
            <DiagnosticCourseProgressChart data={portuguese_courses_progress} />
          </Card>
          <Card title='Redação - percentual de conclusão'>
            <DiagnosticCourseProgressChart
              barSize={100}
              data={
                writing_courses_progress?.length > 0
                  ? writing_courses_progress
                  : [{ name: 'No Oceano Da Redação', percentual: 0 }]
              }
            />
          </Card>
        </SimpleGrid>
        <br />
        <SimpleGrid as='section' width='100%' height='400px' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
          <Card title='Ciências da Natureza - percentual de conclusão'>
            <DiagnosticCourseProgressChart data={nature_courses_progress} />
          </Card>
          <Card title='Matemática - percentual de conclusão'>
            <DiagnosticCourseProgressChart data={math_courses_progress} />
          </Card>
        </SimpleGrid>
        <StyledH1>Proficiência</StyledH1>
        <hr />
        <br />
        <SimpleGrid as='section' width='50%' height='400px' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
          <Card title='Proficiência - Diagnósticos avaliativos'>
            <DiagnosticCourseProgressChart data={proficiency_diagnostics} barSize={100} />
          </Card>
        </SimpleGrid>
      </MainDiv>
    </>
  );
};

export default UserDashboard;
