import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { styled } from "@mui/material";
import { useFetchData } from "@/api/useFetchData";
import { useAddData } from "@/api/useAddData";
import { useEditData } from "@/api/useEditData";
import { useDeleteData } from "@/api/useDeleteData";
import Button from "@/components/commons/Button";
import TextInput from "@/components/commons/TextInput";
import Container from "@/components/commons/Container";
import toast from "react-hot-toast";
import { useUserStore, User } from "@/store/useUserStore";

const modalStyle = {
  position: "absolute" as const,
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
  flexDirection: "column" as const,
  gap: "16px",
};

const TableCard = styled("div")(() => ({
  background: "#fff",
  padding: 16,
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  maxHeight: 400,
  overflowY: "auto",
  marginTop: 16,
}));

const TableTitle = styled("h3")(() => ({
  fontSize: 16,
  fontWeight: 600,
  color: "#000",
}));

const DataGridOneComponent = () => {
  const { data, isLoading, isError } = useFetchData();
  const addMutation = useAddData();
  const editMutation = useEditData();
  const deleteMutation = useDeleteData();
  const { users, setUsers, addUser, updateUser, removeUser } = useUserStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  const handleOpenAdd = () => {
    setFormData({});
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleOpenEdit = (user: User) => {
    setFormData(user);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editMode && formData.id) {
        const updated = await editMutation.mutateAsync(formData as User);
        updateUser(updated);
        toast.success("User updated successfully");
      } else {
        const added = await addMutation.mutateAsync(
          formData as Omit<User, "id">
        );
        addUser(added);
        toast.success("User added successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Operation failed");
      }
    }
    setOpenDialog(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      removeUser(id);
      toast.success("User deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Delete failed");
      }
    }
  };

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  if (isLoading) return <CircularProgress />;
  if (isError)
    return (
      <Typography color="error">
        An error occurred while loading data
      </Typography>
    );

  return (
    <Container title="Data Grid One">
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <TableTitle>User List</TableTitle>
        <Button sx={{ width: 100 }} onClick={handleOpenAdd} text="Add Item" />
      </Box>
      <TableCard>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell sx={{ display: "flex" }} align="center">
                    <Button
                      onClick={() => handleOpenEdit(user)}
                      text="Edit"
                      variant="outlined"
                    />
                    <Button
                      onClick={() => handleDelete(user.id)}
                      text="Delete"
                      variant="outlined"
                      color="secondary"
                      style={{ marginLeft: 8 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableCard>

      <Modal open={openDialog} onClose={handleCloseDialog}>
        <Box sx={modalStyle}>
          <Typography variant="h6">
            {editMode ? "Edit User" : "Add User"}
          </Typography>
          <TextInput
            label="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <TextInput
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
          <Box display="flex" gap={2} mt={2}>
            <Button
              onClick={handleCloseDialog}
              text="Cancel"
              variant="outlined"
            />
            <Button onClick={handleSubmit} text={editMode ? "Update" : "Add"} />
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default DataGridOneComponent;
