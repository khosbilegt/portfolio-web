import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { useEffect, useState } from "react";
import { Card, Text, Timeline } from "@mantine/core";

interface Education {
  title: string;
  university: string;
  start_date: string;
  end_date: string;
  description: string;
}

function Education() {
  const educationBlockId = 2;
  const [educations, setEducations] = useState<Education[]>([]);

  const { data } = useQuery({
    queryKey: ["educations"],
    queryFn: async () => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/block/${educationBlockId}`
      );
      return response.json();
    },
  });

  useEffect(() => {
    const tempEducations: Education[] = [];
    data?.definition?.educations?.map((education: Education) => {
      tempEducations.push(education);
    });
    setEducations(tempEducations);
  }, [data]);

  return (
    <Timeline active={educations?.length - 1} w={"50%"}>
      {educations.map((education: Education, index: number) => (
        <Timeline.Item key={index}>
          <Card style={{ display: "flex", gap: "5px" }}>
            <Text size="sm" c={"blue"}>
              {education.start_date} - {education.end_date}
            </Text>
            <Text size="lg" fw={500}>
              {education.title}
            </Text>
            <Text c="dimmed" size="sm">
              {education.university}
            </Text>
            <Text size="md">{education.description}</Text>
          </Card>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

export default Education;
