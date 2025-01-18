'use client'
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

type props = {
  sortedByOverlap: any[];
};

export function BarChart({ sortedByOverlap }: props) {
  const labelsArray =
    sortedByOverlap.map((obj) => obj.major).length > 0
      ? sortedByOverlap.map((obj) => obj.major)
      : [
          "Customize in BarChart.tsx",
          "MISSING PROGRAM OR COURSES IN YOUR MAJOR",
          "PLEASE ADD PROGRAM/COURSES IN YOUR MAJOR",
          "AND USE DESKTOP FOR BEST EXPERIENCE",
        ];
  const creditsOfOverlap =
    sortedByOverlap.map((obj) => obj.curCreditsInProgram).length > 0
      ? sortedByOverlap.map((obj) => obj.curCreditsInProgram)
      : [3, 2, 1];
  // legend: {
  //     position: 'right' as const,
  // }
  const changeBorderColors = () => {
    const stepSize = Math.trunc(110 / labelsArray.length);
    let colors: string[] = [];
    for (let i = 0; i < labelsArray.length; i++) {
      const col = i * stepSize;
      colors.push(`hsla(${col}, 80%, 60%)`);
    }
    return colors;
  };

  const changeBackgroundColors = () => {
    const stepSize = Math.trunc(108 / labelsArray.length);
    let colors: string[] = [];
    for (let i = 0; i < labelsArray.length; i++) {
      const col = i * stepSize;
      colors.push(`hsla(${col}, 80%, 60%, 0.75)`);
    }
    return colors;
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Your Progress",
      },
    },
  };
  //'rgba(255, 99, 132, 0.5)'
  const data: any = {
    //Replace months with majors
    labels: labelsArray,
    datasets: [
      {
        label: "Credits",
        data: creditsOfOverlap,
        borderColor: changeBorderColors,
        backgroundColor: changeBackgroundColors,
      },
    ],
  };

  return (
    <div className="w-full aspect-video mx-auto border-slate-100 border-4 rounded-lg">
      <Bar
        style={{
          padding: "20px",
        }}
        data={data}
        options={options}
      />
    </div>
  );
}
