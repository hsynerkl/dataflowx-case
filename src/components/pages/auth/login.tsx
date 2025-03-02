import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { styled } from "@mui/material/styles";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import Typography from "@/components/commons/Typography";
import TextInput from "@/components/commons/TextInput";
import Button from "@/components/commons/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import LogoIcon from "@/assets/icons/LogoIcon";
import UserIcon from "@/assets/icons/UserIcon";
import RightColumnImage from "@/assets/images/right-column.avif";
import {
  Engine,
  IParticlesOptions,
  RecursivePartial,
} from "tsparticles-engine";
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordIcon from "@/assets/icons/PasswordIcon";
import { useLoginMutation } from "@/api/useLoginMutation";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  rememberMe: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

const particlesOptions: RecursivePartial<IParticlesOptions> = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#367AFF",
    },
    size: {
      value: { min: 1, max: 5 },
      animation: {
        enable: true,
        speed: 3,
        minimumValue: 0.3,
        sync: false,
      },
    },
    opacity: {
      value: { min: 0.3, max: 1 },
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: { min: 0.2, max: 1.5 },
      direction: "none",
      outModes: { default: "bounce" },
      angle: {
        value: 90,
        offset: 0,
      },
      drift: 0,
    },
  },
  detectRetina: true,
};

const Container = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  padding: "8px",
  height: "100vh",
}));

const Content = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "5fr 7fr",
  width: "100%",
  maxWidth: "1440px",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const LeftColumn = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const FormContainer = styled("form")(() => ({
  width: "100%",
  maxWidth: "400px",
  margin: "auto",
}));

const RightColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const RightColumnImageStyled = styled("img")(() => ({
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
}));

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const isLoading = loginMutation.isPending;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      await loginMutation.mutateAsync(data);
      toast.success("Login successful!");
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Container>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      <Content>
        <LeftColumn>
          <Box display="flex" alignItems="center" gap={1.5}>
            <LogoIcon />
            <Typography
              variant="h6"
              fontSize={24}
              fontWeight={600}
              text="Revolutie"
            />
          </Box>

          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h3"
              fontSize={44}
              fontWeight="bold"
              text="Sign In"
            />
            <Typography
              mb={4}
              mt={1}
              color="#969696"
              text="Please login to continue to your account."
            />

            <TextInput
              iconLeft={<UserIcon />}
              label="Username"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextInput
              iconLeft={<PasswordIcon />}
              iconRight={
                showPassword ? (
                  <VisibilityOff sx={{ fontSize: 18, color: "#9A9A9A" }} />
                ) : (
                  <Visibility sx={{ fontSize: 18, color: "#9A9A9A" }} />
                )
              }
              onIconRightClick={() => setShowPassword((prev) => !prev)}
              label="Password"
              type={showPassword ? "text" : "password"}
              sx={{ mt: 2 }}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <FormControlLabel
              control={<Checkbox {...register("rememberMe")} />}
              label={
                <Typography
                  color="#969696"
                  text="Keep logged in"
                  sx={{ fontSize: 14, userSelect: "none", marginBottom: "2px" }}
                />
              }
              sx={{ my: 1, gap: 0, alignItems: "center" }}
            />

            <Button
              fullWidth
              type="submit"
              text="Sign In"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </FormContainer>
        </LeftColumn>

        <RightColumn>
          <RightColumnImageStyled
            src={RightColumnImage}
            alt="Login Background"
          />
        </RightColumn>
      </Content>
    </Container>
  );
}
