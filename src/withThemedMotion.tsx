import { MotionProps } from 'framer-motion';
import React from 'react';
import { useTheme } from './hooks';
import { get } from 'styled-system';

const fromEntries = (l: [string, any][]) => l.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

export const applyTheme = (data: any, theme: any) => {
  if (data === undefined || typeof data === 'string' || Array.isArray(data)) {
    return data;
  } else if (typeof data === 'object') {
    return fromEntries(
      Object.entries(data).map(([k, v]: [string, any]) => [
        k,
        typeof v === 'string' ? v.replace(/\{([^}]+)\}/, (_, p1) => get(theme, p1)) : v
      ])
    );
  }
};

export const applyThemeToVariants = (variants: any, theme: any) => {
  if (variants === undefined || typeof variants === 'string' || Array.isArray(variants)) {
    return variants;
  }
  return fromEntries(
    Object.entries(variants).map(([k, v]: [string, any]) => [k, applyTheme(v, theme)])
  );
};

export function withThemedMotion<T extends React.Component, P extends MotionProps = MotionProps>(
  WrappedComponent: React.ComponentType<P>
) {
  type Props = P & {
    skipTheme?: boolean;
  };
  return React.forwardRef<T, Props>(
    (
      { animate, whileHover, variants, skipTheme = false, whileTap, ...props }: Props,
      ref: React.Ref<T>
    ) => {
      const theme = useTheme();
      return (
        <WrappedComponent
          ref={ref}
          animate={skipTheme ? animate : applyTheme(animate, theme)}
          whileHover={skipTheme ? whileHover : applyTheme(whileHover, theme)}
          whileTap={skipTheme ? whileTap : applyTheme(whileTap, theme)}
          variants={skipTheme ? variants : applyThemeToVariants(variants, theme)}
          {...(props as any)}
        />
      );
    }
  );
}
