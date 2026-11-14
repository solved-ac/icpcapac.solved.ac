import { CloseButton, Input, InputGroup } from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";

/** A text field for filtering the table below it as the reader types. */
export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  /** Says what can be searched; also names the field for assistive
   *  technology, since it has no visible label. */
  placeholder: string;
}) {
  return (
    <InputGroup
      flex={1}
      minW="48"
      maxW="sm"
      startElement={<IconSearch size={16} />}
      endElement={
        value ? (
          <CloseButton
            size="xs"
            me={-2}
            aria-label="Clear search"
            onClick={() => onChange("")}
          />
        ) : undefined
      }
    >
      <Input
        size="sm"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        // The field has its own clear button; hide the browser's.
        css={{ "&::-webkit-search-cancel-button": { display: "none" } }}
      />
    </InputGroup>
  );
}
