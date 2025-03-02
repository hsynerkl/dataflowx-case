import Container from "@/components/commons/Container";
import { styled } from "@mui/material";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTeamStore } from "@/store/useTeamStore";

const ChartGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(2),
  },
}));

const ChartCard = styled("div")(() => ({
  background: "#fff",
  padding: 8,
  borderRadius: 6,
  border: "1px solid #e9e9e9",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ChartTitle = styled("h3")(() => ({
  fontSize: 16,
  fontWeight: 600,
  color: "#000",
  marginBottom: 4,
}));

const pieColors = [
  "#0D47A1",
  "#1976D2",
  "#64B5F6",
  "#BBDEFB",
  "#90CAF9",
  "#42A5F5",
];

const DashboardComponent = () => {
  const { teams } = useTeamStore();

  const pieData = teams.map((team) => ({
    name: team.label,
    value: team.users.length,
  }));

  const barData = teams.map((team) => {
    const avgAge =
      team.users.length > 0
        ? team.users.reduce((sum, user) => sum + user.age, 0) /
          team.users.length
        : 0;
    return { name: team.label, avgAge: Math.round(avgAge) };
  });

  return (
    <Container title="Home">
      <ChartGrid>
        <div>
          <ChartTitle>Team User Count </ChartTitle>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ color: "#000" }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div>
          <ChartTitle>Average Age per Team </ChartTitle>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Legend wrapperStyle={{ color: "#000" }} />
                <Bar dataKey="avgAge" fill="#0D47A1" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </ChartGrid>
    </Container>
  );
};

export default DashboardComponent;
