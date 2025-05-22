

import { css, cx } from '@emotion/css';
import { parseHTML } from '@easyflow/utils/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentAppInfo } from '../appInfo/CurrentAppInfoProvider';
import { usePlugin } from '../application';
import { useToken } from '../style';

export const PoweredBy = () => {
  const { i18n } = useTranslation();
  const { token } = useToken();
  const customBrandPlugin: any = usePlugin('@easyflow/plugin-custom-brand');
  const data = useCurrentAppInfo();
  const urls = {
    'en-US': 'https://www.easyflow.com',
    'zh-CN': 'https://www.easyflow.com/cn/',
  };
  const style = css`
    text-align: center;
    color: ${token.colorTextDescription};
    a {
      color: ${token.colorTextDescription};
      &:hover {
        color: ${token.colorText};
      }
    }
  `;
  const appVersion = `<span class="nb-app-version">v${data?.data?.version}</span>`;

  return (
    <div
      className={cx(style, 'nb-brand')}
      dangerouslySetInnerHTML={{
        __html: parseHTML(
          customBrandPlugin?.options?.options?.brand ||
            `Powered by <a href="${urls[i18n.language] || urls['en-US']}" target="_blank">EasyFlow</a>`,
          { appVersion },
        ),
      }}
    ></div>
  );
};
