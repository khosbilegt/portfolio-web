import { Anchor, Stack, Text } from "@mantine/core";

function Dashboard() {
  return (
    <Stack mih={"80vh"}>
      <Text>
        The Dashboard is delegated to Grafana, self-hosted at{" "}
        <Anchor href="https://grafana.koso.dev">
          grafana.koso.dev
        </Anchor>
      </Text>
      <iframe
        style={{
          height: "80vh",
        }}
        src="https://grafana.koso.dev/d/b6a8de2e-053d-488a-8533-9a15364c5b6a/jvm-micrometer?orgId=1&refresh=30s&from=1740761263941&to=1740847663941"
      />
    </Stack>
  );
}

export default Dashboard;
