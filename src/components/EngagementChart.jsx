import React, { useState, useEffect } from 'react';

const EngagementChart = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    { name: 'Dia 1', Engajamento: 4000, Alcance: 2400 },
    { name: 'Dia 2', Engajamento: 3000, Alcance: 1398 },
    { name: 'Dia 3', Engajamento: 5000, Alcance: 9800 },
    { name: 'Dia 4', Engajamento: 4780, Alcance: 3908 },
    { name: 'Dia 5', Engajamento: 5890, Alcance: 4800 },
    { name: 'Dia 6', Engajamento: 4390, Alcance: 3800 },
    { name: 'Dia 7', Engajamento: 6490, Alcance: 4300 },
  ];

  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando gráfico...</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.flatMap(item => [item.Engajamento, item.Alcance]));
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Engajamento e Alcance</h3>
      
      <div className="h-64 flex items-end justify-between space-x-1">
        {data.map((item, index) => {
          const engHeight = (item.Engajamento / maxValue) * 180;
          const alcHeight = (item.Alcance / maxValue) * 180;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="flex items-end space-x-1 h-48 w-full justify-center">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-4 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 cursor-pointer"
                    style={{ height: `${alcHeight}px` }}
                    title={`Alcance: ${item.Alcance}`}
                  ></div>
                  <span className="text-xs text-blue-600 font-medium mt-1">{item.Alcance}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div 
                    className="w-4 bg-orange-500 rounded-t transition-all duration-300 hover:bg-orange-600 cursor-pointer"
                    style={{ height: `${engHeight}px` }}
                    title={`Engajamento: ${item.Engajamento}`}
                  ></div>
                  <span className="text-xs text-orange-600 font-medium mt-1">{item.Engajamento}</span>
                </div>
              </div>
              
              <div className="text-xs font-medium text-gray-600 mt-3 px-1 text-center">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center space-x-6 mt-6 pt-4 border-t">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
          <span className="text-sm font-medium text-gray-700">Engajamento</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
          <span className="text-sm font-medium text-gray-700">Alcance</span>
        </div>
      </div>
    </div>
  );
};

export default EngagementChart;