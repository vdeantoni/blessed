import React from "react";
import useEmblaCarousel from "embla-carousel-react";
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
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="code-snippets-carousel">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {examples.map((example, index) => (
            <div
              key={example.id}
              className="embla__slide"
              style={{ animationDelay: `${index * 0.1}s` }}
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
    </div>
  );
}
