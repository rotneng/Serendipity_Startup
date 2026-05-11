import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <input
        type="text"
        placeholder="Search for fresh produce (e.g. Corn)..."
        style={{
          flex: 1,
          padding: "12px 20px",
          borderRadius: "25px 0 0 25px",
          border: "2px solid #2e7d32",
          outline: "none",
        }}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        style={{
          padding: "0 20px",
          backgroundColor: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "0 25px 25px 0",
          cursor: "pointer",
        }}
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
};

export default Search;
