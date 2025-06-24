import { createContext, useContext, useState } from "react";
import {
  PopoverMenu,
  PopoverMenuAction,
  PopoverMenuCancel,
  PopoverMenuContent,
  PopoverMenuFooter,
  PopoverMenuTrigger,
} from "../primitive/popover-menu";
import { Slot } from "../primitive/slot";
import { cn, generateSortOrder } from "@/lib/utils";
import { Button, buttonVariants } from "../primitive/button";
import { Check, Plus, Search, Tag, X } from "lucide-react";
import { Input } from "../primitive/input";
import { useTaskPage } from "@/context/task-page-provider";
import { BASE_INTERVAL } from "@/constants";
import { v4 as uuidv4 } from "uuid";

const TAGS = [
  {
    name: "tag 1",
    color: "",
    _id: "e123f3b2-1234-4d1e-8888-1bdfcf0d96c1",
    sortOrder: -1099511627776,
  },
  {
    name: "tag 2",
    color: "",
    _id: "fa23a4de-5678-4cd5-a231-5c45a09be3e1",
    sortOrder: -2199023255552,
  },
  {
    name: "tag 3",
    color: "",
    _id: "ba1c2e99-6789-4bc2-aaaa-9952a7a421b4",
    sortOrder: -3298534883328,
  },
  {
    name: "tag 4",
    color: "",
    _id: "0a4df237-9182-40d2-bf2c-4a6c52c7f83b",
    sortOrder: -4398046511104,
  },
  {
    name: "tag 5",
    color: "",
    _id: "e0a59219-d7a2-4121-b4b2-1de292ad7cc9",
    sortOrder: -5497558138880,
  },
  {
    name: "tag 6",
    color: "",
    _id: "ccd23ed9-25e0-4726-920b-8bbd259ebf41",
    sortOrder: -6597069766656,
  },
  {
    name: "tag 7",
    color: "",
    _id: "9fe3f4a4-6b79-44a5-bafe-2035b270c2f2",
    sortOrder: -7696581394432,
  },
  {
    name: "tag 8",
    color: "",
    _id: "abcde123-1a2b-4c3d-9e0f-112233445566",
    sortOrder: -8796093022208,
  },
  {
    name: "tag 9",
    color: "",
    _id: "e7b34a9a-5b8d-4e4f-bff2-6ccf8d3b2ea1",
    sortOrder: -9895604649984,
  },
  {
    name: "tag 10",
    color: "",
    _id: "deadc0de-cafe-4bad-babe-abcdef123456",
    sortOrder: -10995116277760,
  },
  {
    name: "tag 11",
    color: "",
    _id: "f1a2b3c4-d5e6-4789-9abc-1234567890ff",
    sortOrder: -12094627905536,
  },
  {
    name: "tag 12",
    color: "",
    _id: "00112233-4455-6677-8899-aabbccddeeff",
    sortOrder: -13194139533312,
  },
  {
    name: "tag 13",
    color: "",
    _id: "123e4567-e89b-12d3-a456-426614174001",
    sortOrder: -14293651161088,
  },
  {
    name: "tag 14",
    color: "",
    _id: "76543210-fedc-ba98-7654-3210fedcba98",
    sortOrder: -15393162788864,
  },
  {
    name: "tag 15",
    color: "",
    _id: "a1b2c3d4-e5f6-7890-abcd-ef0123456789",
    sortOrder: -16492674416640,
  },
  {
    name: "tag 16",
    color: "",
    _id: "aabbccdd-eeff-0011-2233-445566778899",
    sortOrder: -17592186044416,
  },
  {
    name: "tag 17",
    color: "",
    _id: "11112222-3333-4444-5555-666677778888",
    sortOrder: -18691697672192,
  },
  {
    name: "tag 18",
    color: "",
    _id: "9999aaaa-bbbb-cccc-dddd-eeeeffff0000",
    sortOrder: -19791209299968,
  },
  {
    name: "tag 19",
    color: "",
    _id: "0f1e2d3c-4b5a-6978-8f9e-abcabcabcabc",
    sortOrder: -20890720927744,
  },
  {
    name: "tag 20",
    color: "",
    _id: "deadbeef-bead-deaf-cafe-baadf00d1234",
    sortOrder: -21990232555520,
  },
];

const TagSelectorContext = createContext(null);
const useTagSelector = () => useContext(TagSelectorContext);

const TagSelector = ({ task, open, setOpen, tags, setTags, children }) => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const contextValue = {
    task,
    open,
    setOpen,
    search,
    setSearch,
    selectedTags,
    setSelectedTags,
    tags,
    setTags,
  };

  return (
    <TagSelectorContext.Provider value={contextValue}>
      <PopoverMenu open={open} onOpenChange={setOpen}>
        {children}
      </PopoverMenu>
    </TagSelectorContext.Provider>
  );
};

const TagSelectorTrigger = ({ asChild = false, className, children }) => {
  const { setOpen } = useTagSelector();
  const Comp = asChild ? Slot : "button";

  return (
    <PopoverMenuTrigger asChild={true}>
      <Comp
        onClick={() => setOpen((prevState) => !prevState)}
        className={cn(
          buttonVariants({ variant: "ghost", isDisabled: false }),
          className
        )}
      >
        {children}
      </Comp>
    </PopoverMenuTrigger>
  );
};

