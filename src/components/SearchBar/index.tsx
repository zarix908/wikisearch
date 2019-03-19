import React from "react";
import "./styles.css";
import { SearchRaw } from "../SearchRaw";

export function SearchBar({ onSearch }: { onSearch: (str: string) => void }) {
  return (
    <div className="searchBar">
      <div className="logo">Wiki</div>
      <SearchRaw onSearch={onSearch} />
    </div>
  );
}
