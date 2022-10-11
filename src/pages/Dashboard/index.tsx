import { BarChart, AreaChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer , Tooltip, Area } from 'recharts';
import { SimpleGrid } from '@chakra-ui/react';
import { Card } from '@/components';

const Dashboard = () => {
  return (
    <SimpleGrid as='section' width='100%' gap='1rem' minChildWidth='320px' alignItems='flex-start'>
      <Card title='Taxa de reprovação'>
        <Chart />
      </Card>
      <Card title='Taxa de conclusão'>
        <LineChart />
      </Card>
    </SimpleGrid>
  );
};

const chartData = [
  { name: '2016', taxa: 100 },
  { name: '2017', taxa: 200 },
  { name: '2018', taxa: 100 },
  { name: '2019', taxa: 200 },
  { name: '2020', taxa: 100 },
  { name: '2021', taxa: 400 },
];

const areaData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
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
