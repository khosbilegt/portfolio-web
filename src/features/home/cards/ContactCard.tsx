import { Button, Card, NavLink, Popover, Stack, Text } from "@mantine/core";
import { useState } from "react";

const contactType = [
  {
    label: "Job Offers",
    type: "LinkedIn",
    icon: "",
    url: "https://www.linkedin.com/in/khosbilegt-bilegsaikhan-82929424b/",
  },
  {
    label: "Freelance Work",
    type: "Email",
    icon: "",
    url: "khosbilegt.b@gmail.com",
  },
  {
    label: "Advice & Help",
    type: "Email",
    icon: "",
    url: "khosbilegt.b@gmail.com",
  },
];

function ContactCard({ height }: { height: string }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <Card
      radius={"lg"}
      padding={"none"}
      style={{
        display: "flex",
        alignItems: "center",
        background: "#1A5678",
        minHeight: height,
        height: height,
        transition: "200ms",
        boxShadow: isHovered ? "0 0 10px 0 #ffcc33" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Text
        style={{
          paddingLeft: "5%",
          textAlign: "start",
          width: "100%",
          height: "25px",
          color: "#fff",
          background: "linear-gradient(-45deg, #1A5678 50%, #25245D 0)",
        }}
      >
        Contact
      </Text>
      <Stack style={{ color: "#fff", padding: "15px" }}>
        <Text>You can contact me at:</Text>
        {contactType.map((contact) => (
          <Popover key={contact.label}>
            <Popover.Target>
              <Button style={{ background: "#25245D" }}>{contact.label}</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="xs">{contact.type}: </Text>
              <NavLink label={contact.url} href={contact.url} />
            </Popover.Dropdown>
          </Popover>
        ))}
      </Stack>
    </Card>
  );
}

export default ContactCard;
