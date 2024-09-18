import { Bar, Doughnut } from "react-chartjs-2";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Home = () => {
  // Static data for charts
  const jobSeekersData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Job Seekers",
        data: [500, 700, 800, 900, 750, 850],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const companiesData = {
    labels: ["Tech", "Finance", "Healthcare", "Education", "Manufacturing"],
    datasets: [
      {
        label: "Companies",
        data: [120, 90, 130, 80, 150],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Job Seekers Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Job Seekers Over Time
          </h2>
          <div className="h-64">
            <Bar
              data={jobSeekersData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Companies by Industry Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Companies by Industry
          </h2>
          <div className="h-64">
            <Doughnut
              data={companiesData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-50 p-8 mt-10 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Company Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-6xl font-bold text-blue-600">500+</p>
            <p className="text-lg text-gray-600">Companies Registered</p>
          </div>
          <div>
            <p className="text-6xl font-bold text-blue-600">2000+</p>
            <p className="text-lg text-gray-600">Active Job Seekers</p>
          </div>
          <div>
            <p className="text-6xl font-bold text-blue-600">300+</p>
            <p className="text-lg text-gray-600">Jobs Posted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
