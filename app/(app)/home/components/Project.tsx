/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Button,
  CardFooter,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@vivekkv178/library";
import { useProjectContext } from "../context/context";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@vivekkv178/library";
import { ProjectType } from "../utils/types";
import { constants } from "../utils/constants";
import { useAppDispatch } from "@/lib/reduxHooks";

type ProjectProps = {
  project: ProjectType;
};

const Project: React.FC<ProjectProps> = ({ project }) => {
  const { commonState } = useProjectContext();
  const dispatch = useAppDispatch();

  //   <InfoCard
  //   NavigationComponent={Link}
  //   image={project.image}
  //   link={project.link}
  //   github={project.github}
  //   category={project.category}
  //   name={project.name}
  //   description={project.description}
  //   newTab={true}
  // />

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <img
            className=" tw-bg-cover text-muted-foreground"
            src={
              project?.image ||
              "https://graphicsfamily.com/wp-content/uploads/edd/2018/11/free-circular-logo-999x999.jpg"
            }
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{project?.name}</div>
        <p className="text-xs text-muted-foreground">{`${project?.description}`}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        {/* Quantity Selector */}
        <div className="flex items-center tw-gap-x-2">
          <Button
            onClick={() => commonState?.onGetWorkflows(project)}
            variant="outline"
          >
            Get Workflows
          </Button>
          {/* <span>{commonState?.getProductQuantityFromCart(project)}</span>
          <Button
            onClick={() =>
              dispatch(
                onCartChangeHandler({
                  item: project,
                  user_action: constants.ADD_PRODUCT,
                }),
              )
            }
            variant="outline"
          >
            +
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Project;
