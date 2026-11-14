import { Portal, Tooltip } from "@chakra-ui/react";
import type { ReactElement, ReactNode } from "react";

/**
 * Hover tooltip: Chakra's `Tooltip.Root → Portal → Positioner → Content`
 * chain as one wrapper, top-placed, with the same delays everywhere.
 */
export function HoverTooltip({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactElement;
}) {
  return (
    <Tooltip.Root
      openDelay={150}
      closeDelay={50}
      positioning={{ placement: "top" }}
      // Built on first hover and gone on close: the content is a portal the
      // prerendered HTML has nothing for, so built up front it fails
      // hydration. It also spares the page a tooltip body per table row.
      lazyMount
      unmountOnExit
    >
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>{label}</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  );
}
