import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DiagnosticCourseProgressChart = ({ data, barSize }: any) => {
  const tickFormatter = (value: string, index: number) => {
    const limit = 10; // put your maximum character
    if (value.length < limit) return value;
    return `${value.substring(0, limit)}...`;
  };

  return (
    <ResponsiveContainer width='100%' height='80%'>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis tickFormatter={tickFormatter} style={{ fontSize: '.8em' }} dataKey='name' />
        <YAxis tickFormatter={(t) => `${t}%`} type='number' domain={[0, 100]} />
        <Tooltip />
        <Bar barSize={barSize || 40} dataKey='percentual' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DiagnosticCourseProgressChart;
