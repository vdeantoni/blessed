import React from "react";
import CodeSnippetCard from "../CodeSnippetCard";
import "./styles.css";

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
}

export interface CodeSnippetsCarouselProps {
  examples: CodeExample[];
  activeExampleId: string;
  onExampleClick: (id: string) => void;
}

export default function CodeSnippetsCarousel({
  examples,
  activeExampleId,
  onExampleClick,
}: CodeSnippetsCarouselProps) {
  return (
    <div className="code-snippets-carousel">
      <div className="carousel-container">
        {examples.map((example, index) => (
          <div
            key={example.id}
            className="carousel-slide"
          >
            <CodeSnippetCard
              id={example.id}
              title={example.title}
              description={example.description}
              code={example.code}
              isActive={activeExampleId === example.id}
              onClick={onExampleClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
