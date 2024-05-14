import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  /* 
data: {
            session: get().closedSession,
            type: "session",
          },
*/
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xs mx-auto">
        <h2 className="font-semibold text-gray-800 truncate overflow-hidden break-words">
          {data.type === "session"
            ? data.session.title
            : data.type === "finalDecision"
            ? data.idea.content
            : data.project.title}
        </h2>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
