"use client";

import { Input } from "@/components/ui/input";
import { NeftiesAttributes } from "@/models/Nefties";
import React, { useState, useEffect, useRef } from "react";

interface NeftieSelectorInputProps {
  availableTags: NeftiesAttributes[];
  value: NeftiesAttributes[] | []; // This will be the selected tags.
  onChange: (selectedTags: NeftiesAttributes[]) => void; // Callback function to pass the selected tags back to the parent form.
}
const NeftieSelectorInput: React.FC<NeftieSelectorInputProps> = ({
  availableTags,
  value,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") event.preventDefault();
      if (
        event.key === "Backspace" &&
        searchTerm === "" &&
        value.length > 0 &&
        document.activeElement === inputRef.current
      ) {
        event.stopPropagation();
        handleRemoveTag(value[value.length - 1].id);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchTerm, value]);

  const handleSelectTag = (tag: NeftiesAttributes) => {
    if (!value.find((t) => t.id === tag.id)) {
      onChange([...value, tag]); // Use the onChange prop to update the tags.
      setSearchTerm("");
    }
  };

  const handleRemoveTag = (tagId: number) => {
    onChange(value.filter((t) => t.id !== tagId)); // Use the onChange prop to update the tags.
  };

  const filteredTags = availableTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !value.some((selectedTag) => selectedTag.id === tag.id)
  );

  return (
    <div ref={wrapperRef} className="relative bg-background">
      <div className="flex flex-wrap items-center gap-2 p-1 pl-2 border rounded">
        {value.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-1 bg-muted px-4 py-1 rounded text-sm flex-wrap"
          >
            {tag.name}
            <button
              onClick={() => handleRemoveTag(tag.id)}
              className="bg-muted rounded-full px-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
        <Input
          ref={inputRef}
          type="text"
          className="flex-1 text-base outline-none border-0 rounded-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus:outline-none focus:ring-0 p-0 pl-2"
          placeholder="Type and Search Nefties.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          autoFocus={false}
        />
      </div>
      {isDropdownOpen && (
        <ul className="absolute left-0 bg-background right-0 mt-1 max-h-60 w-full overflow-auto border rounded shadow-lg z-[999999]">
          {filteredTags.map((tag) => (
            <li
              key={tag.id}
              className="px-4 py-2 hover:bg-muted cursor-pointer"
              onClick={() => handleSelectTag(tag)}
            >
              <strong>{tag.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NeftieSelectorInput;
