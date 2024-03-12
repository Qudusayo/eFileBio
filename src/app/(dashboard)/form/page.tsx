import React from "react";

const Form = () => {
  return (
    <div>
      <ul className="before:table after:table after:clear-both after:overflow-hidden bg-[#E5E5E5] w-fit  rounded-2xl">
        <li className="float-left relative before:absolute after:absolute before:bottom-0 after:bottom-0 before:w-3 after:w-3 before:h-3 after:h-3 before:bg-transparent after:bg-[#E5E5E5] before:-left-3 after:-right-3">
          <span className="float-left py-3 px-9 bg-[#E5E5E5] rounded-t-2xl before:w-5 after:w-5 before:h-5 after:h-5 before:rounded-full after:rounded-full before:absolute after:absolute before:bottom-0 after:bottom-0 before:bg-transparent after:bg-[#E5E5E5] after:z-20 before:z-20 before:-left-5 after:-right-5">
            Home
          </span>
        </li>
        <li className="float-left relative before:absolute after:absolute before:bottom-0 after:bottom-0 before:w-3 after:w-3 before:h-3 after:h-3 before:bg-[#E5E5E5] after:bg-[#E5E5E5] before:-left-3 after:-right-3">
          <span className="float-left py-3 px-9 bg-[#E5E5E5] rounded-t-2xl before:w-5 after:w-5 before:h-5 after:h-5 before:rounded-full after:rounded-full before:absolute after:absolute before:bottom-0 after:bottom-0 before:bg-[#E5E5E5] after:bg-[#E5E5E5] after:z-20 before:z-20 before:-left-5 after:-right-5">
            Reporting Company
          </span>
        </li>
        <li className="float-left relative before:absolute after:absolute before:bottom-0 after:bottom-0 before:w-3 after:w-3 before:h-3 after:h-3 before:bg-[#fff] z-30 after:bg-[#fff] before:-left-3 after:-right-3">
          <span className="float-left py-3 px-9 bg-[#fff]  rounded-t-2xl before:w-5 after:w-5 before:h-5 after:h-5 before:rounded-full after:rounded-full before:absolute after:absolute before:bottom-0 after:bottom-0 before:bg-[#E5E5E5] after:bg-[#E5E5E5] before:z-10 after:z-10 before:-left-5 after:-right-5">
            Company Applicant(s)
          </span>
        </li>
        <li className="float-left relative before:absolute after:absolute before:bottom-0 after:bottom-0 before:w-3 after:w-3 before:h-3 after:h-3 before:bg-[#E5E5E5] after:bg-transparent before:-left-3 after:-right-3">
          <span className="float-left py-3 px-9 bg-[#E5E5E5] rounded-t-2xl before:w-5 after:w-5 before:h-5 after:h-5 before:rounded-full after:rounded-full before:absolute after:absolute before:bottom-0 after:bottom-0 before:bg-[#E5E5E5] after:bg-transparent after:z-20 before:z-20 before:-left-5 after:-right-5">
            Beneficial Owner
          </span>
        </li>
      </ul>
      <div className="bg-white">Hello World</div>
    </div>
  );
};

export default Form;
