"use client";

import React from "react";

import Workflows from "./components/Workflows";
import Settings from "./components/Settings";
import Project from "./components/Project";
// import EditOrganization from "./components/EditOrganization";
// import DeleteOrganization from "./components/DeleteOrganization";
import { ProjectProvider, useProjectContext } from "./context/context";
import { Loader2 } from "lucide-react";

function ProjectComp() {
  const { commonState } = useProjectContext();
  console.log(commonState);

  return (
    <>
      <Workflows />
      {/* <EditOrganization />
      <DeleteOrganization /> */}
      <div className="tw-flex tw-flex-row-reverse">
        <Settings />
      </div>
      {commonState?.listLoading ? (
        <div className="tw-grid tw-place-items-center">
          <Loader2 className="tw-h-12 tw-w-12 tw-animate-spin" />
        </div>
      ) : (
        <div className="tw-max-w-[85rem] tw-px-4 tw-py-10 sm:tw-px-6 lg:tw-px-8 lg:tw-py-14 tw-mx-auto">
          <div className="tw-grid sm:tw-grid-cols-2 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-3 sm:tw-gap-6">
            {commonState?.projects?.map((project, index) => (
              <Project key={index} project={project} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const ManageProject = () => {
  return (
    <ProjectProvider>
      <ProjectComp />
    </ProjectProvider>
  );
};

export default ManageProject;
