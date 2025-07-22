import copy from 'copy-to-clipboard';
import { CopyOutlined as Dcopy } from '@ant-design/icons';
import { ActionIcon } from '@ant-design/pro-editor';
import { messageInstance } from '../../globalInstances';

export function CopyTextButton(props: { text: string }) {
  return (
    <ActionIcon
      title={'Copy'}
      icon={<Dcopy />}
      onClick={(e) => {
        e.stopPropagation();
        if (props.text) {
          messageInstance.success({ content: 'Copy Successes' });
          return copy(props.text);
        }
        messageInstance.error({ content: 'Copy Failed' });
        return;
      }}
    />
  );
}
