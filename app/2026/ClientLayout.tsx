"use client";

import Region from "@/components/Region";
import { Container, Space, Tab, Tabs, Typo } from "@solved-ac/ui-react";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const regions = [
  ["Bangkok", "THA"], // 11/01
  ["Taichung", "TWN"], // 11/15
  ["Seoul", "KOR"], // 11/21
  ["Jakarta", "IDN"], // 11/23
  ["Yokohama", "JPN"], // 12/06
  ["Manila", "PHL"], // 12/09
  ["HCMC", "VNM"], // 12/11
];

const ClientLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <>
      <Space h={64} />
      <Container>
        <Typo description>
          <Link
            href="/2025"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <IconChevronLeft />
            <span>2024-2025</span>
          </Link>
        </Typo>
        <Typo h1>ICPC APAC 2025-2026</Typo>
        <Typo description>
          by <a href="https://solved.ac">solved.ac</a> / X{" "}
          <a href="https://x.com/shiftpsh">@shiftpsh</a> / CF{" "}
          <a href="https://codeforces.com/profile/shiftpsh">@shiftpsh</a>
        </Typo>
        <Space h={32} />
        <Tabs>
          <Tab
            href="/2026"
            current={pathname === "/2026"}
            style={{
              padding: "4px 8px",
            }}
          >
            Home
          </Tab>
          {regions.map(([region, code]) => (
            <Tab
              key={region}
              as={Link}
              href={`/2026/${region.toLowerCase()}`}
              current={pathname.includes(region.toLowerCase())}
              style={{
                padding: "4px 8px",
              }}
            >
              <Region region={code} flagOnly />{" "}
              {region === "Seoul" ? (
                <>
                  <Typo
                    description
                    style={{
                      textDecoration: "line-through",
                    }}
                  >
                    Busan
                  </Typo>{" "}
                  Seoul
                </>
              ) : (
                region
              )}
            </Tab>
          ))}
        </Tabs>
      </Container>
      {children}
    </>
  );
};

export default ClientLayout;
