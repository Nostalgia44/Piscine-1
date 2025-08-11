// src/pages/KnowledgeBase.jsx
import React from "react";
import { folders, files } from "../data/mockData";
import Sidebar from "../components/Sidebar";
import FolderCard from "../components/FolderCard";
import FileList from "../components/FileList";

function KnowledgeBase() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar folders={folders} />

      {/* Main content */}
      <div style={{ flex: 1, padding: "1rem" }}>
        <h2>Folders</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          {folders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>

        <h2 style={{ marginTop: "2rem" }}>Files</h2>
        <FileList files={files} />
      </div>
    </div>
  );
}

export default KnowledgeBase;
