import ReactECharts from "echarts-for-react";
import { BarChartOutlined } from "@ant-design/icons";

// Sector Performance Bar Chart

export const SectorPerformanceChart: React.FC<{ data: any }> = ({ data }) => {
  const sectors = Object.entries(data).filter(
    ([key]) => key !== "portfolioSummary"
  );

  const sectorNames = sectors.map(([name]) => name);
  const investments = sectors.map(
    ([, sectorData]: [string, any]) => sectorData.summary.totalInvestment
  );
  const presentValues = sectors.map(
    ([, sectorData]: [string, any]) => sectorData.summary.totalPresentValue
  );
  const gainLoss = sectors.map(
    ([, sectorData]: [string, any]) => sectorData.summary.totalGainLoss
  );

  const option = {
    title: {
      text: "Sector Performance Comparison",
      left: "center",
      top: 20,
      textStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#262626",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#d9d9d9",
      borderWidth: 1,
      textStyle: {
        color: "#262626",
      },
    },
    legend: {
      data: ["Investment", "Present Value", "Gain/Loss"],
      top: 50,
      left: "center",
      itemGap: 30,
      textStyle: {
        fontSize: 12,
        color: "#595959",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "20%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: sectorNames,
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          interval: 0,
          rotate: 30,
          fontSize: 11,
          color: "#595959",
        },
        axisLine: {
          lineStyle: {
            color: "#d9d9d9",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Amount (₹)",
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
    ],
    series: [
      {
        name: "Investment",
        type: "bar",
        data: investments,
        itemStyle: {
          color: "#0191B4",
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: "#016a84",
          },
        },
      },
      {
        name: "Present Value",
        type: "bar",
        data: presentValues,
        itemStyle: {
          color: "#52c41a",
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: "#389e0d",
          },
        },
      },
      {
        name: "Gain/Loss",
        type: "bar",
        data: gainLoss,
        itemStyle: {
          color: (params: any) => (params.value >= 0 ? "#52c41a" : "#ff4d4f"),
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: (params: any) => (params.value >= 0 ? "#389e0d" : "#cf1322"),
          },
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center mb-4">
        <BarChartOutlined className="text-2xl text-green-600 mr-2" />
        <span className="text-lg font-semibold text-gray-700">
          Sector Performance
        </span>
      </div>
      <ReactECharts
        option={option}
        style={{ height: "420px" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};
