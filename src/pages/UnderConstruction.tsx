import { Progress, Stack, Text, Title } from "@mantine/core";

function UnderConstruction() {
  return (
    <Stack justify="center" align="center" w={"100%"} mih={"60vh"} gap="md">
      <Text>This feature is currently </Text>
      <Title>UNDER CONSTRUCTION</Title>
      <Progress
        value={100}
        striped
        animated
        w={{
          base: "80%",
          sm: "50%",
          md: "40%",
          lg: "20%",
        }}
      />
    </Stack>
  );
}

export default UnderConstruction;
