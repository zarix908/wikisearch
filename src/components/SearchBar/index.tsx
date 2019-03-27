import React from "react";
import styles from "./styles.css";
import { SearchRaw } from "../SearchRaw";

export function SearchBar({ onSearch }: { onSearch: (str: string) => void }) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.logo}>Wiki</div>
      <SearchRaw onSearch={onSearch} />
    </div>
  );
}
