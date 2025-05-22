

import { useCollectionRecordData } from '../../../../../data-source/collection-record/CollectionRecordProvider';
import { useSatisfiedActionValues } from '../../../../../schema-settings/LinkageRules/useActionValues';
import { useFormBlockContext } from '../../../../../block-provider';
import { useSubFormValue } from '../../../../../schema-component/antd/association-field/hooks';
export function useDataFormItemProps() {
  const record = useCollectionRecordData();
  const { form } = useFormBlockContext();
  const subForm = useSubFormValue();
  const { valueMap: style } = useSatisfiedActionValues({
    category: 'style',
    formValues: subForm?.formValue || form?.values || record,
    form,
  });
  return { wrapperStyle: style };
}
