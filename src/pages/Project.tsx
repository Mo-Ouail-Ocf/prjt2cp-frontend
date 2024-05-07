import React, { useEffect, useState,useRef  } from 'react';
import v1Client from '@/apiClient';
import { Link } from 'react-router-dom';
import { ProjectDisplay ,ProjectCreate} from '@/apiClient/data-contracts';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import Select from 'react-select';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AppSchemeRessourceSchemeResourceDisplay } from '@/apiClient/data-contracts';
interface ResourceOption {
  value: number;
  label: string;
}
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Projects: React.FC = () => {
  // ressource
  const [resources, setResources] = useState<AppSchemeRessourceSchemeResourceDisplay[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceOption | null>(null);

  const [ownedProjects, setOwnedProjects] = useState<ProjectDisplay[]>([]);
  const [participatedProjects, setParticipatedProjects] = useState<ProjectDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProjectData, setNewProjectData] = useState<ProjectCreate>({
    title: '',
    description: '',
    status: 'active', // You may change this default status as needed
    resource_id: 0, // Example resource_id; replace with actual logic to determine resource ID
  });
  const { toast } = useToast();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const handleCreateProject = async () => {
    try {
      // Make sure newProjectData is valid and complete before making the API call
      if (!newProjectData.title ||!newProjectData.description || newProjectData.resource_id==0 ) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please provide a title,a description and ressource for the new project.",
          action:  <ToastAction altText="Try again">Try again</ToastAction>
        });
        return;
      }
      // Make the API call to create the project
      const response = await v1Client.createProjectV1ProjectPost(newProjectData);
      console.log('New project created:', response.data);
      toast({
        variant: "default",
        title: "Success",
        description: "New project created",
        action:  <ToastAction altText="close">Close</ToastAction>
      });
      if (dialogRef.current) {
        dialogRef.current.click(); 
      }
      setOwnedProjects(prevProjects => [...prevProjects, response.data]);
      // Clear the form data after successful submission
      setNewProjectData({
        title: '',
        description: '',
        status: 'active',
        resource_id: 0, 
      });
    } catch (error) {
      setError('Failed to create project. Please try again.');
      console.error(error);
    }
  };
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [owned, participated] = await Promise.all([
          v1Client.readOwnedProjectsV1ProjectUserOwnedGet(),
          v1Client.readParticipatedProjectsV1ProjectUserParticipatedGet()
        ]);
        setOwnedProjects(owned.data);
        setParticipatedProjects(participated.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects');
        setLoading(false);
        console.error(err);
      }
    };
    fetchProjects();
    v1Client.readResourcesV1RessourceGet()
      .then(response => {
        setResources(response.data);
      })
      .catch(error => {
        console.error('Error fetching resources:', error);
      });
  }, []);
  const handleTypeChange = (selectedOption: ResourceOption | null) => {
    // @ts-ignore
    setSelectedType(selectedOption?.value || null);
    setSelectedLevel(null);
    setSelectedResource(null);
  };

  const handleLevelChange = (selectedOption: ResourceOption | null) => {
    // @ts-ignore
    setSelectedLevel(selectedOption?.value || null);
    setSelectedResource(null);
  };

  const handleResourceChange = (selectedOption: ResourceOption | null) => {
    if (selectedOption) {
      const resourceId = selectedOption.value;
      setNewProjectData({ ...newProjectData, resource_id:resourceId })
      console.log('Selected Resource ID:', resourceId);
      // Now you can use the resourceId as needed, such as making an API call with it
    }
    setSelectedResource(selectedOption || null);
  };

  const filteredResources = resources.filter(resource => {
    if (selectedType === null) return false;
    if (selectedLevel === null && resource.type === selectedType) return true;
    return resource.type === selectedType && resource.level === selectedLevel;
  });

  // Prepare options for selects
  const typeOptions = Array.from(new Set(resources.map(resource => resource.type))).map(type => ({
    value: type,
    label: type,
  }));
  const levelOptions = Array.from(new Set(resources.filter(resource => resource.type === 'module').map(resource => resource.level || 'Unknown'))).map(level => ({
    value: level,
    label: level,
  }));
  const resourceOptions = filteredResources.map(resource => ({
    value: resource.resource_id,
    label: resource.name,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  interface TableProps {
    projects: ProjectDisplay[];
  }
  const Table:React.FC<TableProps> = ({ projects }) => (
    <>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">edit Date</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Resource Name</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Participants</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {projects.map((project) => (
          <tr key={project.project_id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                <Link
                to={
                 `/project/${project.project_id}`
                }
                className="text-purple-700 hover:underline font-semibold"
                >
                {project.title}
              </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>See project details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(project.creation_date).toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">{project.resource?.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {project.participants && project.participants.length > 0 ? (
                <div className="flex -space-x-2">
                  {project.participants.map((participant, index) => (
                    <div className="flex -space-x-2">
                    <img key={index} src={participant.user.image || 'https://via.placeholder.com/40'} alt={participant.user.name} className="h-10 w-10 rounded-full border-2 border-white bg-white" />
                  </div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-400">No participants</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>


  </>
  
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-bold mb-4">Your Projects :</h1>
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create new project</Button>
        </DialogTrigger>
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
              <Input id="new-project-title" placeholder="Enter project title" className="col-span-3"   value={newProjectData.title}
                onChange={(e) => setNewProjectData({ ...newProjectData, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-project-description" className="text-right">
                Description
              </Label>
                            {/* @ts-ignore */}
              <Input id="new-project-description" placeholder="Enter project description" className="col-span-3"  value={newProjectData.description}
          onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-project-title" className="text-right">
                  Ressource type
              </Label>
              <Select
                placeholder="Select Type"
                value={typeOptions.find(option => option.value === selectedType)}
                options={typeOptions}
                // @ts-ignore
                onChange={handleTypeChange}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: 'black',
                  },
                })}
                className="col-span-3"
              />
            </div>
            {selectedType === 'module' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-project-title" className="text-right">
                    Level
                  </Label>
                  <Select
                    placeholder="Select Level"
                    value={levelOptions.find(option => option.value === selectedLevel)}
                    options={levelOptions}
                    // @ts-ignore 
                    onChange={handleLevelChange}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: 'black',
                      },
                    })}
                    className="col-span-3"
                  />
                </div>
              )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-project-title" className="text-right">
                Ressource
              </Label>
              <Select
                placeholder="Select Resource"
                value={selectedResource}
                options={resourceOptions}
                onChange={handleResourceChange}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: 'black',
                  },
                })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreateProject}>Create Project</Button>
            <DialogClose asChild>
              {/* @ts-ignore */}
            <Button type="button" variant="secondary" ref={dialogRef}>
              Close
            </Button>
          </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {ownedProjects.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-center p-4">Owned Projects</h2>
          <Table projects={ownedProjects} />
        </>
      ) : (
        <p>No owned projects to display.</p>
      )}
      
      {participatedProjects.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-center p-4">Participated Projects</h2>
          <Table projects={participatedProjects} />
        </>
      ) : (
        <p>No participated projects to display.</p>
      )}
    </div>
  );
};

export default Projects;
