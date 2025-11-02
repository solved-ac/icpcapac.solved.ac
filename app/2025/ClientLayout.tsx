"use client";

import { Container, Space, Tab, Tabs, Typo } from "@solved-ac/ui-react";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const regions = ["Taichung", "Seoul", "Jakarta", "Hanoi", "Yokohama"];

const ClientLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <>
      <Space h={64} />
      <Container>
        <Typo description>
          <Link
            href="/2026"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>2025-2026</span>
            <IconChevronRight />
          </Link>
        </Typo>
        <Typo h1>ICPC APAC 2024-2025</Typo>
        <Typo description>
          by <a href="https://solved.ac">solved.ac</a> / X{" "}
          <a href="https://x.com/shiftpsh">@shiftpsh</a> / CF{" "}
          <a href="https://codeforces.com/profile/shiftpsh">@shiftpsh</a>
        </Typo>
        <Space h={32} />
        <Tabs>
          <Tab href="/2025" current={pathname === "/2025"}>
            Home
          </Tab>
          {regions.map((region) => (
            <Tab
              key={region}
              as={Link}
              href={`/2025/${region.toLowerCase()}`}
              current={pathname.includes(region.toLowerCase())}
            >
              {region}
            </Tab>
          ))}
        </Tabs>
      </Container>
      {children}
    </>
  );
};

export default ClientLayout;
