import React from "react";
import { Card, Row, Typography, Col, Progress } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { PortfolioSummary } from "../api/api-types";
import { formatCurrency } from "../utils/format.utiils";
const { Title } = Typography;

// Component for portfolio summary

export const PortfolioSummaryCard: React.FC<{ summary: PortfolioSummary }> = ({
  summary,
}) => {
  const isPositive = summary.gainLossColor === "green";
  const totalReturnPercentage = (
    (summary.totalGainLoss / summary.totalInvestment) *
    100
  ).toFixed(2);

  return (
    <Card
      className="mb-8 shadow-2xl border-0 overflow-hidden"
      style={{
        background: isPositive
          ? "linear-gradient(135deg, #0191B4 0%, #52c41a 100%)"
          : "linear-gradient(135deg, #0191B4 0%, #ff4d4f 100%)",
      }}
    >
      <div className="relative p-2">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

        {/* Header */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <DollarOutlined className="text-2xl text-white" />
              </div>
              <div>
                <Title level={2} className="m-0 text-white font-bold">
                  Portfolio Overview
                </Title>
                <p className="text-white/80 text-sm mt-1 mb-0">
                  Your investment performance at a glance
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-xs uppercase tracking-wider">
                Total Return
              </div>
              <div className="text-white text-2xl font-bold">
                {isPositive ? "+" : ""}
                {totalReturnPercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <Row gutter={[24, 24]} className="relative z-10">
          <Col xs={12} lg={6}>
            <div className="text-center p-6 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarOutlined className="text-xl text-white" />
              </div>
              <div className="text-white/80 text-sm font-medium mb-2">
                Total Investment
              </div>
              <div className="text-white text-xl font-bold">
                {formatCurrency(summary.totalInvestment)}
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="text-center p-6 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <div className="text-white/80 text-sm font-medium mb-2">
                Present Value
              </div>
              <div className="text-white text-xl font-bold">
                {formatCurrency(summary.totalPresentValue)}
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="text-center p-6 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {isPositive ? (
                  <ArrowUpOutlined className="text-xl text-white" />
                ) : (
                  <ArrowDownOutlined className="text-xl text-white" />
                )}
              </div>
              <div className="text-white/80 text-sm font-medium mb-2">
                Total Gain/Loss
              </div>
              <div className="text-white text-xl font-bold">
                {formatCurrency(summary.totalGainLoss)}
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="text-center p-6 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-white text-lg font-bold">%</div>
              </div>
              <div className="text-white/80 text-sm font-medium mb-2">
                Total Return %
              </div>
              <div className="text-white text-xl font-bold">
                {isPositive ? "+" : ""}
                {totalReturnPercentage}%
              </div>
            </div>
          </Col>
        </Row>

        {/* Performance Indicator */}
        <div className="mt-6 relative z-10">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">
                Portfolio Performance
              </span>
              <span className="text-white font-medium text-sm">
                {Math.abs(parseFloat(totalReturnPercentage))}%
              </span>
            </div>
            <Progress
              percent={Math.min(
                Math.abs(parseFloat(totalReturnPercentage)),
                100
              )}
              strokeColor="#ffffff"
              trailColor="rgba(255, 255, 255, 0.2)"
              showInfo={false}
              strokeWidth={8}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
