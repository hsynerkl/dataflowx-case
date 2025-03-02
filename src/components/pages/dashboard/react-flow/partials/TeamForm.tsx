import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import TextInput from "@/components/commons/TextInput";
import Button from "@/components/commons/Button";
import { useTeamStore } from "@/store/useTeamStore";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z.string().min(1, "First name required"),
  surname: z.string().min(1, "Last name required"),
  age: z.number({ invalid_type_error: "Age required" }).min(1, "Age required"),
});

const teamSchema = z.object({
  teamName: z.string().min(1, "Team name required"),
  users: z.array(userSchema),
});

type TeamFormValues = z.infer<typeof teamSchema>;

const FormContainer = styled("form")(() => ({
  marginBottom: 8,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "400px",
}));

const TeamTitle = styled(Typography)(() => ({
  fontSize: "24px",
  fontWeight: 600,
}));

const UserCard = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  border: "1px solid #e9e9e9",
  borderRadius: "6px",
  padding: 16,
}));

const TeamForm = () => {
  const { addTeam } = useTeamStore();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: "",
      users: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const onSubmit: SubmitHandler<TeamFormValues> = (data) => {
    const teamId = "team-" + Date.now();
    const newTeam = {
      id: teamId,
      label: data.teamName,
      users: data.users.map((user, index) => ({
        id: `${teamId}-user-${index + 1}`,
        name: user.name,
        surname: user.surname,
        age: user.age,
        teamId,
      })),
      showUsers: true,
    };
    addTeam(newTeam);
    reset();
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <TeamTitle variant="h6">Create Team</TeamTitle>
      <TextInput
        label="Team Name"
        {...register("teamName")}
        error={!!errors.teamName}
        helperText={errors.teamName ? errors.teamName.message : ""}
      />
      {fields.map((field, index) => (
        <UserCard key={field.id}>
          <TextInput
            label="First Name"
            {...register(`users.${index}.name`)}
            error={!!errors.users?.[index]?.name}
            helperText={errors.users?.[index]?.name?.message}
          />
          <TextInput
            label="Last Name"
            {...register(`users.${index}.surname`)}
            error={!!errors.users?.[index]?.surname}
            helperText={errors.users?.[index]?.surname?.message}
          />
          <TextInput
            label="Age"
            type="number"
            {...register(`users.${index}.age`, { valueAsNumber: true })}
            error={!!errors.users?.[index]?.age}
            helperText={errors.users?.[index]?.age?.message}
          />
          <Button
            onClick={() => remove(index)}
            variant="outlined"
            color="secondary"
            text="Remove User"
          />
        </UserCard>
      ))}

      <Button
        onClick={() => append({ name: "", surname: "", age: 0 })}
        text="Add User"
      />
      <Button type="submit" text="Add Team" />
    </FormContainer>
  );
};

export default TeamForm;
