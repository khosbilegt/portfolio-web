import { Hero } from "../components/Hero";
import { useScrollIntoView } from "@mantine/hooks";
import { useLocation } from "react-router";
import { useEffect, lazy } from "react";
import { Flex, Stack } from "@mantine/core";

const HomeCard = lazy(() => import("../components/HomeCard"));
const Experience = lazy(() => import("../components/Experience"));
const Education = lazy(() => import("../components/Education"));
const Certificates = lazy(() => import("../components/Certificates"));
const OpenSource = lazy(() => import("../components/OpenSource"));
const Featured = lazy(() => import("../components/Featured"));
const Skills = lazy(() => import("../components/Skills"));

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
  const { scrollIntoView: scrollToFeatured, targetRef: featuredRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });
  const { scrollIntoView: scrollToSkills, targetRef: skillsRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });
  const { scrollIntoView: scrollToOpenSource, targetRef: openSourceRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });

  useEffect(() => {
    switch (hash) {
      case "#experience":
        scrollToExperience();
        break;
      case "#featured": {
        scrollToFeatured();
        break;
      }
      case "#education":
        scrollToEducation();
        break;
      case "#certificate":
        scrollToCertificates();
        break;
      case "#skills":
        scrollToSkills();
        break;
      case "#open-source":
        scrollToOpenSource();
        break;
      default:
        break;
    }
  }, [hash]);

  return (
    <Stack gap={"lg"}>
      <Hero />
      <HomeCard
        title="Featured Projects"
        children={<Featured />}
        ref={featuredRef}
      />
      <Flex h={100} />
      <HomeCard
        title="Experience"
        children={<Experience />}
        ref={experienceRef}
      />
      <Flex h={50} />
      <HomeCard title="Education" children={<Education />} ref={educationRef} />
      <Flex h={50} />
      <HomeCard
        title="Certificates"
        children={<Certificates />}
        ref={certificatesRef}
      />
      <Flex h={50} />
      <HomeCard
        title="Open Source"
        children={<OpenSource />}
        ref={openSourceRef}
      />
      <Flex h={50} />
      <HomeCard title="Hats" children={<Skills />} ref={skillsRef} />
      <Flex h={100} />
    </Stack>
  );
}

export default Home;
