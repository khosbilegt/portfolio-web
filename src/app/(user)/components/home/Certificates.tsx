"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { portfolioManagerURL } from "@/app/variables";
import { Container, Grid } from "@mantine/core";
import CertificateCard from "./CertificateCard";

interface Certificate {
  title: string;
  website: string;
  image: string;
  issuer: string;
  issue_date: string;
  description: string;
}

function Certificates() {
  const certificateBlockId = 3;
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const { data } = useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/block/${certificateBlockId}`
      );
      return response.json();
    },
  });

  useEffect(() => {
    const tempCertificates: Certificate[] = [];
    data?.definition?.certificates?.map((certificate: Certificate) => {
      tempCertificates.push(certificate);
    });
    setCertificates(tempCertificates);
  }, [data]);

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
          {certificates.map((certificate: Certificate, index: number) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <CertificateCard
                key={index}
                backgroundImageUrl={certificate.image}
                backgroundImageAlt="certificate"
                backgroundImageSizes="300px"
                title={certificate.title}
                tag={certificate.issuer}
                url={certificate.website}
                description={certificate.description}
                publishedAt={certificate.issue_date}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default Certificates;
