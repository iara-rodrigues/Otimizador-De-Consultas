import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function renderBarChart(ctx: HTMLCanvasElement, nome: string[], qnt: number[]) {
  return new Chart(ctx, {
    type: "bar",
    options: {
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            //text: "Remédio",
            font: {
              size: 17, // Tamanho da fonte do título do eixo X
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            // forces step size to be 50 units
            stepSize: 1,
          },
          title: {
            display: true,
            text: "Quantidade",
            font: {
              size: 17, // Tamanho da fonte do título do eixo Y
            },
          },
        },
      },
    },
    data: {
      labels: nome,
      datasets: [
        {
          label: "Quantidade",
          data: qnt,
          backgroundColor: "#ADD8E6",
        },
      ],
    },
  });
}

function BarChart({ objetos }: { objetos: any[] }) {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const nome = objetos.map((objeto) => objeto.nome);
    const qnt = objetos.map((objeto) => objeto.qnt);

    const ctx = canvasRef.current;

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = renderBarChart(ctx, nome, qnt);
    }
  }, [objetos]);

  return (
    <div>
      <canvas id="Est" ref={canvasRef}></canvas>
    </div>
  );
}

export default BarChart;
