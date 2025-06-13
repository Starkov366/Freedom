import React from "react";
import {
     ResponsiveContainer,
     AreaChart,
     CartesianGrid,
     Area,
     XAxis,
     YAxis,
     Tooltip
} from "recharts";
const Graphik = () => {
     const [array, setArray] = React.useState([
          {
               value: 1,
               one: 1,
               two: 3,
               four: 2
          },
          {
               value: 2,
               one: 1,
               two: 5,
               four: 1
          },
          {
               value: 3,
               one: 7,
               two: 3,
               four: 2
          },
          {
               value: 4,
               one: 1,
               two: 11,
               four: 5
          },
          {
               value: 5,
               one: 1,
               two: 3,
               four: 22
          }
     ]);
     return (
          <div
               style={{
                    height: "300px",
                    width: "600px",
                    position: "absolute",
                    backgroundColor: "fuchsia",
                    borderRadius: "30px",
                    display: "none"
               }}
          >
               <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width={500} height={300} data={array}>
                         <CartesianGrid strokeDasharray="1 1" />
                         <XAxis domain={[0, 100]} dataKey="value" />
                         <YAxis />
                         <Tooltip />
                         <Area
                              type="monotone"
                              dataKey="one"
                              fill="orange"
                              stroke="black"
                              stackId="1"
                         />
                         <Area
                              type="monotone"
                              dataKey="two"
                              fill="black"
                              stroke="black"
                              stackId="1"
                         />
                         <Area
                              type="monotone"
                              dataKey="four"
                              fill="red"
                              stroke="black"
                              stackId="1"
                         />
                    </AreaChart>
               </ResponsiveContainer>
          </div>
     );
};
