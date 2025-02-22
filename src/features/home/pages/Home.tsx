import { Stack } from "@mantine/core";
import { Hero } from "../components/Hero";
import Experience from "../components/Experience";
import HomeCard from "../components/HomeCard";
import Education from "../components/Education";

function Home() {
  return (
    <Stack gap={"lg"}>
      <Hero />
      <HomeCard title="Experience" children={<Experience />} />
      <HomeCard title="Education" children={<Education />} />
    </Stack>
  );
}

export default Home;
