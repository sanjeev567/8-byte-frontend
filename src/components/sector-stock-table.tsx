import React from "react";
import { Table, Card, Typography, Tag, Progress } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Stock } from "../api/api-types";
import { formatCurrency } from "../utils/format.utiils";
import { StockPerformanceChart } from "./stock-performance-chart";

const { Title } = Typography;

// Main component for sector stocks table

export const SectorStocksTable: React.FC<{
  stocks: Stock[];
  sectorName: string;
}> = ({ stocks, sectorName }) => {
  const columns: ColumnsType<Stock> = [
    {
      title: "Stock Details",
      dataIndex: "particulars",
      key: "particulars",
      width: 200,
      fixed: "left",
      render: (text: string, record: Stock) => (
        <div className="py-2">
          <div className="font-bold text-gray-800 text-sm mb-1">{text}</div>
          <div className="flex items-center gap-2">
            <Tag
              color={record.exchange === "NSE" ? "blue" : "green"}
              className="text-xs"
            >
              {record.exchange}
            </Tag>
            <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
              {record.symbol}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      align: "right",
      width: 120,
      render: (value: number) => (
        <span className="font-medium text-gray-700">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      width: 100,
      render: (value: number) => (
        <span className="font-medium text-gray-700">
          {value.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Investment",
      dataIndex: "investment",
      key: "investment",
      align: "right",
      width: 130,
      render: (value: number) => (
        <span className="font-semibold text-blue-600">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      title: "Portfolio %",
      dataIndex: "portfolioPercentage",
      key: "portfolioPercentage",
      align: "center",
      width: 100,
      render: (value: string) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700">{value}</div>
          <Progress
            percent={parseFloat(value.replace("%", ""))}
            size="small"
            showInfo={false}
            strokeColor="#0191B4"
            className="mt-1"
          />
        </div>
      ),
    },
    {
      title: "Current Price",
      dataIndex: "cmp",
      key: "cmp",
      align: "right",
      width: 120,
      render: (value: number) => (
        <div className="text-right">
          <div className="font-bold text-lg text-blue-600">
            {formatCurrency(value)}
          </div>
          <div className="text-xs text-gray-500">CMP</div>
        </div>
      ),
    },
    {
      title: "Present Value",
      dataIndex: "presentValue",
      key: "presentValue",
      align: "right",
      width: 130,
      render: (value: number) => (
        <span className="font-bold text-purple-600">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      title: "Gain/Loss",
      dataIndex: "gainLoss",
      key: "gainLoss",
      align: "right",
      width: 130,
      render: (value: number, record: Stock) => {
        const isPositive = record.gainLossColor === "green";
        const percentage = ((value / record.investment) * 100).toFixed(1);
        return (
          <div className="text-right">
            <div
              className={`font-bold text-lg ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "+" : ""}
              {formatCurrency(value)}
            </div>
            <div
              className={`text-xs ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}
              {percentage}%
            </div>
          </div>
        );
      },
    },
    {
      title: "P/E Ratio",
      dataIndex: "peRatio",
      key: "peRatio",
      align: "right",
      width: 100,
      render: (value: number) => (
        <span className="text-gray-600 font-medium">
          {value?.toFixed(2) || "N/A"}
        </span>
      ),
    },
    {
      title: "Latest Earnings",
      dataIndex: "latestEarnings",
      key: "latestEarnings",
      align: "right",
      width: 130,
      render: (value: number) => (
        <span className="text-gray-600 font-medium">
          {formatCurrency(value)}
        </span>
      ),
    },
  ];

  return (
    <div className="mb-8">
      {/* Stock Performance Chart */}
      <div className="mb-6">
        <StockPerformanceChart stocks={stocks} />
      </div>

      {/* Stocks Table */}
      <Card
        className="shadow-xl border-0 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        }}
      >
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4" />
              <div>
                <Title level={4} className="m-0 text-gray-800 font-bold">
                  {sectorName} Stocks
                </Title>
                <p className="text-gray-600 text-sm mt-1 mb-0">
                  {stocks.length} stocks in this sector
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                Total Stocks
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {stocks.length}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <Table
            dataSource={stocks}
            columns={columns}
            rowKey="symbol"
            pagination={false}
            scroll={{ x: 1300 }}
            size="middle"
            className="modern-table"
            rowClassName={(_record, index) =>
              `hover:bg-blue-50 transition-colors duration-200 ${
                index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
              }`
            }
          />
        </div>
      </Card>
    </div>
  );
};
