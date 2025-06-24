import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

// Styled components
const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  height: "100%",
}));

// Static data for charts
const taskStatusData = {
  labels: ["Completed", "In Progress", "Pending"],
  datasets: [
    {
      data: [45, 30, 25],
      backgroundColor: ["#4caf50", "#2196f3", "#f44336"],
      borderColor: ["#ffffff", "#ffffff", "#ffffff"],
      borderWidth: 1,
    },
  ],
};

const taskProgressData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Tasks Completed",
      data: [10, 15, 8, 20],
      backgroundColor: "#4caf50",
      maxBarThickness: 50, 
    },
    {
      label: "Tasks Assigned",
      data: [20, 25, 18, 30],
      backgroundColor: "#2196f3",
      maxBarThickness: 50,
    },
  ],
};

// Static student data
const students = [
  {
    id: 1,
    name: "John Doe",
    tasksCompleted: 12,
    tasksPending: 3,
    progress: 80,
  },
  {
    id: 2,
    name: "Jane Smith",
    tasksCompleted: 8,
    tasksPending: 5,
    progress: 60,
  },
  {
    id: 3,
    name: "Alice Johnson",
    tasksCompleted: 15,
    tasksPending: 1,
    progress: 90,
  },
];

const DefaultDashboard = () => {
  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom>
        Task Management Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />
 {/* Bar Chart */}
        <Grid item xs={12} sm={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Weekly Task Progress
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={taskProgressData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true },
                    x: { stacked: false },
                  },
                  plugins: {
                    legend: { position: "top" },
                    tooltip: { enabled: true },
                  },
                  barPercentage: 0.9, // Thicker bars
                  categoryPercentage: 0.7, // Less space between categories
                }}
              />
            </Box>
          </StyledPaper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} sm={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Task Status Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie
                data={taskStatusData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: { enabled: true },
                  },
                }}
              />
            </Box>
          </StyledPaper>
        </Grid>

      <Grid container spacing={2}>
       
        {/* Student Task Summary Table */}
        <Grid item xs={12} sm={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Student Task Summary
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Tasks Completed</TableCell>
                    <TableCell>Tasks Pending</TableCell>
                    <TableCell>Progress (%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.tasksCompleted}</TableCell>
                      <TableCell>{student.tasksPending}</TableCell>
                      <TableCell>{student.progress}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default DefaultDashboard;
