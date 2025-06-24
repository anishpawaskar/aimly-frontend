import { Button } from "@/components/primitive/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/primitive/dropdown-menu";
import { Input } from "@/components/primitive/input";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

export const TagSelect = ({ tags, taskId }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectTag = (tag) => {
    console.log(`add tag ${tag.name} to task ${taskId}`);
    setOpen(false);
  };

  const createNewTag = () => {
    console.log("create new tag then attach that tag");
    setOpen(false);
  };

  useEffect(() => {
    // TODO: later replace this logic with ref if click outside then reset
    if (!open) {
      setSearch("");
    }
  }, [open]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-5 rounded-full border border-primary px-2 flex items-center justify-center sm:hover:bg-primary/20">
          <Plus size={14} strokeWidth={1} className="text-primary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={12} sideOffset={0}>
        <div className="tag-select-header w-full flex items-center h-8 border-b border-gray/10 px-1">
          <Search size={18} className="text-gray/40 shrink-0" />
          <Input
            placeholder={"Type in a tag"}
            className={"border-none h-full flex-1 focus:border-none"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="tag-select-body h-[300px]">
          {!!filteredTags.length ? (
            filteredTags.map((tag) => {
              return (
                <li key={tag._id}>
                  <Button
                    variant={"ghost"}
                    size={"full"}
                    className={
                      "h-8 px-3 text-xs text-gray truncate justify-start"
                    }
                    onClick={() => handleSelectTag(tag)}
                  >
                    {tag.name}
                  </Button>
                </li>
              );
            })
          ) : (
            <li>
              <Button
                variant={"ghost"}
                size={"full"}
                className={"h-8 px-3"}
                onClick={createNewTag}
              >
                <Plus size={16} className="text-gray/40 shrink-0 mr-1.5" />
                <span className="text-start flex-1 text-xs truncate">
                  Create Tag "{search}"
                </span>
              </Button>
            </li>
          )}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
