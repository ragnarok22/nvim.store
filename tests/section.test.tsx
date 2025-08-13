import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import Section from "../components/section";

describe("Section", () => {
  it("renders children", () => {
    const html = renderToStaticMarkup(
      <Section>
        <span>Content</span>
      </Section>
    );
    expect(html).toBe("<section class=\"border rounded-sm p-3\"><span>Content</span></section>");
  });

  it("applies custom class", () => {
    const html = renderToStaticMarkup(
      <Section className="extra">
        <span>Child</span>
      </Section>
    );
    expect(html).toBe(
      "<section class=\"border rounded-sm p-3 extra\"><span>Child</span></section>"
    );
  });
});
