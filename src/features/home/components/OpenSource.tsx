import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { Container, Grid } from "@mantine/core";
import OpenSourceCard from "./OpenSourceCard";

interface OpenSourceCommit {
  url: string;
  description: string;
}

interface OpenSourceProject {
  url: string;
  name: string;
  type: string;
  image: string;
  description: string;
  commits: OpenSourceCommit[];
}

function OpenSource() {
  const openSourceBlockId = 11;

  const { data } = useQuery({
    queryKey: ["open_source"],
    queryFn: async () => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/block/${openSourceBlockId}`
      );
      return response.json();
    },
  });

  return (
    <Container
      bg="var(--mantine-color-body)"
      py={{
        base: "calc(var(--mantine-spacing-lg) * 1)",
        xs: "calc(var(--mantine-spacing-lg) * 2)",
        lg: "calc(var(--mantine-spacing-lg) * 3)",
      }}
      fluid
    >
      <Container size="lg" p={0}>
        <Grid gutter="xl" align="center">
          {data?.definition?.projects?.map(
            (project: OpenSourceProject, index: number) => (
              <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                <OpenSourceCard
                  key={index}
                  backgroundImageUrl={project.image}
                  backgroundImageAlt="image"
                  backgroundImageSizes="300px"
                  title={project.name}
                  type={project.type}
                  description={project.description}
                  details={project.commits}
                />
              </Grid.Col>
            )
          )}
        </Grid>
      </Container>
    </Container>
  );
}

export default OpenSource;
