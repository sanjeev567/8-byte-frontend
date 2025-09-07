// Portfolio Distribution Pie Chart
import ReactECharts from "echarts-for-react";
import { PieChartOutlined } from "@ant-design/icons";

export const PortfolioDistributionChart: React.FC<{ data: any }> = ({
  data,
}) => {
  const sectors = Object.entries(data).filter(
    ([key]) => key !== "portfolioSummary"
  );

  const pieData = sectors.map(([sectorName, sectorData]: [string, any]) => ({
    value: sectorData.summary.totalInvestment,
    name: sectorName,
  }));

  const colorPalette = [
    "#0191B4",
    "#52c41a",
    "#f5222d",
    "#fa8c16",
    "#722ed1",
    "#13c2c2",
    "#eb2f96",
    "#1890ff",
    "#faad14",
    "#a0d911",
  ];

  const option = {
    title: {
      text: "Portfolio Distribution by Sector",
      left: "center",
      top: 20,
      textStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#262626",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/><b>{b}</b>: ₹{c} ({d}%)",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#d9d9d9",
      borderWidth: 1,
      textStyle: {
        color: "#262626",
      },
    },
    legend: {
      orient: "horizontal",
      bottom: 20,
      left: "center",
      itemGap: 20,
      textStyle: {
        fontSize: 12,
        color: "#595959",
      },
    },
    series: [
      {
        name: "Investment",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "55%"],
        data: pieData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: colorPalette[index % colorPalette.length],
            borderRadius: 8,
            borderColor: "#fff",
            borderWidth: 2,
          },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.3)",
            borderWidth: 3,
          },
        },
        labelLine: {
          show: false,
        },
        label: {
          show: true,
          position: "inside",
          formatter: "{d}%",
          fontSize: 12,
          fontWeight: "bold",
          color: "#fff",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center mb-4">
        <PieChartOutlined className="text-2xl text-blue-600 mr-2" />
        <span className="text-lg font-semibold text-gray-700">
          Portfolio Distribution
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
