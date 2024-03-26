import { caFormInterface } from "@/types";

export const caFormShape: caFormInterface = {
  fincenId: "",
  lastName: "",
  middleName: "",
  firstName: "",
  dob: "",
  addressType: "",
  country: "",
  state: "",
  address: "",
  city: "",
  zip: "",
  identification: {
    type: "",
    id: "",
    jurisdiction: "",
    state: "",
    localTribal: "",
    otherTribe: "",
  },
};
