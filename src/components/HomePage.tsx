import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage: React.FC = () => {
  // Mock data for attendance
  const groups = [
    { name: 'Grupo A', asiste: 80, permiso: 8, falta: 5, retardo: 7 },
    { name: 'Grupo B', asiste: 85, permiso: 5, falta: 3, retardo: 7 },
    { name: 'Grupo C', asiste: 75, permiso: 10, falta: 7, retardo: 8 },
    { name: 'Grupo D', asiste: 82, permiso: 6, falta: 4, retardo: 8 },
  ];

  const createChartData = (group) => ({
    labels: ['Asiste', 'Permiso', 'Falta', 'Retardo'],
    datasets: [
      {
        data: [group.asiste, group.permiso, group.falta, group.retardo],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'currentColor',
        },
      },
      title: {
        display: true,
        text: 'Asistencia',
        color: 'currentColor',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">Sistema de Asistencia</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {groups.map((group, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-600 dark:text-blue-400">{group.name}</h3>
            <div className="w-full h-64 mb-4">
              <Pie data={createChartData(group)} options={options} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300">Asiste</p>
                <p className="text-lg font-bold text-green-800 dark:text-green-200">{group.asiste}%</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
                <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Permiso</p>
                <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">{group.permiso}%</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">Falta</p>
                <p className="text-lg font-bold text-red-800 dark:text-red-200">{group.falta}%</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Retardo</p>
                <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{group.retardo}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;