"use client";

import { isEqual } from "es-toolkit";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import twemoji from "twemoji";

type ParseCallback = (
  icon: string,
  options: object,
  variant: string
) => string | false;

interface TwemojiOptions {
  /**
   * Default: MaxCDN
   */
  base?: string;
  /**
   * Default: .png
   */
  ext?: string;
  /**
   * Default: emoji
   */
  className?: string;
  /**
   * Default: 72x72
   */
  size?: string | number;
  /**
   * To render with SVG use `folder: svg, ext: .svg`
   */
  folder?: string;
  /**
   * The function to invoke in order to generate image src(s).
   */
  callback?: ParseCallback;
  /**
   * The function to invoke in order to generate additional, custom attributes for the image tag.
   * Default () => ({})
   * @param icon the lower case HEX code point i.e. "1f4a9"
   * @param variant variant the optional \uFE0F ("as image") variant, in case this info is anyhow meaningful. By default this is ignored.
   *
   */
  attributes?(icon: string, variant: string): object;
}

interface Props {
  options?: TwemojiOptions;
  tag?: string;
}

const Twemoji = (props: PropsWithChildren<Props>) => {
  const { options } = props;
  const mergedOptions = useMemo(
    () => ({
      base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
      ...(options || {}),
    }),
    [options]
  );
  const rootRef = useRef<HTMLElement>(null);
  const prevPropsRef = useRef<Props | null>(null);

  const parse = useCallback(() => {
    const node = rootRef.current;
    if (node) {
      twemoji.parse(node, mergedOptions);
    }
  }, [mergedOptions]);

  useEffect(() => {
    if (!isEqual(props, prevPropsRef.current)) {
      parse();
      prevPropsRef.current = props;
    }
  }, [parse, props]);

  return React.createElement(
    props.tag || "span",
    { ref: rootRef },
    props.children
  );
};

export default Twemoji;
