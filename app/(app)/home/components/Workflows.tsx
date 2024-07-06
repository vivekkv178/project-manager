import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@vivekkv178/library";
import { Input } from "@vivekkv178/library";
import { Label } from "@vivekkv178/library";
import { Button } from "@vivekkv178/library";
import { useProjectContext } from "../context/context";
import { constants } from "../utils/constants";
import { Loader2 } from "lucide-react";

const Workflows = () => {
  const { commonState } = useProjectContext();

  return (
    <Dialog
      open={commonState?.workflowDialog}
      onOpenChange={() =>
        commonState?.dialogCloseHandler(constants.WORKFLOWS_DIALOG)
      }
    >
      <DialogContent className="sm:tw-max-w-2xl">
        <DialogHeader>
          <DialogTitle>Workflows</DialogTitle>
          <DialogDescription>
            List of all the workflows for the project :
            <span className="tw-font-bold">
              {commonState?.selectedItem?.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        {commonState?.getLoading ? (
          <div className="tw-grid tw-place-items-center">
            <Loader2 className="tw-h-12 tw-w-12 tw-animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4 py-4 tw-overflow-y-scroll tw-max-h-[70vh]">
            {commonState?.workflows.map((workflow: any, index: number) => (
              <div
                className="tw-flex tw-items-center tw-justify-between"
                key={index}
              >
                <Label htmlFor={workflow.id} className="text-right">
                  {workflow.name}
                </Label>
                <Button
                  variant="secondary"
                  id={`${index}`}
                  onClick={() => commonState?.onTriggerWorkflow(workflow)}
                >
                  {commonState?.saveLoading &&
                  commonState?.selectedWorkflow?.id === workflow?.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Trigger"
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
        <DialogFooter>
          {/* <Button type="submit" onClick={commonState?.addHandler}>
            {commonState?.saveLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Workflows;
