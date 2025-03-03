import Experience from "../components/Experience";
import HomeCard from "../components/HomeCard";
import Education from "../components/Education";
import Certificates from "../components/Certificates";
import { Hero } from "../components/Hero";
import { useScrollIntoView } from "@mantine/hooks";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { Flex, Stack } from "@mantine/core";

function Home() {
  const { hash } = useLocation();

  const { scrollIntoView: scrollToExperience, targetRef: experienceRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });
  const { scrollIntoView: scrollToEducation, targetRef: educationRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });
  const { scrollIntoView: scrollToCertificates, targetRef: certificatesRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });

  useEffect(() => {
    switch (hash) {
      case "#experience":
        scrollToExperience();
        break;
      case "#education":
        scrollToEducation();
        break;
      case "#certificates":
        scrollToCertificates();
        break;
      default:
        break;
    }
  }, [hash]);

  return (
    <Stack gap={"lg"}>
      <Hero />
      <HomeCard
        title="Experience"
        children={<Experience />}
        ref={experienceRef}
      />
      <Flex h={100} />
      <HomeCard title="Education" children={<Education />} ref={educationRef} />
      <Flex h={100} />
      <HomeCard
        title="Certificates"
        children={<Certificates />}
        ref={certificatesRef}
      />
      <Flex h={100} />
    </Stack>
  );
}

export default Home;
