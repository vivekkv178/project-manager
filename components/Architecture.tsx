"use client";
import { SectionTitle } from "@vivekkv178/library";

const Architecture = () => {
  return (
    <section id="arch" className="relative mb-2 xl:mb-48 p-8">
      <div className="container mx-auto xl:flex xl:space-x-8 gap-x-20">
        {/* text */}
        <div className="tw-max-w-[500px] mx-auto xl:mx-0 text-center xl:text-left mb-12 xl:h-[400px] flex flex-col justify-center items-center xl:items-start">
          <SectionTitle title="Architecture" />
          <p className="subtitle mb-8 text-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <p className="subtitle">
                  Our architecture leverages Next.js for the frontend, Vercel
                  Functions for backend, and Firebase Firestore for data
                  storage. GitHub integration allows us to fetch project
                  workflows, while GitHub Actions automate deployments to AWS
                  using AWS-CDK.
                </p>
              </div>
            </div>
          </p>
        </div>
        <div className="mx-auto">
          <img
            src="https://raw.githubusercontent.com/vivekkv178/cdn/main/project-manager/Architecture.gif"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Architecture;
