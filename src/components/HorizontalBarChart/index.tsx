import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DiagnosticsByDiscipline = ({ diagnosticsFinalizedByDiscipline }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={diagnosticsFinalizedByDiscipline}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="finalizados" fill="#8884d8" background={{ fill: '#eee' }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DiagnosticsByDiscipline;
