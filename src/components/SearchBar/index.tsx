import React from "react";
import SearchRaw from "../SearchRaw";
import "./styles.css";

export function SearchBar({ onSearch }: { onSearch: (str: string) => void }) {
  return (
    <div className="searchBar">
      <div className="logo">Wiki</div>
      <SearchRaw onSearch={onSearch} />
    </div>
  );
}
