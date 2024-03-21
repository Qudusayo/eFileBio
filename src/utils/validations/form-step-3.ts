import * as Yup from "yup";

const formStep3Validation = Yup.array().of(
  Yup.object().shape({
    lastName: Yup.string().required("Last name is required"),
    firstName: Yup.string().required("First name is required"),
    dob: Yup.string().required("Date of birth is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required(
      "Address (number, street, and apt. or suite no.) is required",
    ),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("ZIP code is required"),
    identification: Yup.object().shape({
      type: Yup.string().required("Identifying document type is required"),
      id: Yup.string().required(
        "Identifying document issuing ID number is required",
      ),
    }),
  }),
);

export default formStep3Validation;
