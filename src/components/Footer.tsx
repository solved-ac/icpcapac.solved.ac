import {
  Bleed,
  Box,
  Container,
  HStack,
  IconButton,
  Link,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  IconBrandGithub,
  IconBrandX,
  IconExternalLink,
} from "@tabler/icons-react";

const REPOSITORY = "https://github.com/solved-ac/icpcapac.solved.ac";

const external = { target: "_blank", rel: "noreferrer" } as const;

/** The footer on every page, in solved.ac's quiet styling. */
export function Footer() {
  return (
    <Box as="footer" color="fg.subtle" fontSize="xs" mt={16}>
      <Separator />
      <Container maxW="6xl" py={8}>
        <Stack gap={4}>
          <HStack justify="space-between" wrap="wrap" gap={2}>
            <Text fontSize="sm">
              <Text as="b" color="fg.muted">
                solved.ac
              </Text>{" "}
              by{" "}
              <Link href="https://shiftpsh.com" {...external}>
                shiftpsh
              </Link>
            </Text>
            <Bleed inline={2}>
              <HStack gap={0}>
                <IconButton asChild variant="ghost" size="sm" aria-label="X">
                  <a href="https://twitter.com/solved_ac" {...external}>
                    <IconBrandX />
                  </a>
                </IconButton>
                <IconButton
                  asChild
                  variant="ghost"
                  size="sm"
                  aria-label="GitHub"
                >
                  <a href={REPOSITORY} {...external}>
                    <IconBrandGithub />
                  </a>
                </IconButton>
              </HStack>
            </Bleed>
          </HStack>
          <Link
            href={REPOSITORY}
            {...external}
            color="fg.muted"
            fontWeight="semibold"
            _hover={{ textDecoration: "underline" }}
            w="fit-content"
          >
            Contribute to this page
            <IconExternalLink size="1em" />
          </Link>
          <Separator />
          {/* Written at build time; a build from an earlier year is the only
              way this and the browser's own answer could disagree. */}
          <Text suppressHydrationWarning>
            © 2019 – {new Date().getFullYear()}.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
