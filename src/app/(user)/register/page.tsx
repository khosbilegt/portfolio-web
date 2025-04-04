"use client";
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
import { portfolioManagerURL } from "@/app/variables";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const [isRegisterError, setRegisterError] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
      repeat_password: "",
    },
    validate: {
      email: isEmail("Invalid email address"),
      password: (value: any) => {
        if (value.length < 6) {
          return "Password is too short";
        }
      },
      repeat_password: (value: any, values: any) => {
        if (value !== values.password) {
          return "Passwords do not match";
        }
      },
    },
  });

  const { data: registerData, mutate: register } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (credentials: any) => {
      const response = await fetch(`${portfolioManagerURL}/api/user/register`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status != 200) {
        setRegisterError(true);
        setRegisterErrorMessage("Invalid email or password");
      } else {
        setRegisterError(false);
      }
      return response.json();
    },
  });

  const { data: userData } = useQuery<any>({
    queryKey: ["user_info_register"],

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
    if (registerData?.token) {
      localStorage.setItem("token", registerData?.token);
      router.push("/");
    }
  }, [registerData]);

  useEffect(() => {
    if (userData?.username) {
      router.push("/");
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
            register(values);
          })}
        >
          <Title order={2}>Sign Up</Title>
          {isRegisterError && (
            <Notification color="red" w={"90%"} withCloseButton={false}>
              {registerErrorMessage}
            </Notification>
          )}
          <TextInput w={"90%"} label="Email" {...form.getInputProps("email")} />
          <TextInput
            w={"90%"}
            label="Username"
            {...form.getInputProps("username")}
          />
          <TextInput
            w={"90%"}
            label="Password"
            type="password"
            {...form.getInputProps("password")}
          />
          <TextInput
            w={"90%"}
            label="Repeat Password"
            type="password"
            {...form.getInputProps("repeat_password")}
          />
          <Button w={"90%"} type="submit" aria-label="Register">
            Register
          </Button>
          <Text c={"dimmed"}>
            Don&apos;t have an account yet?{" "}
            <Anchor href="/user">Sign up</Anchor>
          </Text>
        </form>
      </Card>
    </Flex>
  );
}

export default Register;
