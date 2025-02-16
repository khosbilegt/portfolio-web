import { Flex, Stack } from "@mantine/core";
import { Hero } from "../components/Hero";
import Experience from "../components/Experience";

function Home() {
  return (
    <Stack>
      <Hero />
      <Flex justify={"center"}>
        <Experience />
      </Flex>
    </Stack>
  );
}

export default Home;
