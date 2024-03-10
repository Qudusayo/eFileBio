import { Divider } from "@nextui-org/react";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black text-white py-20 relative">
      <div className="max-w-7xl mx-auto w-[98%] space-y-8">
        <ul className="flex items-center gap-8">
          {["Our traning courses", "Financing", "Our Services", "Blog"].map(
            (item, index) => {
              return (
                <li key={index}>
                  <Link href="/">{item}</Link>
                </li>
              );
            }
          )}
        </ul>
        <Divider className="my-4 bg-[#ffffff45]" />
        <div className="flex items-center space-x-20 text-small">
          <QuickInfo title="Location" description="New York, US" />
          <QuickInfo title="Phone" description="+92 000090999" />
          <QuickInfo title="Email" description="Example@gmail.com" />
        </div>
      </div>
      <div className="absolute inset-0 h-fit m-auto -top-6 max-w-7xl w-[98%]">
        <div className="bg-[#FBBF24] flex items-center gap-3 w-fit p-2 px-4 rounded-full ml-auto">
          <a href="#" target="_blank" rel="">
            <Facebook fill="white" stroke="transparent" />
          </a>
          <a href="#" target="_blank" rel="">
            <Twitter fill="white" stroke="transparent" />
          </a>
          <a href="#" target="_blank" rel="">
            <Linkedin fill="white" stroke="transparent" />
          </a>
        </div>
      </div>
    </div>
  );
};

const QuickInfo = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="space-y-1">
    <h4 className="text-base font-medium">{title}</h4>
    <p className="text-sm text-default-400">{description}</p>
  </div>
);

export default Footer;
