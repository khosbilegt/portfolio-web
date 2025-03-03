import {
  Anchor,
  Button,
  Card,
  Flex,
  Text,
  TextInput,
  Title,
  Notification,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [isLoginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid email address"),
      password: (value: any) => {
        if (value.length < 6) {
          return "Password is too short";
        }
      },
    },
  });

  const { data: loginData, mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (credentials: any) => {
      const response = await fetch(`${portfolioManagerURL}/api/user/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status != 200) {
        setLoginError(true);
        setLoginErrorMessage("Invalid email or password");
      } else {
        setLoginError(false);
      }
      return response.json();
    },
  });

  const { data: userData } = useQuery<any>({
    queryKey: ["user_info_login"],

    queryFn: async () => {
      const token: string | null = localStorage.getItem("token");
      if (token && token?.length > 0) {
        const response = await fetch(`${portfolioManagerURL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.json();
      } else {
        return {};
      }
    },
  });

  useEffect(() => {
    if (loginData?.token) {
      localStorage.setItem("token", loginData?.token);
      navigate("/");
    }
  }, [loginData]);

  useEffect(() => {
    if (userData?.username) {
      navigate("/");
    }
  }, [userData]);

  return (
    <Flex w={"100%"} justify="center" mih={"60vh"}>
      <Card
        shadow="md"
        w={{
          base: "100%",
          md: 500,
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            gap: "1rem",
          }}
          onSubmit={form.onSubmit((values) => {
            login(values);
          })}
        >
          <Title order={2}>Sign In</Title>
          {isLoginError && (
            <Notification color="red" w={"90%"} withCloseButton={false}>
              {loginErrorMessage}
            </Notification>
          )}
          <TextInput w={"90%"} label="Email" {...form.getInputProps("email")} />
          <TextInput
            w={"90%"}
            label="Password"
            type="password"
            {...form.getInputProps("password")}
          />
          <Button w={"90%"} type="submit">
            Login
          </Button>
          <Text c={"dimmed"}>
            Don't have an account yet?{" "}
            <Anchor href="/user/register">Sign up</Anchor>
          </Text>
          <Notification withCloseButton={false}>
            <Text>
              By logging in, you will get access to advanced features such as
            </Text>
            <Text>- Admin View in Guest Mode</Text>
            <Text>- Commenting on Blog Posts (WIP)</Text>
          </Notification>
        </form>
      </Card>
    </Flex>
  );
}

export default Login;
