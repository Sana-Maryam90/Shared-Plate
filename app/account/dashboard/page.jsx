"use client";
import { useRequests } from "@/app/hooks/RequestsContext";
import React from "react";
import Loader from "../components/Loader";
import { Bar, Pie } from "react-chartjs-2";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { requests, loading } = useRequests();
  // console.log(requests);
  if (loading) {
    return <Loader />;
  }


  const {
    closedGiveRequests,
    closedTakeRequests,
    ongoingGiveRequests,
    ongoingTakeRequests,
    openGiveRequests,
    openTakeRequests,
  } = requests;

  // Calculate the total counts
  const totalClosedRequests =
    closedGiveRequests.length + closedTakeRequests.length;
  const totalOngoingRequests =
    ongoingGiveRequests.length + ongoingTakeRequests.length;
  const totalOpenRequests = openGiveRequests.length + openTakeRequests.length;

  // Data for bar chart
  const barData = {
    labels: ["Closed Requests", "Ongoing Requests", "Open Requests"],
    datasets: [
      {
        label: "Requests",
        data: [totalClosedRequests, totalOngoingRequests, totalOpenRequests],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Data for pie chart
  const pieData = {
    labels: [
      "Closed Give",
      "Closed Take",
      "Ongoing Give",
      "Ongoing Take",
      "Open Give",
      "Open Take",
    ],
    datasets: [
      {
        label: "Requests Distribution",
        data: [
          closedGiveRequests.length,
          closedTakeRequests.length,
          ongoingGiveRequests.length,
          ongoingTakeRequests.length,
          openGiveRequests.length,
          openTakeRequests.length,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="w-full h-full p-6">
      {/* Request Counts */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Closed Requests</h3>
          <CountUp
            end={totalClosedRequests}
            duration={2}
            className="text-2xl"
          />
        </div>
        <div className="p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Ongoing Requests</h3>
          <CountUp
            end={totalOngoingRequests}
            duration={2}
            className="text-2xl"
          />
        </div>
        <div className="p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Open Requests</h3>
          <CountUp end={totalOpenRequests} duration={2} className="text-2xl" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-skyblue/75 border border-deepBlue/35 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Requests Overview</h3>
          <Bar data={barData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-skyblue/75 border border-deepBlue/35  p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Requests Breakdown</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;