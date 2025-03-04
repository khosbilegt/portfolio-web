import { Button, Card, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import classes from "./ExperienceCard.module.css";

function ExperienceCard({
  title,
  subtitle,
  projectKey,
}: {
  title: string;
  subtitle: string;
  projectKey: string;
}) {
  const navigate = useNavigate();

  return (
    <Card className={classes["experience-card"]} w={200}>
      <Stack gap={10} justify="space-between" h={"100%"}>
        <Stack>
          <Text size="md">{title}</Text>
          <Text size="sn" c={"dimmed"}>
            {subtitle}
          </Text>
        </Stack>
        <Button onClick={() => navigate(`/blog/${projectKey}`)}>
          Read more
        </Button>
      </Stack>
    </Card>
  );
}

export default ExperienceCard;
