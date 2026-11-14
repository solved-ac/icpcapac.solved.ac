import {
  createListCollection,
  HStack,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";
import { type ReactNode, useMemo } from "react";

export interface Choice {
  value: string;
  /** What the row shows. */
  label: ReactNode;
  /** The same as plain text, for the browser's own `<select>` and for
   *  typing to jump to a row. */
  text: string;
  /** A figure at the end of the row. */
  count?: string;
}

function ChoiceRow({ choice }: { choice: Choice }) {
  return (
    <HStack gap={3} flex={1} minW={0}>
      <Text as="span" flex={1} truncate>
        {choice.label}
      </Text>
      {choice.count && (
        <Text as="span" color="fg.muted" fontVariantNumeric="tabular-nums">
          {choice.count}
        </Text>
      )}
    </HStack>
  );
}

/**
 * A single-choice dropdown: Chakra's `Select` chain as one component, for
 * every dropdown on the site.
 */
export function ChoiceSelect({
  label,
  choices,
  value,
  onChange,
  placeholder,
  width = "60",
  ghost = false,
}: {
  /** Names the control for assistive technology. Not shown. */
  label: string;
  choices: Choice[];
  /** `undefined` when nothing is chosen; the placeholder shows then. */
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: Select.RootProps["width"];
  /** No border and no fill until hovered, to sit among ghost buttons. */
  ghost?: boolean;
}) {
  const collection = useMemo(
    () =>
      createListCollection({
        items: choices,
        itemToString: (item) => item.text,
        itemToValue: (item) => item.value,
      }),
    [choices],
  );
  const selected = choices.find((choice) => choice.value === value);

  return (
    <Select.Root
      // The list is a portal, so it is built on first open and torn down on
      // close: built up front, the browser would hydrate a subtree the
      // prerendered HTML does not have.
      lazyMount
      unmountOnExit
      collection={collection}
      size="sm"
      // Select has no ghost variant. `subtle` is the one with no border, and
      // the trigger below takes its fill off.
      variant={ghost ? "subtle" : "outline"}
      width={width}
      value={value === undefined ? [] : [value]}
      onValueChange={(details) => {
        const next = details.value[0];
        if (next !== undefined && next !== value) onChange(next);
      }}
    >
      <Select.HiddenSelect />
      <Select.Label srOnly>{label}</Select.Label>
      <Select.Control>
        <Select.Trigger
          fontVariantNumeric="tabular-nums"
          {...(ghost && { bg: "transparent", _hover: { bg: "bg.muted" } })}
        >
          <Select.ValueText placeholder={placeholder}>
            {selected && <ChoiceRow choice={selected} />}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {choices.map((choice) => (
              <Select.Item item={choice} key={choice.value}>
                <ChoiceRow choice={choice} />
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
