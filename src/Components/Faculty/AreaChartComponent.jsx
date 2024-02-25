'use client';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const productSales = [
  {
    name: 'Jan',
    students_Passing: 40,
    students_failing: 10,
  },
  {
    name: 'Feb',
    students_Passing: 40,
    students_failing: 5,
  },
  {
    name: 'Mar',
    students_Passing: 40,
    students_failing: 4,
  },
  {
    name: 'Apr',
    students_Passing: 40,
    students_failing: 2,
  },
  {
    name: 'May',
    students_Passing: 40,
    students_failing: 3,
  },
  {
    name: 'Jun',
    students_Passing: 40,
    students_failing: 1,
  },
];

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={productSales}
        margin={{ right: 30 }}
      >
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />

        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Area
          type="monotone"
          dataKey="students_Passing"
          stroke="#2563eb"
          fill="#3b82f6"
          stackId="1"
        />

        <Area
          type="monotone"
          dataKey="students_failing"
          stroke="#7c3aed"
          fill="#8b5cf6"
          stackId="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
        Passing Students:
          <span className="ml-2">{payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Failing Students:
          <span className="ml-2">{payload[1].value}</span>
        </p>
      </div>
    );
  }
};

export default AreaChartComponent;