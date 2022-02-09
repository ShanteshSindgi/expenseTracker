import { PieChart } from 'react-minimal-pie-chart';

export const Piechart = ({ data }) => {
    const defaultLabelStyle = {
        fontSize: '5px',
        fontFamily: 'sans-serif',
      };
    return (
        <PieChart
            style={{maxHeight:'200px',right:0}}
            animate
            animationDuration={500}
            animationEasing="ease-out"
            data={data}
            label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
            labelStyle={defaultLabelStyle}
          
        />
    )

}