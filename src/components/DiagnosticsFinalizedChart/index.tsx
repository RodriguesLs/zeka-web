import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Sem. A',
    uv: 50,
  },
  {
    name: 'Sem. B',
    uv: 12,
  },
  {
    name: 'Sem. C',
    uv: 10,
  },
  {
    name: 'Sem. D',
    uv: 8,
  },
  {
    name: 'Sem. E',
    uv: 10,
  },
  {
    name: 'Sem. F',
    uv: 5,
  },
  {
    name: 'Page G',
    uv: 9,
  },
];

const DiagnosticsFinalizedChart = ({ diagnosticsByWeek }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={diagnosticsByWeek}
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
          <Area type="monotone" dataKey="finalizados" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiagnosticsFinalizedChart;
