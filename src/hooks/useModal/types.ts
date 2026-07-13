export interface ModalConfig {
  modalId: string;
  modalTitle: string;
  submitURL: string;
  pages: Page[];
}

export interface Page {
  title: string;
  fields: Field[];
}

export type Field = TextField | SelectField | TextAreaField;

interface BaseField {
  name: string;
  label: string;
  required?: boolean;
}

export interface SelectField extends BaseField {
  type: "select";
  options: Record<string, string> | (() => Promise<Record<string, string>>);
}

export interface TextField extends BaseField {
  type: "text" | "url";
  value?: string;
  placeholder?: string;
}

export interface TextAreaField extends BaseField {
  type: "textarea";
  placeholder?: string;
}
