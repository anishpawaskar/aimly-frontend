import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitive/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { PROJECTS_DROPDOWN_MENU_ITEM } from "./projects.constant";
import { Button } from "@/components/primitive/button";
import DeleteDialog from "@/components/common/delete-dialog";
import { AlertDialog } from "@/components/primitive/alert-dialog";
import ListForm from "@/components/forms/list-form";

export const ProjectsDropdownMenu = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);

  const handleMenuItem = (name) => {
    switch (name) {
      case "Edit": {
        setIsMenuOpen(false);
        setIsEditFormOpen(true);
        break;
      }

      case "Delete": {
        setIsMenuOpen(false);
        setIsDeleteMenuOpen(true);
        break;
      }
    }
  };

  const handleDelete = () => {
    console.log("Dleete project", data);
    setIsDeleteMenuOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button
            onClick={() => setIsMenuOpen((prevState) => !prevState)}
            className="shrink-0 h-5 w-5 invisible group-hover/content:visible transition-none"
          >
            <Ellipsis size={16} className="text-gray/40" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={-10} alignOffset={10}>
          {PROJECTS_DROPDOWN_MENU_ITEM.map((menuItem) => {
            return (
              <DropdownMenuItem key={menuItem.name} asChild>
                <Button
                  variant={"ghost"}
                  onClick={() => handleMenuItem(menuItem.name)}
                  className={"justify-start"}
                >
                  {menuItem.name}
                </Button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      {isDeleteMenuOpen && (
        <DeleteDialog
          open={isDeleteMenuOpen}
          onOpenChange={setIsDeleteMenuOpen}
          title={`Delete list`}
          description={`All tasks in the list "${data.name}" will be deleted.`}
          handleDelete={handleDelete}
        />
      )}
      {isEditFormOpen && (
        <AlertDialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <ListForm data={data} onOpenChange={setIsEditFormOpen} />
        </AlertDialog>
      )}
    </>
  );
};
