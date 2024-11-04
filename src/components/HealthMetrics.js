import React from "react";
import HealthMetricsChart from "./HealthMetricsChart";
import HealthMetricsOverview from "./HealthMetricsOverview";

const HealthMetrics = () => {
  return (
    <div>
      <h1>Health Metrics Dashboard</h1>
      <div style={{ marginBottom: "2rem" }}>
        <HealthMetricsChart /> {/* Chart displaying the trends */}
      </div>
      <HealthMetricsOverview /> {/* Overview displaying individual metric entries */}
    </div>
  );
};

export default HealthMetrics;
