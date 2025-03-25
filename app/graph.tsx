"use client";

import React from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface SpeedometerProps {
  value: number;
  category: Array<any>;
}



const Graph: React.FC<SpeedometerProps> = ({ value, category }) => {

  const labels = category.map((item: any) => item.category);
  const labelColors = category.map((item: any) => item.color);
  const categoryValue = 70 / category?.length;
  const labelValues = category.map((item: any) => categoryValue);
  labelValues.push(30);

  const halfCategoryValue = 50 / category?.length;
  const halfLabelValues = category.map((item: any) => halfCategoryValue);
  halfLabelValues.push(50);

  labels.push("");
  labelColors.push("rgba(0,0,0,0)");

  console.log("label and colors: ", labels, labelColors)

  const maxValue = 100;

  const startAngle = -36;
  const endAngle = 216;
  const degrees = 180 - (startAngle + (value / maxValue) * (endAngle - startAngle));
  const halfDegress = 180 - (value / maxValue) * 180;

  const radians = (degrees * Math.PI) / 180;
  const halfRadians = (halfDegress * Math.PI) / 180;

  const needleLength = 1;
  const needleBaseWidth = 1;
  const needleTipWidth = 0.1;

  const getNeedlePath = (angle: number) => {
    // Main needle point (tip)
    const tipX = needleLength * Math.cos(angle);
    const tipY = needleLength * Math.sin(angle);
    
    // Base points (left and right)
    const baseAngle1 = angle + Math.PI/2;
    const baseX1 = needleBaseWidth * Math.cos(baseAngle1);
    const baseY1 = needleBaseWidth * Math.sin(baseAngle1);
    
    const baseAngle2 = angle - Math.PI/2;
    const baseX2 = needleBaseWidth * Math.cos(baseAngle2);
    const baseY2 = needleBaseWidth * Math.sin(baseAngle2);
    
    // Mid points (for tapered shape)
    const midX1 = needleTipWidth * Math.cos(baseAngle1);
    const midY1 = needleTipWidth * Math.sin(baseAngle1);
    const midX2 = needleTipWidth * Math.cos(baseAngle2);
    const midY2 = needleTipWidth * Math.sin(baseAngle2);
    
    return `
      M ${baseX1} ${baseY1}
      L ${midX1} ${midY1}
      L ${tipX} ${tipY}
      L ${midX2} ${midY2}
      L ${baseX2} ${baseY2}
      Z
    `;
  };

  const needlePath = getNeedlePath(radians);
  const halfNeedlePath = getNeedlePath(halfRadians);

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <Plot className="p-4"
        data={[
          {
            type: "pie",
            values: labelValues,
            labels: labels,
            marker: {
              colors: labelColors,
              line: {
                width: 2,
                color: "#ffffff",
              },
            },
            textinfo: "none",
            hoverinfo: "none",
            hole: 0.75,
            direction: "clockwise",
            sort: false,
            showlegend: false,
            textposition: "outside",
            rotation: -126,
            name: "Speedometer",
          },
          {
            type: "indicator",
            mode: "number",
            value: value,
            number: { font: { size: 32 } },
            domain: {
              x: [0, 1],
              y: [0.2, 0.4]
            }
          }
        ]}
        layout={{
          shapes: [
            {
              type: "path",
              path: needlePath,
              xref: "x",
              yref: "y",
              fillcolor: "black",
              line: { width: 0 }
            },
            {
              type: "circle",
              x0: -0.09,
              y0: -0.09,
              x1: 0.09,
              y1: 0.09,
              fillcolor: "black",
              line: { color: "black" },
            },
            
          ],
          xaxis: { 
            visible: false,
            range: [-1.2, 1.2],
            scaleanchor: "y"
          },
          yaxis: { 
            visible: false,
            range: [-1.2, 1.2]
          },
          showlegend: false,
          width: 600,
          height: 400,
          margin: { t: 10, b: 10, l: 10, r: 10 },
        }}
        config={{ displayModeBar: false }}
      />

      <Plot
        data={[
          {
            type: "pie",
            values: halfLabelValues,
            labels: labels,
            marker: {
              colors: labelColors,
              line: {
                width: 2,
                color: "#FFFFFF",
              },
            },
            textinfo: "none",
            hoverinfo: "none",
            hole: 0.75,
            direction: "clockwise",
            sort: false,
            showlegend: false,
            textposition: "outside",
            rotation: -90,
            name: "Speedometer",
          },
          {
            type: "indicator",
            mode: "number",
            value: value,
            number: { font: { size: 32 } },
            domain: {
              x: [0, 1],
              y: [0.2, 0.4]
            }
          }
        ]}
        layout={{
          shapes: [
            {
              type: "path",
              path: halfNeedlePath,
              xref: "x",
              yref: "y",
              fillcolor: "black",
              line: { width: 0 }
            },
            {
              type: "circle",
              x0: -0.09,
              y0: -0.09,
              x1: 0.09,
              y1: 0.09,
              fillcolor: "black",
              line: { color: "black" },
            },
          ],
          xaxis: { 
            visible: false,
            range: [-1.2, 1.2],
            scaleanchor: "y"
          },
          yaxis: { 
            visible: false,
            range: [-1.2, 1.2]
          },
          showlegend: false,
          width: 600,
          height: 400,
          margin: { t: 10, b: 10, l: 10, r: 10 },
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

export default Graph;
