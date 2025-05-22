

import { css } from '@emotion/css';

export const antTableCell = css`
  .ant-table-cell {
    > .ant-space-horizontal {
      .ant-space-item-split:has(+ .ant-space-item:empty) {
        display: none;
      }
    }
  }
`;
