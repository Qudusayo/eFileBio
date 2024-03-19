import { Country, State } from "country-state-city";
import { foreignStates } from "./foreignStates";
import { domesticStates } from "./domesticStates";
import { tribalJurisdiction } from "./tribalJurisdiction";

const priorityCountries = [
  { value: "US", label: "United States of America" },
  { value: "AS", label: "American Samoa" },
  { value: "GU", label: "Guam" },
  { value: "MH", label: "Marshall Islands" },
  { value: "FM", label: "Micronesia, Federated States" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "PW", label: "Palau" },
  { value: "PR", label: "Puerto Rico" },
  { value: "VI", label: "U.S. Virgin Islands" },
];

const countries = Country.getAllCountries().map((country) => ({
  value: country.isoCode,
  label: country.name,
}));

const foreignCountries = countries.filter(
  (country) =>
    !priorityCountries.some((pCountry) => pCountry.value === country.value),
);

const sortedCountries = [...priorityCountries, ...foreignCountries];

const usStates = State.getStatesOfCountry("US").map((state) => ({
  value: state.isoCode,
  label: state.name,
}));

const identifyingDocumentTypes = [
  { value: "37", label: "State issued driver's license" },
  { value: "38", label: "State/local/tribe-issued ID" },
  { value: "39", label: "U.S. passport" },
  { value: "40", label: "Foreign passport" },
];

const taxIdentificationTypes = [
  { label: "EIN", value: "ein" },
  { label: "SSN/ITIN", value: "ssn" },
  { label: "Foreign", value: "foreign" },
];

export {
  usStates,
  foreignStates,
  domesticStates,
  sortedCountries,
  foreignCountries,
  priorityCountries,
  tribalJurisdiction,
  taxIdentificationTypes,
  identifyingDocumentTypes,
};
