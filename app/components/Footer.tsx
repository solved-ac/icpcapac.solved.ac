"use client";

import styled from "@emotion/styled";
import { Footer as AcFooter, Container, Space } from "@solved-ac/ui-react";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandX,
} from "@tabler/icons-react";

const FooterSiteTitle = styled.span`
  display: block;
  font-size: 1.2em;
`;

const FooterSiteInfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
`;

const FooterSnsIcon = styled.a`
  font-size: 1.5em;
`;

const Footer = () => {
  return (
    <>
      <AcFooter>
        <Container>
          <Space h={16} />
          <FooterSiteInfoRow>
            <FooterSiteTitle>
              <b>solved.ac</b>
            </FooterSiteTitle>{" "}
            <div style={{ flex: "1 0 0" }} />
            <FooterSnsIcon
              href="https://twitter.com/solved_ac"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandX />
            </FooterSnsIcon>
            <FooterSnsIcon
              href="https://facebook.com/solvedac"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandFacebook />
            </FooterSnsIcon>
            <FooterSnsIcon
              href="https://github.com/solved-ac/icpcapac.solved.ac"
              target="_blank"
              rel="noreferrer"
            >
              <IconBrandGithub />
            </FooterSnsIcon>
          </FooterSiteInfoRow>
          © 2019 - {new Date().getFullYear()}. <Space h={16} />
          <Space h={16} />
          <p>
            <a href="https://github.com/solved-ac/icpcapac.solved.ac">
              Contribute to this page &rarr;
            </a>
          </p>
          <Space h={64} />
        </Container>
      </AcFooter>
    </>
  );
};

export default Footer;
