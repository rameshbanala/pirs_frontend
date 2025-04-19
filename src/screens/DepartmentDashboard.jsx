// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import DepartmentPosts from "./DepartmentPosts";
// import axios from "axios";

// const DepartmentDashboard = () => {
//   const navigate = useNavigate();
//   const { department } = useParams(); // Dynamic department routing
//   const [adminName, setAdminName] = useState("Department Admin");
//   const [stats, setStats] = useState({ totalComplaints: 0, resolved: 0, pending: 0 });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/posts/department/${department}`);
//         const allPosts = res.data;
//   console.log(allPosts);
//         const totalComplaints = allPosts.length;
//         const resolved = allPosts.filter(post => post.status === "resolved").length;
//         const pending = totalComplaints - resolved;
  
//         setStats({
//           totalComplaints,
//           resolved,
//           pending,
//         });
  
//         setAdminName(
//           `${department.charAt(0).toUpperCase() + department.slice(1)} Dept Admin`
//         );
//       } catch (error) {
//         console.error("Error fetching department posts:", error);
//       }
//     };
  
//     fetchStats();
//   }, [department]);
  
//   return (
//     <div className="font-sans bg-white text-[#2C2C2C] min-h-screen px-6 md:px-20 py-10 mt-10">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-10">
//         <h1 className="text-4xl font-extrabold text-[#FF7F32]">
//           {adminName} Dashboard
//         </h1>
//         <button
//           onClick={() => navigate("/")}
//           className="bg-[#FF7F32] hover:bg-[#FF5F20] text-white px-6 py-2 rounded-full font-medium"
//         >
//           Go to Home
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-3 gap-6 mb-12">
//         {[
//           { label: "Total Complaints", value: stats.totalComplaints, color: "#43A8FF" },
//           { label: "Resolved", value: stats.resolved, color: "#16A34A" },
//           { label: "Pending", value: stats.pending, color: "#DC2626" },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="bg-[#F9FAFB] rounded-xl p-6 shadow hover:shadow-lg transition-all"
//           >
//             <h3 className="text-lg font-semibold text-gray-700">{item.label}</h3>
//             <p className="text-3xl font-bold" style={{ color: item.color }}>
//               {item.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Department Complaints */}
//       <div className="mb-12">
//         <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
//           Recent Complaints
//         </h2>
//         <DepartmentPosts department={department} />
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
//           Quick Actions
//         </h2>
//         <div className="flex flex-wrap gap-4">
//           <button className="bg-[#43A8FF] hover:bg-[#318CE7] text-white px-6 py-3 rounded-xl shadow transition">
//             Assign Staff
//           </button>
//           <button className="bg-[#FF7F32] hover:bg-[#FF5F20] text-white px-6 py-3 rounded-xl shadow transition">
//             Mark All as Read
//           </button>
//           <button className="bg-gray-200 hover:bg-gray-300 text-[#2C2C2C] px-6 py-3 rounded-xl transition">
//             Generate Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DepartmentDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentPosts from "./DepartmentPosts";
import axios from "axios";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DepartmentDashboard = () => {
  const navigate = useNavigate();
  const { department } = useParams(); // Dynamic department routing
  const [adminName, setAdminName] = useState("Department Admin");
  const [stats, setStats] = useState({ totalComplaints: 0, resolved: 0, pending: 0 });
  const [showReport, setShowReport] = useState(false); // New state to toggle report visibility

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/department/${department}`);
        const allPosts = res.data;
        console.log(allPosts);
        const totalComplaints = allPosts.length;
        const resolved = allPosts.filter(post => post.status === "resolved").length;
        const pending = totalComplaints - resolved;

        setStats({
          totalComplaints,
          resolved,
          pending,
        });

        setAdminName(
          `${department.charAt(0).toUpperCase() + department.slice(1)} Dept Admin`
        );
      } catch (error) {
        console.error("Error fetching department posts:", error);
      }
    };

    fetchStats();
  }, [department]);

  // Toggle report visibility when "Generate Report" is clicked
  const handleGenerateReport = () => {
    setShowReport(true);
  };

  // Chart Data Configuration for Bar Chart
  const chartDataBar = {
    labels: ['Total Complaints', 'Resolved', 'Pending'],
    datasets: [
      {
        label: 'Complaint Stats (Bar)',
        data: [stats.totalComplaints, stats.resolved, stats.pending],
        backgroundColor: ['#FF7F32', '#16A34A', '#DC2626'],
        borderRadius: 8,
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data Configuration
  const chartDataPie = {
    labels: ['Resolved', 'Pending'],
    datasets: [
      {
        label: 'Complaint Distribution (Pie)',
        data: [stats.resolved, stats.pending],
        backgroundColor: ['#16A34A', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  // Doughnut Chart Data Configuration
  const chartDataDoughnut = {
    labels: ['Resolved', 'Pending'],
    datasets: [
      {
        label: 'Complaint Distribution (Doughnut)',
        data: [stats.resolved, stats.pending],
        backgroundColor: ['#16A34A', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Complaints Statistics',
        font: { size: 18 },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 14 },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="font-sans bg-white text-[#2C2C2C] min-h-screen px-6 md:px-20 py-10 mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#FF7F32]">
          {adminName} Dashboard
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-[#FF7F32] hover:bg-[#FF5F20] text-white px-6 py-2 rounded-full font-medium"
        >
          Go to Home
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Total Complaints", value: stats.totalComplaints, color: "#43A8FF" },
          { label: "Resolved", value: stats.resolved, color: "#16A34A" },
          { label: "Pending", value: stats.pending, color: "#DC2626" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#F9FAFB] rounded-xl p-6 shadow hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-700">{item.label}</h3>
            <p className="text-3xl font-bold" style={{ color: item.color }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Department Complaints */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
          Recent Complaints
        </h2>
        <DepartmentPosts department={department} />
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-[#43A8FF] hover:bg-[#318CE7] text-white px-6 py-3 rounded-xl shadow transition">
            Assign Staff
          </button>
          <button className="bg-[#FF7F32] hover:bg-[#FF5F20] text-white px-6 py-3 rounded-xl shadow transition">
            Mark All as Read
          </button>
          <button 
            onClick={handleGenerateReport} 
            className="bg-gray-200 hover:bg-gray-300 text-[#2C2C2C] px-6 py-3 rounded-xl transition"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Display Report when the button is clicked */}
      {showReport && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
            Department Report
          </h2>
          <div className="bg-[#F9FAFB] rounded-xl p-6 shadow transition-all">
            <p className="text-xl font-semibold text-gray-700">Total Complaints: {stats.totalComplaints}</p>
            <p className="text-xl font-semibold text-[#16A34A]">Resolved: {stats.resolved}</p>
            <p className="text-xl font-semibold text-[#DC2626]">Pending: {stats.pending}</p>
          </div>
          <div className="mt-10 flex justify-between space-x-4">
            {/* Bar Chart and Pie Chart side by side */}
            <div style={{ width: "48%", height: "300px" }}>
              <h3 className="text-xl font-semibold mb-4">Complaint Stats (Bar Chart)</h3>
              <Bar data={chartDataBar} options={chartOptions} />
            </div>

            <div style={{ width: "48%", height: "300px" }}>
              <h3 className="text-xl font-semibold mb-4">Complaint Distribution (Pie Chart)</h3>
              <Pie data={chartDataPie} />
            </div>
          </div>

          <div className="mt-10">
            {/* Doughnut Chart below the two charts */}
            <h3 className="text-xl font-semibold mb-4">Complaint Distribution (Doughnut Chart)</h3>
            <div style={{ width: "70%", height: "300px" }}>
              <Doughnut data={chartDataDoughnut} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentDashboard;
