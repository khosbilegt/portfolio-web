import { Button, Stack } from "@mantine/core";
import { HeaderLink } from "../app/UserLayout";
import { useNavigate } from "react-router";

function Sidebar({ links }: { links?: HeaderLink[] }) {
  const navigate = useNavigate();
  return (
    <Stack>
      {links?.map((link, index) => (
        <Button
          key={index}
          variant="transparent"
          onClick={() => navigate(link.href)}
        >
          {link.label}
        </Button>
      ))}
    </Stack>
  );
}

export default Sidebar;
