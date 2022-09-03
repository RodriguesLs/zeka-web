import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components';

import * as S from './styles';

const Dashboard = () => {
  return (
    <>
      <S.Container>
        <div className='dashboardItem--full'>
          <Card title='Taxa de reprovação'>
            <Chart />
          </Card>
        </div>
      </S.Container>
    </>
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

const Chart = () => {
  return (
    <ResponsiveContainer width='99%' aspect={3}>
      <BarChart data={chartData}>
        <XAxis dataKey='name' stroke='#31aeb9' />
        <YAxis />
        <CartesianGrid stroke='#ccc' strokeDasharray='1' />
        <Bar dataKey='taxa' fill='#31aeb9' barSize={60} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Dashboard;
