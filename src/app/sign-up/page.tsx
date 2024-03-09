import { RegisterInput } from "../components/auth-inputs";
import Navbar from "../components/navbar";

const SignUp = () => {
  return (
    <div className="min-h-screen relative py-4">
      <Navbar />
      <div className="max-w-md w-[95%] m-auto inset-0 absolute h-fit">
        <div className="mb-14 text-center">
          <h1 className="text-2xl font-semibold">Sign up</h1>
          <p className="text-balance">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
          </p>
        </div>
        <RegisterInput />
      </div>
    </div>
  );
};

export default SignUp;
