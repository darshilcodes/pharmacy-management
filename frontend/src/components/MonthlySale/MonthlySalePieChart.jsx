import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#A28CFF', '#FF6E9E', '#33CC33', '#FF6666',
  '#66CCCC', '#9966CC', '#FF9933', '#3399FF',
];

const MonthlySalePieChart = ({ chartData }) => {
  const total = chartData.reduce((sum, item) => sum + item.sales, 0);

  const pieData = chartData.map((item) => ({
    name: item.month,
    value: item.sales,
  }));

  return (
    <div className="mt-8  ">
    
      <ResponsiveContainer width="80%" height={260}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
            dataKey="value"
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalePieChart;
