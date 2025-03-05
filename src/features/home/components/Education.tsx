import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { useEffect, useState } from "react";
import { Anchor, Card, Text, Timeline } from "@mantine/core";
import { motion } from "motion/react";
import { Helmet } from "react-helmet";

interface Education {
  title: string;
  website: string;
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
    <Timeline
      active={educations?.length - 1}
      w={{ xs: "80%", md: "50%", lg: "40%" }}
    >
      <Helmet>
        {educations.map((education: Education, index: number) => (
          <link key={index} rel="preload" href={education.website} />
        ))}
      </Helmet>
      {educations.map((education: Education, index: number) => (
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
                scale: 1.05,
                boxShadow: "var(--mantine-shadow-xl)",
              }}
              transition={{ type: "spring" }}
              style={{ borderRadius: "var(--mantine-radius-lg)" }}
            >
              <Card style={{ display: "flex", gap: "5px" }}>
                <Text size="sm" c={"blue"}>
                  {education.start_date} - {education.end_date}
                </Text>
                <Text size="lg" fw={500}>
                  {education.title}
                </Text>
                <Anchor c="dimmed" size="sm" href={education.website}>
                  {education.university}
                </Anchor>
                <Text size="md">{education.description}</Text>
              </Card>
            </motion.div>
          </motion.div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

export default Education;
