import { Stack, Timeline, Title, Text } from "@mantine/core";

const experiences = [
  {
    title: "Game Developer",
    company: "Digital Solutions",
    start_date: "2022-06-01",
    end_date: "2022-11-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Research Assistant",
    company: "National University of Mongolia",
    start_date: "2021-09-01",
    end_date: "2023-06-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Full-Stack Developer",
    company: "Unitel LLC",
    start_date: "2023-06-01",
    end_date: "Present",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Full-Stack Developer",
    company: "[Insert Company Name]",
    start_date: "Present",
    end_date: "Future",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

function Experience() {
  return (
    <Stack>
      <Title order={2}>Experience</Title>
      <Timeline active={experiences?.length - 2}>
        {experiences.map((experience) => (
          <Timeline.Item key={experience.company} title={experience.title}>
            <Text c="dimmed" size="sm">
              {experience.company}
            </Text>
            <Text>{experience.description}</Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  );
}

export default Experience;
