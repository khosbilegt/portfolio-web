"use client";
import { Button, Stack } from "@mantine/core";
import { HeaderLink } from "@/app/(user)/layout";
import { useRouter } from "next/navigation";

function Sidebar({ links }: { links?: HeaderLink[] }) {
  const router = useRouter();
  return (
    <Stack>
      {links?.map((link, index) => (
        <Button
          key={index}
          variant="transparent"
          onClick={() => router.replace(link.href)}
        >
          {link.label}
        </Button>
      ))}
    </Stack>
  );
}

export default Sidebar;
