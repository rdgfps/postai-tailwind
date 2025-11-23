// components/EngagementChart.jsx (CORREÇÃO APLICADA)

import React, { useState, useEffect } from 'react'; // Importar useState e useEffect
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados de exemplo...
const data = [
  { name: 'Dia 1', Engajamento: 4000, Alcance: 2400 },
  { name: 'Dia 2', Engajamento: 3000, Alcance: 1398 },
  { name: 'Dia 3', Engajamento: 5000, Alcance: 9800 },
  { name: 'Dia 4', Engajamento: 4780, Alcance: 3908 },
  { name: 'Dia 5', Engajamento: 5890, Alcance: 4800 },
  { name: 'Dia 6', Engajamento: 4390, Alcance: 3800 },
  { name: 'Dia 7', Engajamento: 6490, Alcance: 4300 },
];

const EngagementChart = () => {
  // 1. Criar um estado para controlar se o componente deve ser renderizado
  const [shouldRender, setShouldRender] = useState(false);

  // 2. Usar useEffect para definir shouldRender para true após a montagem
  useEffect(() => {
    // Isso garante que a renderização do ResponsiveContainer ocorra
    // após a conclusão da fase inicial de renderização do React.
    setShouldRender(true);
  }, []);

  // 3. Se shouldRender for falso, renderizar null (ou um loader simples)
  if (!shouldRender) {
    return <div style={{ height: 300, textAlign: 'center', paddingTop: '100px' }}>Carregando Gráfico...</div>;
  }

  // 4. Se shouldRender for true, renderizar o gráfico
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 15, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> 
        <XAxis dataKey="name" stroke="#999" /> 
        <YAxis stroke="#999" />
        <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', backgroundColor: 'white' }} 
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="Engajamento" 
          stroke="#FF7F00" 
          strokeWidth={3}
          dot={{ stroke: '#FF7F00', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 8 }} 
        />
        <Line 
          type="monotone" 
          dataKey="Alcance" 
          stroke="#4A90E2" 
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EngagementChart;