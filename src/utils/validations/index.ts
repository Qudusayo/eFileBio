import * as Yup from "yup";

import formStep1Validation from "./form-step-1";
import formStep2Validation from "./form-step-2";
import formStep3Validation from "./form-step-3";
import formStep4Validation from "./form-step-4";

const formValidation = Yup.object().shape({
  fi: formStep1Validation,
  rc: formStep2Validation,
});

export { formStep3Validation, formStep4Validation, formValidation };
