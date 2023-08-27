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

const UseDailyChart = () => {
  const chartDataResults = [
    { name: 'Inativas', taxa: 2 },
    { name: 'Ativas', taxa: 71 },
    { name: '', taxa: 73 },
  ];

  return (
    <ResponsiveContainer width='100%' aspect={3}>
    </ResponsiveContainer>
  );
};

export default UseDailyChart;
