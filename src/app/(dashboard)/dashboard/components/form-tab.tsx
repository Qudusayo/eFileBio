import clsx from "clsx";

const tabs = [
  "Home",
  "Reporting Company",
  "Company Applicant(s)",
  "Beneficial Owner",
];

const FormTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: (index: number) => void;
}) => {
  return (
    <ul className="before:table after:table after:clear-both after:overflow-hidden bg-[#E5E5E5] w-fit rounded-2xl">
      {tabs.map((tab, index) => (
        <li
          key={index}
          onClick={() => setActiveTab(index)}
          className={clsx(
            "float-left relative before:absolute after:absolute before:bottom-0 after:bottom-0 before:w-3 after:w-3 before:h-3 after:h-3 before:-left-3 after:-right-3 cursor-pointer",
            activeTab === index
              ? "z-30 before:bg-[#fff] after:bg-[#fff]"
              : "before:bg-[#E5E5E5] after:bg-[#E5E5E5]",
            index === 0 && "before:bg-transparent",
            index === tabs.length - 1 && "after:bg-transparent"
          )}
        >
          <span
            className={clsx(
              "float-left py-3 px-9 rounded-t-2xl before:w-5 after:w-5 before:h-5 after:h-5 before:rounded-full after:rounded-full before:absolute after:absolute before:bottom-0 after:bottom-0 before:bg-[#E5E5E5] after:bg-[#E5E5E5]  before:-left-5 after:-right-5",
              activeTab === index
                ? "bg-[#fff] before:z-10 after:z-10"
                : "before:z-20 after:z-20 bg-[#E5E5E5]",
              index === 0 && "before:bg-transparent",
              index === tabs.length - 1 && "after:bg-transparent"
            )}
          >
            {tab}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default FormTab;