const TagSelectorSearchBox = () => {
  const { search, setSearch, selectedTags } = useTagSelector();

  return (
    <div className="w-full flex items-center h-8 border-b border-gray/10 px-1">
      {!selectedTags.length && (
        <Search size={18} className="text-gray/40 shrink-0" />
      )}

      <Input
        placeholder={"Type in a tag"}
        className={"border-none h-full flex-1 focus:border-none"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const TagSelectorHeader = () => {
  const { selectedTags, setSelectedTags } = useTagSelector();

  const handleCancelTag = (tag) => {
    const filteredTag = selectedTags.filter(
      (selectedTag) => selectedTag._id !== tag._id
    );
    setSelectedTags(filteredTag);
  };

  return (
    <div
      className={cn(
        "flex gap-1 flex-wrap",
        !!selectedTags.length && "gap-1.5 flex-col"
      )}
    >
      {!!selectedTags.length && (
        <div className="max-h-20 flex gap-1 flex-wrap">
          {selectedTags.map((selectedTag) => {
            return (
              <button
                key={selectedTag._id}
                onClick={() => handleCancelTag(selectedTag)}
                className="max-w-32 truncate text-xs bg-primary/10 text-primary pl-1 pr-0.5 h-5 rounded-sm flex items-center gap-1 group"
              >
                <span>{selectedTag.name}</span>
                <X
                  size={12}
                  className="text-gray/40 group-hover:text-gray/80 transition-colors"
                />
              </button>
            );
          })}
        </div>
      )}
      <TagSelectorSearchBox />
    </div>
  );
};

const TagSelectorItem = ({ tag }) => {
  const { selectedTags, setSelectedTags, setSearch } = useTagSelector();

  const isSelected = selectedTags.find(
    (selectedTag) => selectedTag._id === tag._id
  );

  const handleTag = () => {
    const isTagExists = selectedTags.find(
      (selectedTag) => selectedTag._id === tag._id
    );

    if (isTagExists) {
      const filteredtags = selectedTags.filter(
        (selectedTag) => selectedTag._id !== tag._id
      );
      setSelectedTags(filteredtags);
    } else {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }

    setSearch("");
  };

  return (
    <li>
      <Button
        variant={"ghost"}
        size={"full"}
        className={"h-8 px-2"}
        onClick={handleTag}
      >
        <span className="flex items-center flex-1 mr-0.5">
          <Tag
            size={16}
            className={cn(
              "text-gray/40 shrink-0 mr-3",
              isSelected && "text-primary"
            )}
          />
          <span
            className={cn(
              "flex-1 text-xs text-gray truncate text-start",
              isSelected && "text-primary"
            )}
          >
            {tag.name}
          </span>
        </span>
        {isSelected && <Check size={16} className={"text-primary"} />}
      </Button>
    </li>
  );
};

const TagSelectorFooter = ({ handleTagSubmit }) => {
  const { tags, selectedTags, setOpen, setSelectedTags, setSearch } =
    useTagSelector();

  return (
    <PopoverMenuFooter>
      <PopoverMenuCancel asChild>
        <button
          onClick={() => {
            setOpen(false);
            if (!tags.length) {
              setSelectedTags([]);
            } else {
              setSelectedTags(tags);
            }
            setSearch("");
          }}
          className="h-8 w-full"
        >
          Cancel
        </button>
      </PopoverMenuCancel>
      <PopoverMenuAction asChild>
        <button
          className="h-8 w-full"
          onClick={() => {
            setSearch("");
            setSelectedTags(selectedTags);
            handleTagSubmit(selectedTags);
          }}
        >
          Ok
        </button>
      </PopoverMenuAction>
    </PopoverMenuFooter>
  );
};

const TagSelectorContent = ({
  side,
  sideoffset,
  align,
  alignOffset,
  className,
  handleTagSubmit,
  anchorRef,
}) => {
  const { task, open, tags, selectedTags, setSelectedTags, search, setSearch } =
    useTagSelector();

  const { tags: taskPageTags, setTags, tasks, setTasks } = useTaskPage();

  const filteredTags = taskPageTags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleReset = () => {
    if (!tags.length) {
      setSelectedTags([]);
    } else {
      setSelectedTags(tags);
    }
    setSearch("");
  };

  const createNewTag = () => {
    const payload = {
      _id: uuidv4(),
      name: search,
      color: "",
    };

    if (taskPageTags.length) {
      payload.sortOrder = generateSortOrder({ items: taskPageTags });
    } else {
      payload.sortOrder = -BASE_INTERVAL;
    }

    setTags((prevTags) => [...prevTags, payload]);
    const updatedTasks = tasks.map((taskItem) =>
      taskItem._id === task._id
        ? { ...taskItem, tags: [...taskItem.tags, payload._id] }
        : taskItem
    );
    setTasks(updatedTasks);
    setSearch("");
  };

  if (!open) {
    return null;
  }

  return (
    <PopoverMenuContent
      side={side}
      sideOffset={sideoffset}
      align={align}
      alignOffset={alignOffset}
      className={cn(
        "px-2 pt-1 w-56",
        !!selectedTags.length && "pt-2",
        className
      )}
      handleReset={handleReset}
      anchorRef={anchorRef}
    >
      <div className="flex flex-col gap-1.5">
        <TagSelectorHeader />
        <ul className="flex flex-col h-[300px] overflow-y-auto">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => {
              return <TagSelectorItem key={tag._id} tag={tag} />;
            })
          ) : search ? (
            <li>
              <Button
                variant={"ghost"}
                size={"full"}
                className={"h-8 px-2"}
                onClick={createNewTag}
              >
                <Plus size={16} className="text-gray/40 shrink-0 mr-1.5" />
                <span className="text-start flex-1 text-xs truncate">
                  Create Tag "{search}"
                </span>
              </Button>
            </li>
          ) : (
            <li className="w-full h-full flex items-center justify-center">
              No tags
            </li>
          )}
        </ul>
      </div>
      <TagSelectorFooter handleTagSubmit={handleTagSubmit} />
    </PopoverMenuContent>
  );
};

export { TagSelector, TagSelectorTrigger, TagSelectorContent };
