import React, { useEffect, useState } from "react";
import { Card, Typography, Spin, Alert, Tabs } from "antd";
import {
  DollarOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { useGetPortfolioInfoQuery } from "../api/app-api-slice";
import type { Stock, SectorSummary, PortfolioSummary } from "../api/api-types";
import { getErrorFromException } from "../utils/error.utils";
import { PortfolioDistributionChart } from "./portfolio-distribution-chart";
import { SectorPerformanceChart } from "./sector-performance-chart";
import { SectorSummaryCard } from "./sector-summary-card";
import { PortfolioSummaryCard } from "./portfolio-summary-card";
import { SectorStocksTable } from "./sector-stock-table";

const { Title } = Typography;

// Main Portfolio Table Component
const PortfolioTable: React.FC = () => {
  const { data, error, isLoading } = useGetPortfolioInfoQuery(undefined, {
    pollingInterval: 15000, // Poll every 15 seconds
  });
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Update last updated time when data changes
  useEffect(() => {
    if (data) {
      setLastUpdated(new Date());
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center bg-white rounded-2xl shadow-2xl p-12 max-w-md mx-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Spin size="large" />
          </div>
          <div className="text-xl font-semibold text-gray-800 mb-2">
            Loading Portfolio
          </div>
          <div className="text-gray-600">
            Fetching your latest investment data...
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex justify-center items-center p-4">
        <div className="max-w-md w-full">
          <Alert
            message="Unable to Load Portfolio"
            description={
              <div>
                <p className="mb-2">{getErrorFromException(error)}</p>
                <p className="text-sm text-gray-600">
                  Please check your connection and try again.
                </p>
              </div>
            }
            type="error"
            showIcon
            className="shadow-lg rounded-xl border-0"
          />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 flex justify-center items-center p-4">
        <div className="max-w-md w-full">
          <Alert
            message="No Portfolio Data"
            description="No portfolio data available at the moment. Please try again later."
            type="info"
            showIcon
            className="shadow-lg rounded-xl border-0"
          />
        </div>
      </div>
    );
  }

  // Extract sectors and portfolio summary from data
  const sectors = Object.entries(data).filter(
    ([key]) => key !== "portfolioSummary"
  );
  const portfolioSummary = data.portfolioSummary as PortfolioSummary;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <Card
            className="shadow-xl border-0 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-2">
              <div className="flex items-center mb-4 lg:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <DollarOutlined className="text-2xl text-white" />
                </div>
                <div>
                  <Title
                    level={1}
                    className="m-0 text-gray-800 font-bold text-2xl lg:text-3xl"
                  >
                    Portfolio Dashboard
                  </Title>
                  <p className="text-gray-600 text-sm lg:text-base mt-1 mb-0">
                    Real-time investment tracking and analytics
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <div className="text-sm">
                    <div className="text-gray-800 font-medium">
                      {lastUpdated.toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-gray-600">
                      Auto-refresh: 15s
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Portfolio Summary */}
        {portfolioSummary && (
          <PortfolioSummaryCard summary={portfolioSummary} />
        )}

        {/* Enhanced Charts Section */}
        <div className="mb-8">
          <Card
            className="shadow-xl border-0 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            }}
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <BarChartOutlined className="text-white" />
                </div>
                <Title level={3} className="m-0 text-gray-800 font-semibold">
                  Analytics Dashboard
                </Title>
              </div>

              <Tabs
                defaultActiveKey="1"
                className="enhanced-tabs"
                items={[
                  {
                    key: "1",
                    label: (
                      <span className="flex items-center">
                        <PieChartOutlined className="mr-2" />
                        Portfolio Distribution
                      </span>
                    ),
                    children: <PortfolioDistributionChart data={data} />,
                  },
                  {
                    key: "2",
                    label: (
                      <span className="flex items-center">
                        <BarChartOutlined className="mr-2" />
                        Sector Performance
                      </span>
                    ),
                    children: <SectorPerformanceChart data={data} />,
                  },
                ]}
              />
            </div>
          </Card>
        </div>

        {/* Sector-wise breakdown */}
        <div className="space-y-8">
          {sectors.map(([sectorName, sectorData]) => {
            const sector = sectorData as {
              stocks: Stock[];
              summary: SectorSummary;
            };

            if (sector.stocks.length === 0) {
              return (
                <Card
                  key={sectorName}
                  className="shadow-lg border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  }}
                >
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChartOutlined className="text-2xl text-gray-400" />
                    </div>
                    <Title level={4} className="text-gray-600 mb-2">
                      {sectorName}
                    </Title>
                    <p className="text-gray-500 mb-0">
                      No stocks available in this sector
                    </p>
                  </div>
                </Card>
              );
            }

            return (
              <div key={sectorName} className="sector-section">
                <SectorSummaryCard
                  sectorName={sectorName}
                  summary={sector.summary}
                />
                <SectorStocksTable
                  stocks={sector.stocks}
                  sectorName={sectorName}
                />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">
              Data updates every 15 seconds • Last update:{" "}
              {lastUpdated.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTable;
