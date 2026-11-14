import {
  createListCollection,
  HStack,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";
import { type ReactNode, useMemo } from "react";

export interface FilterOption {
  value: string;
  /** What the row shows. */
  label: ReactNode;
  /** The same as plain text, for the browser's own `<select>` and for
   *  typing to jump to a row. */
  text: string;
  /** A figure at the end of the row. */
  count?: string;
}

function OptionRow({ option }: { option: FilterOption }) {
  return (
    <HStack gap={3} flex={1} minW={0}>
      <Text as="span" flex={1} truncate>
        {option.label}
      </Text>
      {option.count && (
        <Text as="span" color="fg.muted" fontVariantNumeric="tabular-nums">
          {option.count}
        </Text>
      )}
    </HStack>
  );
}

/** A single-choice dropdown over rows that carry a label and a count. */
export function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  /** Names the control for assistive technology. Not shown. */
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToString: (item) => item.text,
        itemToValue: (item) => item.value,
      }),
    [options],
  );
  const selected = options.find((option) => option.value === value);

  return (
    <Select.Root
      // The list is a portal, so it is built on first open and torn down on
      // close: built up front, the browser would hydrate a subtree the
      // prerendered HTML does not have.
      lazyMount
      unmountOnExit
      collection={collection}
      size="sm"
      width="60"
      value={[value]}
      onValueChange={(details) => {
        const next = details.value[0];
        if (next !== undefined && next !== value) onChange(next);
      }}
    >
      <Select.HiddenSelect />
      <Select.Label srOnly>{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText>
            {selected && <OptionRow option={selected} />}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {options.map((option) => (
              <Select.Item item={option} key={option.value}>
                <OptionRow option={option} />
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
