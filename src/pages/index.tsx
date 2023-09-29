import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';



export default function Home() {
  const [data, setData] = useState<number[]>();

  useEffect(() => {
    axios.get('https://api.llama.fi/summary/fees/lyra?dataType=dailyFees')
      .then((response) => {
        const apiData = response.data.totalDataChart;
        console.log(apiData)

        const formattedData = apiData.map((entry: number[]) => ({
          date: new Date(entry[0] * 1000),
          Price: entry[1],
        }));
        console.log(formattedData)
        setData(formattedData)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div className='bg-black'>
      <div className='w-full mt-24 pl-64'>
        <ResponsiveContainer width={1000} height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip labelFormatter={(label) => {
            const formattedDate = new Date(label).toLocaleString('default', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
            return <span style={{ color: 'black' }}>Date: {formattedDate}</span>;
          }}
            formatter={(value) => `$${value}`} />
          <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
