import { Tabs } from "@chakra-ui/react";
import { createLink } from "@tanstack/react-router";
import type { ComponentProps, Ref } from "react";

type TabsTriggerAnchorProps = Omit<Tabs.TriggerProps, "asChild"> &
  Omit<ComponentProps<"a">, keyof Tabs.TriggerProps>;

/**
 * A tab that is a real `<a href>`.
 *
 * `createLink(Tabs.Trigger)` renders `<button href>`: the tab navigates on
 * click, but a button is not a link to the browser, so ⌘/Ctrl-click, middle
 * click and "open in new tab" do nothing, and the prerender crawler finds no
 * page behind it. Rendering the trigger `asChild` over an anchor keeps the
 * tab's role, state and styling on an element that is a link.
 */
function TabsTriggerAnchor({
  ref,
  children,
  ...props
}: TabsTriggerAnchorProps & { ref?: Ref<HTMLAnchorElement> }) {
  return (
    <Tabs.Trigger asChild {...(props as Tabs.TriggerProps)}>
      {/* biome-ignore lint/a11y/useValidAnchor: href is provided by createLink */}
      <a ref={ref}>{children}</a>
    </Tabs.Trigger>
  );
}

export const TabsTriggerLink = createLink(TabsTriggerAnchor);

/**
 * The `Tabs.Root` for tabs made of `TabsTriggerLink`s. The URL decides which
 * tab is active, so the caller passes `value` and no change handler.
 *
 * `navigate={null}`: whenever its value changes, Zag "navigates" to a selected
 * tab that is an anchor by dispatching a synthetic click on it, which the
 * browser follows as a full page load. The router has already navigated by
 * the time the value follows the URL, so the tabs never need to.
 */
export function TabsLinkRoot(props: Tabs.RootProps) {
  return <Tabs.Root {...props} navigate={null} />;
}
