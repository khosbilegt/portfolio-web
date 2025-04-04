"use client";
import { lazy, useEffect } from "react";
import { Flex, Stack } from "@mantine/core";
import { usePathname } from "next/navigation";

const Hero = lazy(() => import("./components/home/Hero"));
const HomeCard = lazy(() => import("./components/home/HomeCard"));
const Experience = lazy(() => import("./components/home/Experience"));
const Education = lazy(() => import("./components/home/Education"));
const Certificates = lazy(() => import("./components/home/Certificates"));
const OpenSource = lazy(() => import("./components/home/OpenSource"));
const Featured = lazy(() => import("./components/home/Featured"));
const Skills = lazy(() => import("./components/home/Skills"));

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    const element = document.getElementById(hash.substring(1));
    element?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [pathname]);

  return (
    <Stack gap={"lg"}>
      <Hero />
      <HomeCard title="Featured Projects" sectionId="featured">
        <Featured />
      </HomeCard>
      <Flex h={100} />
      <HomeCard title="Experience" sectionId="experience">
        <Experience />
      </HomeCard>
      <Flex h={50} />
      <HomeCard title="Education" sectionId="education">
        <Education />
      </HomeCard>
      <Flex h={50} />
      <HomeCard title="Certificates" sectionId="certificate">
        <Certificates />
      </HomeCard>
      <Flex h={50} />
      <HomeCard title="Open Source" sectionId="open-source">
        <OpenSource />
      </HomeCard>
      <Flex h={50} />
      <HomeCard title="Hats" sectionId="skills">
        <Skills />
      </HomeCard>
      <Flex h={100} />
    </Stack>
  );
}
