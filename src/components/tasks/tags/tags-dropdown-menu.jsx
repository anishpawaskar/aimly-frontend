import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitive/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { TAGS_DROPDOWN_MENU_ITEM } from "./tags.constant";
import { Button } from "@/components/primitive/button";
import DeleteDialog from "@/components/common/delete-dialog";
import { AlertDialog } from "@/components/primitive/alert-dialog";
import TagForm from "@/components/forms/tag-form";

export const TagsDropdownMenu = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleMenuItem = (name) => {
    switch (name) {
      case "Edit": {
        setIsMenuOpen(false);
        setIsEditFormOpen(true);
        break;
      }

      case "Merge Tags": {
        setIsMenuOpen(false);
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
    console.log("Delete this tasks", data);
    setIsDeleteMenuOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button
            onClick={() => setIsMenuOpen((prevState) => !prevState)}
            className="shrink-0 h-4 w-4 hidden group-hover/content:block transition-none"
          >
            <Ellipsis size={16} className="text-gray/40" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" alignOffset={10} sideOffset={-10}>
          {TAGS_DROPDOWN_MENU_ITEM.map((menuItem) => {
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
          title={"Delete Tag"}
          description={`After deletion, the tag "${data.name}" will be removed from all tasks.`}
          handleDelete={handleDelete}
        />
      )}
      {isEditFormOpen && (
        <AlertDialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <TagForm onOpenChange={setIsEditFormOpen} data={data} />
        </AlertDialog>
      )}
    </>
  );
};
