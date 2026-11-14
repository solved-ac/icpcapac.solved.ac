import { Box, type BoxProps } from "@chakra-ui/react";

/**
 * A note set apart from the page: a caveat about the data, a source.
 *
 * The bodies are written next to the data as plain JSX, with bare `<a>`
 * elements, so links are styled from here rather than by each author.
 */
export function Notice(props: BoxProps) {
  return (
    <Box
      p={4}
      rounded="lg"
      bg="bg.subtle"
      fontSize="sm"
      // Sources are quoted as full URLs, which have nowhere to break.
      overflowWrap="anywhere"
      css={{
        "& a": {
          color: "primary.fg",
          textDecoration: "underline",
          textUnderlineOffset: "0.15em",
        },
      }}
      {...props}
    />
  );
}
