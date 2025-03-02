import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import TextInput from "@/components/commons/TextInput";
import Button from "@/components/commons/Button";
import { useTeamStore } from "@/store/useTeamStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "@/components/commons/Select";

const userSchema = z.object({
  teamId: z.string().min(1, "Team selection required"),
  name: z.string().min(1, "First name required"),
  surname: z.string().min(1, "Last name required"),
  age: z.number({ invalid_type_error: "Age required" }).min(1, "Age required"),
});

type UserFormValues = z.infer<typeof userSchema>;

const FormContainer = styled("form")(() => ({
  marginBottom: 8,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "400px",
}));

const FormTitle = styled(Typography)(() => ({
  fontSize: "24px",
  fontWeight: 600,
  marginBottom: -6,
}));

const UserForm = () => {
  const { teams, addUserToTeam } = useTeamStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      teamId: "",
      name: "",
      surname: "",
      age: 0,
    },
  });

  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    const userId = "user-" + Date.now();
    const newUser = {
      id: userId,
      name: data.name,
      surname: data.surname,
      age: data.age,
      teamId: data.teamId,
    };
    addUserToTeam(data.teamId, newUser);
    reset();
  };

  const teamOptions = teams.map((team) => ({
    value: team.id,
    label: team.label,
  }));

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle variant="h6">Add User</FormTitle>
      <Select
        label="Select Team"
        options={teamOptions}
        error={!!errors.teamId}
        helperText={errors.teamId ? errors.teamId.message : ""}
        {...register("teamId")}
      />
      <TextInput
        label="First Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
      />
      <TextInput
        label="Last Name"
        {...register("surname")}
        error={!!errors.surname}
        helperText={errors.surname ? errors.surname.message : ""}
      />
      <TextInput
        label="Age"
        type="number"
        {...register("age", { valueAsNumber: true })}
        error={!!errors.age}
        helperText={errors.age ? errors.age.message : ""}
      />
      <Button type="submit" text="Add User" />
    </FormContainer>
  );
};

export default UserForm;
