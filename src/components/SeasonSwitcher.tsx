import { HStack, IconButton } from "@chakra-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { Season } from "../data/season";
import { SEASONS } from "../data/seasons";
import { type Choice, ChoiceSelect } from "./ChoiceSelect";

/** Newest first, as a list of years is usually read. */
const SEASON_CHOICES: Choice[] = [...SEASONS].reverse().map((season) => ({
  value: season.id,
  label: season.label,
  text: season.label,
}));

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

  return (
    <HStack as="nav" gap={0} aria-label="Seasons" flexShrink={0}>
      <StepButton to={previous} label="Previous season">
        <IconChevronLeft />
      </StepButton>
      <ChoiceSelect
        label="Season"
        placeholder="Season"
        choices={SEASON_CHOICES}
        value={current?.id}
        onChange={(season) => navigate({ to: "/$season", params: { season } })}
        width="32"
        ghost
      />
      <StepButton to={next} label="Next season">
        <IconChevronRight />
      </StepButton>
    </HStack>
  );
}
