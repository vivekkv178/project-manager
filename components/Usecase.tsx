"use client";
import { SectionTitle } from "@vivekkv178/library";

const Usecase = () => {
  return (
    <section id="usecase" className="relative mb-2 xl:mb-48 p-8">
      <div className="container mx-auto xl:flex xl:space-x-8 gap-x-20">
        {/* text */}
        <div className="tw-max-w-[500px] mx-auto xl:mx-0 text-center xl:text-left mb-12 xl:h-[400px] flex flex-col justify-center items-center xl:items-start">
          <SectionTitle title="Usecase" />
          <p className="subtitle mb-8 text-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <p className="subtitle">
                  This application allows users to efficiently manage all their
                  projects and oversee deployments from a centralized platform.
                  Users can list all their projects, view workflows for each
                  project, and trigger them using a GitHub REST API, which in
                  turn initiates CDK deployments in AWS. This seamless
                  integration enhances project management by providing a
                  comprehensive overview and streamlined deployment process.
                </p>
              </div>
            </div>
          </p>
        </div>
        <div className="mx-auto">
          <img
            src="https://raw.githubusercontent.com/vivekkv178/cdn/main/project-manager/Sequence_Diagram.png"
            className="tw-rounded-sm tw-h-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Usecase;
