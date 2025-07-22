import { createStyles } from 'antd-style';

export const MOBILE_MIN_WIDTH = 320;
export const MOBILE_MAX_WIDTH = 780;

export const pxToRem = (px: number) => {
  return `${px / 100}rem`;
};

interface ResponsiveStyleProps {
  mobileStyle?: string;
}

export const useResponsiveStyles = createStyles(({ css }, props: ResponsiveStyleProps = {}) => {
  const { mobileStyle = '' } = props;

  return {
    applyMobileStyle: css`
      @media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {
        ${mobileStyle}
      }
    `,
  };
});
