

import { Button, Result } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const AppNotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('Sorry, the page you visited does not exist.')}
      extra={
        <Button onClick={() => navigate('/', { replace: true })} type="primary">
          Back Home
        </Button>
      }
    />
  );
};
