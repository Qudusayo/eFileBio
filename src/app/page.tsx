"use client";

import { Fragment } from "react";
import Navbar from "../components/navbar";
import Icons from "../components/icons";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import {
  ArchiveBook,
  Bill,
  ClipboardText,
  DocumentText,
  MenuBoard,
  Stickynote,
} from "iconsax-react";
import Footer from "../components/footer";
import AuthButton from "../components/auth-button";

export default function Home() {
  return (
    <Fragment>
      <div
        className="py-4 pb-14"
        style={{
          background: "url(/hero-bg.png), white",
          boxShadow: "0px -16px 144px 0px rgba(0, 0, 0, 0.02) inset",
        }}
      >
        <Navbar />
        <div className="space-y-10 pt-24 text-center">
          <Image
            src="/logo.png"
            alt="eFileBOI"
            width={120}
            height={100}
            className="mx-auto"
          />

          <h2 className="text-5xl font-bold max-w-2xl mx-auto text-center text-balance">
            Streamline Your Compliance Journey With eFileBOI
          </h2>
          <AuthButton type="large" />

          <div className="grid grid-cols-5 gap-5 max-w-7xl mx-auto w-[98%] !mt-28">
            <HeroCard
              icon={<Icons.Identity />}
              title="Simple BOIR filing"
              className="rounded-l-lg"
            />
            <HeroCard
              icon={<Icons.Calendar />}
              title="Stay Ahead of Deadlines"
            />
            <HeroCard
              icon={<Icons.Passlock />}
              title="Remain Secure and Compliant"
            />
            <HeroCard icon={<Icons.Satisfaction />} title="24/7 Accesiblity" />
            <HeroCard
              icon={<Icons.Support />}
              title="Expert Support"
              className="rounded-r-lg"
            />
          </div>
        </div>
      </div>
      <div className="space-y-8 py-24">
        <div className="flex items-center gap-2 uppercase justify-center">
          <Icons.Star />
          <h2>Features</h2>
        </div>
        <h2 className="text-balance font-bold text-4xl text-center max-w-4xl mx-auto">
          Empower your business with our state-of-the-art Electronic Filing
          Solution
        </h2>
        <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto w-[98%]">
          <FeatureCard
            icon={<ClipboardText size="24" color="#FBBF24" variant="Outline" />}
          />
          <FeatureCard
            icon={<DocumentText size="24" color="#FBBF24" variant="Outline" />}
          />
          <FeatureCard
            icon={<ArchiveBook size="24" color="#FBBF24" variant="Outline" />}
          />
          <FeatureCard
            icon={<Stickynote size="24" color="#FBBF24" variant="Outline" />}
          />
          <FeatureCard
            icon={<MenuBoard size="24" color="#FBBF24" variant="Outline" />}
          />
          <FeatureCard
            icon={<Bill size="24" color="#FBBF24" variant="Outline" />}
          />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

const HeroCard = ({
  icon,
  title,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "bg-white flex items-center justify-around flex-col space-y-3 text-center p-4",
        className
      )}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      {icon}
      <h3 className="text-base">{title}</h3>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <div className="bg-[#FAFAFA] p-4 rounded-2xl space-y-4">
      <div
        className="bg-white p-4 rounded-xl w-12 h-12 flex items-center justify-center"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 4px",
        }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold">{title ?? "Name goes here"}</h3>
        <p className="text-sm">
          {description ??
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat vestibulum luctus. Curabitur vitae odio rhoncus"}
        </p>
      </div>
      <p className="text-sm text-[#FBBF24] border-b border-b-[#FBBF24] flex items-center gap-2 w-fit">
        <span>Read more</span>
        <ArrowRight size={14} />
      </p>
    </div>
  );
};
