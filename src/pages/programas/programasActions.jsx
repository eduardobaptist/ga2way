import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreHorizontal, Trash2, Edit2, Eye } from "lucide-react";

const ProgramasActions = ({ onDelete, onEdit, onView }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <MoreHorizontal className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={onView}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                <span>Ver detalhes</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onEdit}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit2 className="h-4 w-4" />
                <span>Alterar</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onDelete}
                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                <span>Deletar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>Opções</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProgramasActions;
