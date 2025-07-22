import { useContent, useContentScope } from '../../ContentProvider';
import { useApp } from '@easyflow/client';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

export const TryProviders = () => {
  const contentState = useContentScope('editor', 'withTempState');
  const [text, setText] = useState(contentState.button1.text);

  useEffect(() => {
    setText(contentState.button1.text);
  }, [contentState.button1.text]);

  function handleClick() {
  }

  return (
    <div>
      <Button onClick={handleClick}>Trigger AppState Logs</Button>
      {JSON.stringify(text)}
    </div>
  );
};
