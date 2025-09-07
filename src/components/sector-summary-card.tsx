import { Card, Col, Row } from "antd";
import type { SectorSummary } from "../api/api-types";
import { formatCurrency } from "../utils/format.utiils";
import { Progress, Typography, Badge } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
} from "@ant-design/icons";
const { Title } = Typography;

// Component for displaying sector summary
export const SectorSummaryCard: React.FC<{
  sectorName: string;
  summary: SectorSummary;
}> = ({ sectorName, summary }) => {
  const isPositive = summary.gainLossColor === "green";
  const returnPercentage = (
    (summary.totalGainLoss / summary.totalInvestment) *
    100
  ).toFixed(2);

  return (
    <Card
      size="small"
      className="mb-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
      style={{
        background: isPositive
          ? "linear-gradient(135deg, #f6ffed 0%, #e6f7ff 100%)"
          : "linear-gradient(135deg, #fff2e8 0%, #fff1f0 100%)",
      }}
    >
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-3 ${
                isPositive ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <Title level={4} className="m-0 text-gray-800 font-semibold">
              {sectorName}
            </Title>
          </div>
          <Badge
            count={
              isPositive ? "+" + returnPercentage + "%" : returnPercentage + "%"
            }
            style={{
              backgroundColor: isPositive ? "#52c41a" : "#ff4d4f",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
        </div>

        {/* Progress Bar for Sector Performance */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-600">Sector Performance</span>
            <span className="text-xs font-medium text-gray-800">
              {Math.abs(parseFloat(returnPercentage))}%
            </span>
          </div>
          <Progress
            percent={Math.min(Math.abs(parseFloat(returnPercentage)), 100)}
            strokeColor={isPositive ? "#52c41a" : "#ff4d4f"}
            showInfo={false}
            size="small"
          />
        </div>

        {/* Statistics Grid */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <div className="text-center p-3 bg-white/60 rounded-lg border border-gray-100">
              <div className="flex items-center justify-center mb-2">
                <DollarOutlined className="text-blue-500 mr-1" />
                <span className="text-xs text-gray-600 font-medium">
                  Investment
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">
                {formatCurrency(summary.totalInvestment)}
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="text-center p-3 bg-white/60 rounded-lg border border-gray-100">
              <div className="flex items-center justify-center mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                <span className="text-xs text-gray-600 font-medium">
                  Present Value
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">
                {formatCurrency(summary.totalPresentValue)}
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="text-center p-3 bg-white/60 rounded-lg border border-gray-100">
              <div className="flex items-center justify-center mb-2">
                {isPositive ? (
                  <ArrowUpOutlined className="text-green-500 mr-1" />
                ) : (
                  <ArrowDownOutlined className="text-red-500 mr-1" />
                )}
                <span className="text-xs text-gray-600 font-medium">
                  Gain/Loss
                </span>
              </div>
              <div
                className={`text-lg font-bold ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(summary.totalGainLoss)}
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="text-center p-3 bg-white/60 rounded-lg border border-gray-100">
              <div className="flex items-center justify-center mb-2">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    isPositive ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-xs text-gray-600 font-medium">
                  Return %
                </span>
              </div>
              <div
                className={`text-lg font-bold ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {returnPercentage}%
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};
