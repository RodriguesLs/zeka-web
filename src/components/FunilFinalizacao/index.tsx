import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface IDisciplineFinalization {
  name: string;
  finalizaram_trilha: number;
  iniciaram: number;
  finalizaram_curso: number;
}

interface IFinalizedFunil {
  discipline_finalization: IDisciplineFinalization;
}

const FinalizedFunil = ({ discipline_finalization }: IFinalizedFunil | any) => {
  return (
    <ResponsiveContainer width='100%' height='80%'>
      <BarChart
        width={600}
        height={300}
        data={discipline_finalization}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='finalizaram_trilha' fill='#B6D7A8' />
        <Bar dataKey='iniciaram' fill='#93C47D' />
        <Bar dataKey='finalizaram_curso' fill='#6AA84F' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinalizedFunil;
