import { Stack } from "@mantine/core";
import { Hero } from "../components/Hero";
import Experience from "../components/Experience";
import HomeCard from "../components/HomeCard";

function Home() {
  return (
    <Stack>
      <Hero />
      <HomeCard title="Experience" children={<Experience />} />
    </Stack>
  );
}

export default Home;
