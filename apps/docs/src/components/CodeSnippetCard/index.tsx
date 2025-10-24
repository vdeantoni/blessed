import React from "react";
import "./styles.css";

export interface CodeSnippetCardProps {
  id: string;
  title: string;
  description: string;
  code: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

export default function CodeSnippetCard({
  id,
  title,
  description,
  code,
  isActive,
  onClick,
}: CodeSnippetCardProps) {
  return (
    <div
      className={`snippet-card ${isActive ? "active" : ""}`}
      onClick={() => onClick(id)}
    >
      <div className="snippet-header">
        <h3>{title}</h3>
      </div>
      <p className="snippet-description">{description}</p>
      <div className="snippet-preview">
        <code>{code.split("\n").slice(0, 3).join("\n")}...</code>
      </div>
    </div>
  );
}
