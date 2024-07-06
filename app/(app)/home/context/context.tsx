import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import useCommonState from "../hooks/useCommonState";
import { ProjectType } from "../utils/types";

type CommonState = {
  // Define the structure of your common state here
  listLoading: boolean;
  getLoading: boolean;
  saveLoading: boolean;
  // deleteLoading: boolean;
  projects: ProjectType[];
  workflows: any;
  workflowDialog: boolean;
  setWorkflowDialog: Dispatch<SetStateAction<boolean>>;
  // editDialog: boolean;
  // setEditDialog: Dispatch<SetStateAction<boolean>>;
  // deleteDialog: boolean;
  refreshHandler: () => void;
  dialogCloseHandler: (type: string) => void;
  // onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  // editHandler: (org: ProjectType) => void;
  // updateHandler: () => void;
  // deleteHandler: (org: ProjectType) => void;
  selectedItem: any;
  // addHandler: () => void;
  // onDeleteHandler: () => void;
  onGetWorkflows: (project: ProjectType) => void;
  onTriggerWorkflow: (workflow: any) => void;
  selectedWorkflow: any;
};

type ProjectContextType = {
  commonState: CommonState;
};

type ProjectProviderProps = {
  children: React.ReactNode;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const commonState = useCommonState(); // Assuming this returns CommonState
  return (
    <ProjectContext.Provider value={{ commonState }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within an ProjectProvider");
  }
  return context;
};
