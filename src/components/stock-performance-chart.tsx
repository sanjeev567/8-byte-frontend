import ReactECharts from "echarts-for-react";
import { LineChartOutlined } from "@ant-design/icons";
import type { Stock } from "../api/api-types";

export const StockPerformanceChart: React.FC<{ stocks: Stock[] }> = ({
  stocks,
}) => {
  const stockNames = stocks.map((stock) => stock.particulars);
  const gainLossData = stocks.map((stock) => ({
    value: stock.gainLoss,
    itemStyle: {
      color: stock.gainLossColor === "green" ? "#52c41a" : "#ff4d4f",
      borderRadius: [4, 4, 0, 0],
    },
  }));

  const option = {
    title: {
      text: "Individual Stock Performance",
      left: "center",
      top: 10,
      textStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#262626",
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const data = params[0];
        const value = data.value;
        const color = value >= 0 ? "#52c41a" : "#ff4d4f";
        const icon = value >= 0 ? "▲" : "▼";
        return `<div style="padding: 8px;">
          <strong>${data.name}</strong><br/>
          <span style="color: ${color};">${icon} Gain/Loss: ₹${Math.abs(
          value
        ).toLocaleString()}</span>
        </div>`;
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#d9d9d9",
      borderWidth: 1,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "20%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: stockNames,
      axisLabel: {
        interval: 0,
        rotate: 45,
        fontSize: 10,
        color: "#595959",
      },
      axisLine: {
        lineStyle: {
          color: "#d9d9d9",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "Gain/Loss (₹)",
      nameTextStyle: {
        color: "#595959",
        fontSize: 12,
      },
      axisLabel: {
        formatter: "₹{value}",
        fontSize: 11,
        color: "#595959",
      },
      axisLine: {
        lineStyle: {
          color: "#d9d9d9",
        },
      },
      splitLine: {
        lineStyle: {
          color: "#f0f0f0",
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "Gain/Loss",
        type: "bar",
        data: gainLossData,
        emphasis: {
          focus: "series",
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
        },
        animationDelay: (idx: number) => idx * 10,
      },
    ],
    animationEasing: "elasticOut",
    animationDelayUpdate: (idx: number) => idx * 5,
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 p-4 mb-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-center mb-2">
        <LineChartOutlined className="text-lg text-purple-600 mr-2" />
        <span className="text-md font-semibold text-gray-700">
          Stock Performance
        </span>
      </div>
      <ReactECharts
        option={option}
        style={{ height: "280px" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};
