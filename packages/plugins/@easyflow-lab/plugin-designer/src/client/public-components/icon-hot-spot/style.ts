import { createStyles } from 'antd-style';

interface IconHotSpotStyleProps {
  iconSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  activeBgColor?: string;
}

export const useIconHotSpotStyles = createStyles(
  ({ css, token }, { iconSize = 16, activeColor, inactiveColor, activeBgColor }: IconHotSpotStyleProps = {}) => ({
    iconHotSpotContainer: css`
      padding: 4px;
      border-radius: ${token.borderRadiusSM}px;
      font-size: ${iconSize}px;
      color: ${inactiveColor || token.colorTextSecondary};
      width: ${iconSize + 4 * 2}px;
      height: ${iconSize + 4 * 2}px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      border: none;
      background-color: transparent;
      cursor: pointer;
      transition: all ${token.motionDurationMid} ${token.motionEaseInOut};
      &:disabled {
        cursor: not-allowed;
        color: ${token.colorTextDisabled};
      }
      &:hover:not(:disabled) {
        color: ${activeColor || token.colorPrimaryText};
        background-color: ${activeBgColor || token.colorBgTextHover};
      }
    `,
  }),
);
