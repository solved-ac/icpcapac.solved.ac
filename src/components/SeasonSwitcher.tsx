import {
  createListCollection,
  HStack,
  IconButton,
  Portal,
  Select,
} from "@chakra-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { Season } from "../data/season";
import { SEASONS } from "../data/seasons";

/**
 * A step to the season before or after. A link, so it can be opened in a new
 * tab; at either end of the list there is nowhere to go and it is a disabled
 * button instead.
 */
function StepButton({
  to,
  label,
  children,
}: {
  to: Season | undefined;
  label: string;
  children: ReactNode;
}) {
  if (!to) {
    return (
      <IconButton variant="ghost" size="sm" aria-label={label} disabled>
        {children}
      </IconButton>
    );
  }
  return (
    <IconButton asChild variant="ghost" size="sm" aria-label={label}>
      <Link to="/$season" params={{ season: to.id }}>
        {children}
      </Link>
    </IconButton>
  );
}

/**
 * Moves between seasons: one back, pick from the list, one forward.
 *
 * `current` is missing on a page outside any season (a not-found page):
 * nothing is selected then, and there is nowhere to step from.
 */
export function SeasonSwitcher({ current }: { current: Season | undefined }) {
  const navigate = useNavigate();
  const index = current ? SEASONS.indexOf(current) : -1;
  const previous = index > 0 ? SEASONS[index - 1] : undefined;
  const next = index >= 0 ? SEASONS[index + 1] : undefined;

  // Built here, not at module scope, to stay next to the list it mirrors.
  const collection = createListCollection({
    items: SEASONS,
    itemToString: (season) => season.label,
    itemToValue: (season) => season.id,
  });

  return (
    <HStack as="nav" gap={0} aria-label="Seasons" flexShrink={0}>
      <StepButton to={previous} label="Previous season">
        <IconChevronLeft />
      </StepButton>
      <Select.Root
        // The list is a portal, so it is built on first open and torn down
        // on close: built up front, the browser would hydrate a subtree the
        // prerendered HTML does not have.
        lazyMount
        unmountOnExit
        collection={collection}
        size="sm"
        // `subtle` is the variant with no border; with its fill taken off
        // below it reads as a ghost button, which Select has no variant for.
        variant="subtle"
        width="32"
        value={current ? [current.id] : []}
        onValueChange={(details) => {
          const picked = details.value[0];
          if (picked !== undefined && picked !== current?.id) {
            navigate({ to: "/$season", params: { season: picked } });
          }
        }}
      >
        <Select.HiddenSelect />
        <Select.Label srOnly>Season</Select.Label>
        <Select.Control>
          <Select.Trigger
            fontVariantNumeric="tabular-nums"
            bg="transparent"
            _hover={{ bg: "bg.muted" }}
          >
            <Select.ValueText placeholder="Season" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {/* Newest first, as a list of years is usually read. */}
              {[...SEASONS].reverse().map((season) => (
                <Select.Item
                  item={season}
                  key={season.id}
                  fontVariantNumeric="tabular-nums"
                >
                  {season.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <StepButton to={next} label="Next season">
        <IconChevronRight />
      </StepButton>
    </HStack>
  );
}
