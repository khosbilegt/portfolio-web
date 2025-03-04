import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { useEffect, useState } from "react";
import { Anchor, Button, Card, Flex, Text, Timeline } from "@mantine/core";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { PageDefinition, Tag } from "../../../types/types";
import ExperienceCard from "./ExperienceCard";

interface Experience {
  title: string;
  company: string;
  website: string;
  start_date: string;
  end_date: string;
  skills: string[];
  description: string;
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
  const { data: projectData } = useQuery(["blogs"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page`);
    return response.json();
  });

  useEffect(() => {
    console.log(projectData);
  }, [projectData]);

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
                <Text size="md">{experience.description}</Text>
                <Flex gap={5} mt={5} wrap={"wrap"}>
                  {experience.skills.map((skill: string, index: number) => (
                    <Button
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
                <Flex mt={5} gap={5}>
                  {projectData?.map(
                    (project: PageDefinition, index: number) => {
                      let tagIncluded = false;
                      project.tags.forEach((tag: Tag) => {
                        if (tag.name === experience.company) {
                          tagIncluded = true;
                        }
                      });
                      if (true) {
                        return (
                          <ExperienceCard
                            title={project.title}
                            subtitle={project.subtitle}
                            projectKey={project.key}
                          />
                        );
                      } else {
                        return <div key={index} />;
                      }
                    }
                  )}
                </Flex>
                <Button
                  variant="outline"
                  mt={5}
                  w={150}
                  rightSection={<IconArrowRight />}
                  onClick={() =>
                    navigate(`/project?tags=${experience.company}`)
                  }
                >
                  See more
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
