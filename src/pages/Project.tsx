import React, { useEffect, useState } from 'react';
import v1Client from '@/apiClient';
import { ProjectDisplay } from '@/apiClient/data-contracts';
const Projects: React.FC = () => {
  const [ownedProjects, setOwnedProjects] = useState<ProjectDisplay[]>([]);
  const [participatedProjects, setParticipatedProjects] = useState<ProjectDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const Table = ({ projects }) => (
    <table className="min-w-full leading-normal border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Title
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Creation Date
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Resource Name
        </th>
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Participants
        </th>
      </tr>
    </thead>
    <tbody>
      {projects.map(project => (
        <tr key={project.project_id}>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {project.title}
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {new Date(project.creation_date).toLocaleDateString()}
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {project.resource?.name}
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex -space-x-2">
              {project.participants?.map((participant, index) => (
                <img key={index} src={participant.user.image || 'https://via.placeholder.com/40'} alt={participant.user.name} className="h-10 w-10 rounded-full border-2 border-white bg-white" />
              ))}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      {ownedProjects.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Owned Projects</h2>
          <Table projects={ownedProjects} />
        </>
      ) : (
        <p>No owned projects to display.</p>
      )}
      
      {participatedProjects.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Participated Projects</h2>
          <Table projects={participatedProjects} />
        </>
      ) : (
        <p>No participated projects to display.</p>
      )}
    </div>
  );
};

export default Projects;
