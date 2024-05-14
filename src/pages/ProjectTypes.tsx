import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import v1Client from "@/apiClient";
import { Input } from "@/components/ui/input";
import Fuse, { FuseResult } from "fuse.js";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  ResourceCreate,
  AppSchemeRessourceSchemeResourceDisplay as ResourceScheme,
} from "@/apiClient/data-contracts";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectCreate } from "@/apiClient/data-contracts";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  projectCreateData: ProjectCreate;
  resourceCreateData: ResourceCreate;
  resources: ResourceScheme[];
};

const useResourceStore = create<State>()(
  immer((_set) => ({
    projectCreateData: {
      title: "",
      description: "",
      status: "active",
      resource_id: 0,
    },
    resourceCreateData: {
      name: "",
      type: "event",
      level: null,
      description: "",
    },
    resources: [],
  }))
);

const ProjectTypes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const projectCreateData = useResourceStore(
    (state) => state.projectCreateData
  );
  const resourceCreateData = useResourceStore(
    (state) => state.resourceCreateData
  );
  const resources = useResourceStore((state) => state.resources);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [fuse, setFuse] = useState<Fuse<ResourceScheme>>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    FuseResult<ResourceScheme>[]
  >([]);

  const [selectedResource, setSelectedResource] = useState<number>(0);
  const [projectCreateOpen, setProjectCreateOpen] = useState<boolean>(false);
  const handleProjectCreate = (resourceId: number) => {
    setSelectedResource(resourceId);
    setProjectCreateOpen(true);
  };
  const handleCreateProject = async () => {
    try {
      if (
        !projectCreateData.title ||
        !projectCreateData.description ||
        selectedResource == 0
      ) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description:
            "Please provide a title and a description for the new project.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }
      useResourceStore.setState((state) => {
        const setAsync = async () => {
          state.projectCreateData.resource_id = selectedResource;

          const response = await v1Client.createProjectV1ProjectPost({
            title: state.projectCreateData.title,
            description: state.projectCreateData.description,
            status: "active",
            resource_id: state.projectCreateData.resource_id,
          });

          toast({
            variant: "default",
            title: "Success",
            description: "New project created",
            action: <ToastAction altText="close">Close</ToastAction>,
          });

          navigate("/project/" + response.data.project_id);
        };
        setAsync();
        state.projectCreateData = {
          title: "",
          description: "",
          status: "active",
          resource_id: 0,
        };
      });
    } catch (error) {
      setError("Failed to create project. Please try again.");
      console.error(error);
    }
  };

  const handleCreateResource = async () => {
    try {
      if (!resourceCreateData.name) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please provide a name for the new event.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }
      useResourceStore.setState((state) => {
        const setAsync = async () => {
          const response = await v1Client.createV1RessourcePost({
            name: state.resourceCreateData.name,
            type: "event",
            description: state.resourceCreateData.description,
          });

          toast({
            variant: "default",
            title: "Success",
            description: "New resource created",
            action: <ToastAction altText="close">Close</ToastAction>,
          });

          // FIXME:
          state.resources.push(response.data);
        };
        setAsync();
        state.resourceCreateData = {
          name: "",
          description: "",
          type: "event",
        };
      });
    } catch (error) {
      setError("Failed to create resource. Please try again.");
      console.error(error);
    }
  };

  //async and await
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await v1Client.readResourcesV1RessourceGet();
        useResourceStore.setState((state) => {
          state.resources = res.data;
        });

        const newFuse = new Fuse(res.data, {
          keys: ["name", "description", "level", "type"],
        });
        setFuse(newFuse);
      } catch (err) {
        setError("Failed to fetch resources.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  useEffect(() => {
    if (fuse) {
      setSearchResults(fuse.search(searchTerm));
    }
  }, [searchTerm]);

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {fuse ? (
        <div className="p-16 flex justify-between">
          <div className="w-1/3 pl-8">
            <Input
              className="w-full"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder="Search for a resource"
            />
            <div className="max-h-32 w-full border overflow-scroll">
              <ul className="w-full text-center">
                {searchResults.map((result) => (
                  <li
                    key={result.item.resource_id}
                    className="m-0 p-1 w-full text-center hover:bg-[#3b82f6aa] rounded-lg hover:mt-2 hover:mb-2 hover:text-lg hover:cursor-pointer"
                    onClick={() => {
                      handleProjectCreate(result.item.resource_id);
                    }}
                  >
                    {result.item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mr-8">Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Resource</DialogTitle>
                <DialogDescription>
                  Enter details for your new resouce below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-resouce-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="new-resouce-name"
                    placeholder="Enter resource name"
                    className="col-span-3"
                    value={resourceCreateData.name}
                    onChange={(e) =>
                      useResourceStore.setState((state) => {
                        state.resourceCreateData.name = e.target.value;
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="new-resource-description"
                    className="text-right"
                  >
                    Description
                  </Label>
                  <Input
                    id="new-resource-description"
                    placeholder="Enter resource description"
                    className="col-span-3"
                    value={resourceCreateData.description}
                    onChange={(e) =>
                      useResourceStore.setState((state) => {
                        state.resourceCreateData.description = e.target.value;
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateResource}>
                  Create resource
                </Button>
                <DialogClose asChild>
                  {/* @ts-ignore */}
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}

      <div className="p-16">
        <h1 className="text-center font-bold text-xl">Clubs</h1>
        <div className="grid gap-8 p-8 grid-cols-4 max-lg:grid-cols-3">
          {resources
            .filter((ressource) => ressource.type === "club")
            .map((filteredRessource) => (
              <Card
                key={filteredRessource.resource_id}
                className="w-full h-full aspect-square rounded-md text-center p-4 hover:-mt-2"
                onClick={() => {
                  handleProjectCreate(filteredRessource.resource_id);
                }}
              >
                <CardHeader className="">
                  <Avatar className="size-14 self-center">
                    <AvatarImage
                      src={filteredRessource.photo as string}
                      className="size-min"
                    />
                    <AvatarFallback>CB</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="">
                  <CardTitle className="mb-4">
                    {filteredRessource.name}
                  </CardTitle>
                  <CardDescription className="p-2 m-1 flex-col flex flex-grow relative ">
                    {filteredRessource.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
        </div>
        {/* Espacement entre les sections */}
        <h1 className="text-center font-bold text-xl mt-4">Modules</h1>
        <div className="grid grid-cols-4 gap-8 p-8">
          {(() => {
            const typesSet = new Set(); // Création d'un ensemble pour stocker les types de ressources uniques
            return resources
              .filter((resource) => resource.type == "module")
              .filter((ressource) => /^\d/.test(ressource.level)) // Filtrer les ressources par niveau
              .map((filteredRessource) => {
                if (!typesSet.has(filteredRessource.level)) {
                  // Vérifier la non-duplication
                  typesSet.add(filteredRessource.level); // Ajouter le type de ressource à l'ensemble
                  const filteredRessources = resources.filter(
                    (ressource) => ressource.level === filteredRessource.level
                  );

                  return (
                    <Card
                      key={filteredRessource.resource_id}
                      className="w-full h-full aspect-square rounded-md text-center p-4 hover:-mt-2"
                    >
                      <CardHeader className="text-center mb-2">
                        <CardTitle>{filteredRessource.level}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Separator />
                        <ScrollArea className="h-[200px] rounded-md p-4">
                          <ul>
                            {filteredRessources.map((module) => (
                              <li
                                key={module.resource_id}
                                className="m-0 p-1 w-full hover:bg-[#3b82f6aa] rounded-lg hover:mt-2 hover:mb-2 hover:text-lg hover:cursor-pointer"
                                onClick={() => {
                                  handleProjectCreate(module.resource_id);
                                }}
                              >
                                {module.name}
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  );
                }
                return null; // Retourne null pour les ressources dupliquées
              });
          })()}
        </div>
        <h1 className="text-center font-bold text-xl mt-4">Events</h1>
        <div className="grid grid-cols-4 gap-8 p-8">
          {resources
            .filter((ressource) => ressource.type === "event")
            .map((filteredRessource) => (
              <Card
                key={filteredRessource.resource_id}
                className="w-full h-full aspect-square rounded-md text-center p-4 hover:-mt-2"
                onClick={() => {
                  handleProjectCreate(filteredRessource.resource_id);
                }}
              >
                <CardHeader className="">
                  <CardTitle className="mb-4">
                    {filteredRessource.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="">
                  <CardDescription className="p-2 m-1 flex-col flex flex-grow relative ">
                    {filteredRessource.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
      <Dialog open={projectCreateOpen} onOpenChange={setProjectCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Enter details for your new project below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-project-title" className="text-right">
                Title
              </Label>
              <Input
                id="new-project-title"
                placeholder="Enter project title"
                className="col-span-3"
                value={projectCreateData.title}
                onChange={(e) =>
                  useResourceStore.setState((state) => {
                    state.projectCreateData.title = e.target.value;
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-project-description" className="text-right">
                Description
              </Label>
              {/* @ts-ignore */}
              <Input
                id="new-project-description"
                placeholder="Enter project description"
                className="col-span-3"
                value={projectCreateData.description}
                onChange={(e) =>
                  useResourceStore.setState((state) => {
                    state.projectCreateData.description = e.target.value;
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-project-title" className="text-right">
                Ressource
              </Label>
              <Input
                placeholder={resources
                  .filter((res) => res.resource_id == selectedResource)
                  .map((res) => res.name)
                  .join()}
                disabled={true}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreateProject}>
              Create Project
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectTypes;
