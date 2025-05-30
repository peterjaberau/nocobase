

import { ArrayField, ArrayFieldOptions } from './array-field';

export interface SetFieldOptions extends Omit<ArrayFieldOptions, 'type'> {
  type: 'set';
}

export class SetField extends ArrayField {
  beforeSave = (model) => {
    const oldValue = model.get(this.options.name);
    if (oldValue) {
      model.set(this.options.name, [...new Set(oldValue)]);
    }
  };

  bind() {
    super.bind();
    this.on('beforeSave', this.beforeSave);
  }

  unbind() {
    super.unbind();
    this.off('beforeSave', this.beforeSave);
  }
}
