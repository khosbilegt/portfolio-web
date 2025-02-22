import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { useEffect, useState } from "react";
import { Button, Card, Flex, Text, Timeline } from "@mantine/core";
import { useNavigate } from "react-router";

interface Experience {
  title: string;
  company: string;
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

  useEffect(() => {
    const tempExperiences: Experience[] = [];
    data?.definition?.experiences?.map((experience: Experience) => {
      tempExperiences.push(experience);
    });
    setExperiences(tempExperiences);
  }, [data]);

  return (
    <Timeline active={experiences?.length - 2} w={"50%"}>
      {experiences.map((experience: Experience, index: number) => (
        <Timeline.Item key={index}>
          <Card style={{ display: "flex", gap: "5px" }}>
            <Text size="sm" c={"blue"}>
              {experience.start_date} - {experience.end_date}
            </Text>
            <Text size="lg" fw={500}>
              {experience.title}
            </Text>
            <Text c="dimmed" size="sm">
              {experience.company}
            </Text>
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
          </Card>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

export default Experience;
