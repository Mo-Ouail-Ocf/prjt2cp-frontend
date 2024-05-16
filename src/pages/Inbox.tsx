import React, { useEffect, useState } from "react";
import v1Client from "@/apiClient";
import { useToast } from "@/components/ui/use-toast"; // Ensure you have the correct path
import { Button } from "@/components/ui/button";

interface PendingInvitationInfo {
  project_id: number;
  project_title: string;
  project_description: string;
  creator_name: string;
  creator_email: string;
  invitation_time: string;
  creator_image: string;
}

const Inbox: React.FC = () => {
  const [invitations, setInvitations] = useState<PendingInvitationInfo[]>([]);
  const { toast } = useToast(); // Using the useToast hook
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response =
          await v1Client.readPendingInvitationsV1ProjectUserPendingInvitationsGet();
        setInvitations(response.data); // Assuming the response format matches your interface
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch invitations");
        setLoading(false);
        console.error(err);
      }
    };

    fetchInvitations();
  }, []);

  const handleInvitation = async (projectId: number, accept: boolean) => {
    try {
      const response =
        await v1Client.handleInvitationV1ProjectProjectIdInvitePost(projectId, {
          status: accept,
        });
      // Show success toast
      toast({
        title: `Invitation ${accept ? "accepted" : "declined"}.`,
        description: accept
          ? `You have accepted the invitation for project ${projectId}.`
          : `You have declined the invitation for project ${projectId}.`,
      });
      // Remove the handled invitation from the state
      setInvitations(
        invitations.filter((invite) => invite.project_id !== projectId)
      );
    } catch (error) {
      // Show error toast
      toast({
        title: "Failed to process the invitation.",
        description: "There was a problem with your request.",
      });
      console.error(error);
    }
  };
  const formatDateWithAdditionalHour = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 1); // Add one hour
    return date.toLocaleString();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (invitations.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
          You have no pending invitations
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <h1 className="col-span-2 text-2xl font-bold text-center my-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200">
        Pending Invitations
      </h1>

      <ul className="col-span-2 grid md:grid-cols-2 lg:grid-cols-2 gap-4">
        {invitations.map((invitation) => (
          <li
            key={invitation.project_id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col mx-4 and my-4"
          >
            <img
              src={invitation.creator_image}
              alt={`Profile of ${invitation.creator_name}`}
              className="rounded-full w-24 h-24 mx-auto"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">
                {invitation.project_title}
              </h2>
              <p className="text-gray-600">
                Description: {invitation.project_description}
              </p>
              <p className="text-sm text-gray-500">
                Invited by: {invitation.creator_name} (
                {invitation.creator_email})
              </p>
              <p className="text-sm text-gray-500">
                Invitation Time:{" "}
                {formatDateWithAdditionalHour(invitation.invitation_time)}
              </p>
            </div>
            <div className="flex justify-around mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => handleInvitation(invitation.project_id, true)}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleInvitation(invitation.project_id, false)}
              >
                Decline
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
