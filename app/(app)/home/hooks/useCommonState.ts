import { useEffect, useState } from "react";
import { constants } from "../utils/constants";
import { toast } from "@vivekkv178/library";
import useApi from "@/lib/useApi";
import { BE_ROUTES, HttpMethod } from "@/lib/constants";
import { useAppSelector } from "@/lib/reduxHooks";
import { ProjectType } from "../utils/types";
import { replaceUrl } from "@vivekkv178/library";

/**Some unused functions are commented for future enhancements */
const useOrganizationsState = () => {
  const [workflows, setWorkflows] = useState([]);
  const [workflowDialog, setWorkflowDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProjectType | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [listLoading, setListLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const authState = useAppSelector((state) => state.auth);

  const [projects, setProjects] = useState([]);
  const api = useApi();

  // const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newSelectedItem = { ...selectedItem };
  //   newSelectedItem[event.target.name] = event.target.value;
  //   setSelectedItem(newSelectedItem);
  // };

  // const editHandler = async (organization: ProjectType) => {
  //   setEditDialog(true);
  //   setGetLoading(true);
  //   try {
  //     const orgDetails = await api.callApi({
  //       url: replaceUrl(BE_ROUTES.GET_ORG, { uuid: organization?.name || "" }),
  //       method: HttpMethod.GET,
  //     });
  //     setSelectedItem(orgDetails);
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error while fetching.",
  //       description: error?.response?.data?.message || "",
  //     });
  //   } finally {
  //     setGetLoading(false);
  //   }
  // };

  // const deleteHandler = (org: ProjectType) => {
  //   setDeleteDialog(true);
  //   setSelectedItem(org);
  // };

  // const addHandler = async () => {
  //   setSaveLoading(true);
  //   try {
  //     const orgData = await api.callApi({
  //       url: BE_ROUTES.CREATE_ORG,
  //       method: HttpMethod.POST,
  //       data: selectedItem,
  //     });
  //     setProjects(orgData);
  //     toast({
  //       title: "Added Successfully",
  //     });
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error while adding.",
  //       description: error?.response?.data?.message || "",
  //     });
  //   } finally {
  //     setSaveLoading(false);
  //     setWorkflowDialog(false);
  //   }
  //   listData();
  // };

  // const updateHandler = async () => {
  //   setSaveLoading(true);
  //   try {
  //     const orgData = await api.callApi({
  //       url: BE_ROUTES.UPDATE_ORG,
  //       method: HttpMethod.PUT,
  //       data: selectedItem,
  //     });
  //     setProjects(orgData);
  //     toast({
  //       title: "Updated Successfully",
  //     });
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error while updating.",
  //       description: error?.response?.data?.message || "",
  //     });
  //   } finally {
  //     setSaveLoading(false);
  //     setEditDialog(false);
  //   }
  //   listData();
  // };

  // const onDeleteHandler = async () => {
  //   setDeleteLoading(true);
  //   try {
  //     const orgData = await api.callApi({
  //       url: replaceUrl(BE_ROUTES.DELETE_ORG, {
  //         category: selectedItem?.category!,
  //       }),
  //       method: HttpMethod.DELETE,
  //     });
  //     setProjects(orgData);
  //     toast({
  //       title: "Deleted Successfully",
  //     });
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error while deleting.",
  //       description: error?.response?.data?.message || "",
  //     });
  //   } finally {
  //     setDeleteLoading(false);
  //     setDeleteDialog(false);
  //   }
  //   listData();
  // };

  const dialogCloseHandler = (type: string) => {
    setSelectedItem(null);
    if (type === constants.WORKFLOWS_DIALOG) {
      setWorkflowDialog(false);
      setWorkflows([]);
    }
    // if (type === constants.EDIT_DIALOG) setEditDialog(false);
    // if (type === constants.DELETE_DIALOG) {
    //   setDeleteDialog(false);
    //   setDeleteContactEvent(false);
    // }
  };

  const listData = async () => {
    try {
      setListLoading(true);
      const projectData = await api.callApi({
        url: BE_ROUTES.GET_PROJECTS,
        method: HttpMethod.GET,
      });
      setProjects(projectData?.projects);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    if (authState?.user && authState?.user?.email === "admin@test.com")
      listData();
  }, [authState?.user]);

  const refreshHandler = () => {
    listData();
  };

  const getWorkflows = async (project: ProjectType) => {
    try {
      setGetLoading(true);
      const workflowData = await api.callApi({
        url: `${BE_ROUTES.GET_WORKFLOWS}?user=${project?.github?.split("/")[3] || ""}&repo=${project?.github?.split("/")[4] || ""}`,
        method: HttpMethod.GET,
      });
      setWorkflows(workflowData?.workflows);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error while fetching.",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setGetLoading(false);
    }
  };

  const onGetWorkflows = (project: ProjectType) => {
    setWorkflowDialog(true);
    setSelectedItem(project);
    getWorkflows(project);
  };

  const triggerWorkflow = async (workflow: any) => {
    try {
      setSaveLoading(true);
      const gitUrlSplit: String[] = selectedItem?.github?.split("/")!;
      const user = gitUrlSplit[3];
      const repo = gitUrlSplit[4];

      await api.callApi({
        url: `${BE_ROUTES.TRIGGER_WORKFLOW}`,
        method: HttpMethod.POST,
        data: { user, repo, workflow_id: workflow?.id },
      });

      toast({
        title: "Workflow trigerred Successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error while fetching.",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const onTriggerWorkflow = (workflow: any) => {
    triggerWorkflow(workflow);
    setSelectedWorkflow(workflow);
  };

  return {
    listLoading,
    projects,
    workflows,
    workflowDialog,
    setWorkflowDialog,
    refreshHandler,
    dialogCloseHandler,
    // editDialog,
    // setEditDialog,
    // editHandler,
    // deleteDialog,
    // deleteHandler,
    selectedItem,
    // addHandler,
    // updateHandler,
    // onDeleteHandler,
    // onChangeHandler,
    getLoading,
    saveLoading,
    // deleteLoading,
    onGetWorkflows,
    onTriggerWorkflow,
    selectedWorkflow,
  };
};

export default useOrganizationsState;
