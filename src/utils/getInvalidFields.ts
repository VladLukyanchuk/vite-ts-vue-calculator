import { ZodIssue } from "zod";

export interface InvalidFields {
  [key: string]: string;
}

export function getInvalidFields(errors: ZodIssue[]) {
  const errorsObj: InvalidFields = {};
  errors.forEach((error) => {
    errorsObj[error.path[0]] = error.message;
  });

  return errorsObj;
}
