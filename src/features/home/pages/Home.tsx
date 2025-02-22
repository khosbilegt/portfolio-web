import { Flex, Stack } from "@mantine/core";
import { Hero } from "../components/Hero";
import Experience from "../components/Experience";
import HomeCard from "../components/HomeCard";
import Education from "../components/Education";
import Certificates from "../components/Certificates";

function Home() {
  return (
    <Stack gap={"lg"}>
      <Hero />
      <HomeCard title="Experience" children={<Experience />} />
      <Flex h={100} />
      <HomeCard title="Education" children={<Education />} />
      <Flex h={100} />
      <HomeCard title="Certificates" children={<Certificates />} />
      <Flex h={100} />
    </Stack>
  );
}

export default Home;
