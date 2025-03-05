import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { useEffect, useState } from "react";
import {
  Anchor,
  Button,
  Card,
  Flex,
  List,
  Text,
  Timeline,
} from "@mantine/core";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { Helmet } from "react-helmet";

interface Experience {
  title: string;
  company: string;
  website: string;
  start_date: string;
  end_date: string;
  skills: string[];
  description: string;
  bullets: string[];
}

function Experience() {
  const experienceBlockId = 1;
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const { data } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/block/${experienceBlockId}`
      );
      return response.json();
    },
  });

  useEffect(() => {
    const tempExperiences: Experience[] = [];
    data?.definition?.experiences?.map((experience: Experience) => {
      tempExperiences.push(experience);
    });
    setExperiences(tempExperiences);
  }, [data]);

  return (
    <Timeline
      active={experiences?.length}
      w={{ xs: "80%", md: "50%", lg: "40%" }}
    >
      <Helmet>
        {experiences.map((experience: Experience, index: number) => (
          <link key={index} rel="preload" href={experience.website} />
        ))}
      </Helmet>
      {experiences.map((experience: Experience, index: number) => (
        <Timeline.Item key={index}>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2 * index,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "var(--mantine-shadow-xl)",
              }}
              transition={{ type: "spring" }}
              style={{ borderRadius: "var(--mantine-radius-lg)" }}
            >
              <Card style={{ display: "flex", gap: "5px" }}>
                <Text size="sm" c={"blue"}>
                  {experience.start_date} - {experience.end_date}
                </Text>
                <Text size="lg" fw={500}>
                  {experience.title}
                </Text>
                <Anchor c="dimmed" size="sm" href={experience.website}>
                  {experience.company}
                </Anchor>
                <List spacing={"xs"} w={"100%"}>
                  {experience.bullets?.map((bullet: string, index: number) => (
                    <List.Item key={index} w={"95%"}>
                      {bullet}
                    </List.Item>
                  ))}
                </List>
                <Flex gap={5} mt={5} wrap={"wrap"}>
                  {experience.skills.map((skill: string, index: number) => (
                    <Button
                      aria-label="Skill"
                      key={index}
                      color="blue"
                      variant="filled"
                      size="compact-sm"
                      onClick={() => {
                        navigate(`/project?tags=${skill}`);
                      }}
                    >
                      {skill}
                    </Button>
                  ))}
                </Flex>
                <Button
                  aria-label="See projects"
                  variant="outline"
                  mt={5}
                  w={150}
                  rightSection={<IconArrowRight />}
                  onClick={() =>
                    navigate(`/project?tags=${experience.company}`)
                  }
                >
                  See projects
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

export default Experience;
