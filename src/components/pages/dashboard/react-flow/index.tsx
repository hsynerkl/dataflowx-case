import { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  MiniMap,
  Background,
  Node,
  Edge,
  NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Button from "@/components/commons/Button";
import { Modal, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useTeamStore } from "@/store/useTeamStore";
import TeamForm from "./partials/TeamForm";
import UserForm from "./partials/UserForm";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  maxHeight: "75vh",
  overflowY: "auto",
  overflowX: "hidden",
  bgcolor: "#fff",
  padding: "16px",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
};

const Container = styled(Box)({
  width: "100%",
  height: "100vh",
  position: "relative",
});

const ButtonContainer = styled(Box)({
  position: "absolute",
  right: 32,
  top: 16,
  zIndex: 10,
  width: 260,
  gap: 16,
  display: "flex",
  alignItems: "center",
});

const ReactFlowComponent = () => {
  const { teams, toggleTeamUsers, removeUserFromTeam } = useTeamStore();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [nodePositions, setNodePositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      setNodePositions((prev) => {
        const newPositions = { ...prev };
        changes.forEach((change) => {
          if (change.type === "position" && change.id && change.position) {
            newPositions[change.id] = change.position;
          }
        });
        return newPositions;
      });
    },
    [onNodesChange]
  );

  useEffect(() => {
    const newNodes: Node[] = teams.flatMap((team, teamIndex) => {
      const defaultTeamPos = { x: teamIndex * 250 + 100, y: 50 };
      const teamNode: Node = {
        id: team.id,
        type: "default",
        data: { label: team.label, nodeType: "team" },
        position: nodePositions[team.id] || defaultTeamPos,
      };

      const userNodes: Node[] = team.showUsers
        ? team.users.map((user, userIndex) => {
            const defaultUserPos = {
              x: teamIndex * 250 + 100,
              y: 150 + userIndex * 70,
            };
            return {
              id: user.id,
              type: "default",
              data: {
                label: `${user.name} ${user.surname}, ${user.age}`,
                nodeType: "user",
                teamId: user.teamId,
              },
              position: nodePositions[user.id] || defaultUserPos,
            };
          })
        : [];
      return [teamNode, ...userNodes];
    });

    setNodes(newNodes);

    const newEdges: Edge[] = teams.flatMap((team) =>
      team.showUsers
        ? team.users.map((user) => ({
            id: `e-${team.id}-${user.id}`,
            source: team.id,
            target: user.id,
            animated: true,
          }))
        : []
    );
    setEdges(newEdges);
  }, [teams]);

  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);

  const handleOpenCreateTeam = () => setOpenCreateTeam(true);
  const handleCloseCreateTeam = () => setOpenCreateTeam(false);
  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>, node: Node) => {
      event.preventDefault();
      const nodeType = node.data.nodeType as string;
      if (nodeType === "team") {
        toggleTeamUsers(node.id);
      } else if (nodeType === "user") {
        removeUserFromTeam(node.data.teamId as string, node.id);
      }
    },
    [toggleTeamUsers, removeUserFromTeam]
  );

  return (
    <Container>
      <ButtonContainer>
        <Button text="Create Team" onClick={handleOpenCreateTeam} />
        <Button text="Add User" onClick={handleOpenAddUser} />
      </ButtonContainer>

      <Modal open={openCreateTeam} onClose={handleCloseCreateTeam}>
        <Box sx={modalStyle}>
          <TeamForm />
        </Box>
      </Modal>

      <Modal open={openAddUser} onClose={handleCloseAddUser}>
        <Box sx={modalStyle}>
          <UserForm />
        </Box>
      </Modal>

      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeContextMenu={onNodeContextMenu}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <MiniMap />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </Container>
  );
};

export default ReactFlowComponent;
