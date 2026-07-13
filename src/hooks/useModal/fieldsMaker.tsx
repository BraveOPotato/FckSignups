import { ReactNode } from "react";
import {
  SelectField,
  TextAreaField,
  type ModalConfig,
  type TextField,
} from "./types";

function makeTextField(field: TextField): ReactNode {
  return (
    <>
      <label className="modal-label">{field.name}</label>
      <input
        className="modal-input"
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        value={field.value}
      ></input>
    </>
  );
}

function makeURLField(field: TextField): ReactNode {
  return (
    <>
      <label className="modal-label">{field.name}</label>
      <input
        className="modal-input"
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        type="url"
        value={field.value}
      ></input>
    </>
  );
}

function makeSelectField(field: SelectField): ReactNode {
  // TODO //
  // Implement fetcher for when the field.options is a function
  if (typeof field.options === "function")
    throw new Error(
      "Select field with options of type async callback isn't supported yet.",
    );

  return (
    <>
      <label className="modal-label" htmlFor={field.name}>
        {field.label}
      </label>
      <select
        className="modal-input modal-select"
        id={field.name}
        name={field.name}
        required={field.required}
      >
        {Object.entries(field.options).map(([name, label]) => (
          <option value={name}>{label}</option>
        ))}
      </select>
    </>
  );
}

function makeTextAreaField(field: TextAreaField) {
  return (
    <>
      <label className="modal-label">{field.name}</label>
      <textarea
        className="modal-input modal-textarea"
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
      ></textarea>
    </>
  );
}

export function fieldsMaker(modalConfig: ModalConfig) {
  let inputFields = modalConfig.pages.map((page) =>
    page.fields.map((field) => {
      switch (field.type) {
        case "text":
          return makeTextField(field);
        case "select":
          return makeSelectField(field);
        case "textarea":
          return makeTextAreaField(field);
        case "url":
          return makeURLField(field);
      }
    }),
  );

  return inputFields
    .flat()
    .map((inputField) => <div className="modal-field">{inputField}</div>);
}
