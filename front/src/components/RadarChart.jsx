import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const RadarComparison = ({ data }) => {
  return (
    <RadarChart outerRadius={90} width={400} height={300} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="metric" />
      <PolarRadiusAxis />
      <Radar name="GPU Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  );
};

export default RadarComparison;
