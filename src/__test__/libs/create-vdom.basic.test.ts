import { describe, it, expect } from "vitest";
import { createVNodeFromDOM } from "@/libs/create-vdom";
import type { VNode } from "@/types/dom.type";

describe("createVNodeFromDOM", () => {
  it("DOM 요소를 올바른 VDOM으로 변환해야 합니다", () => {
    document.body.innerHTML = `
      <div id="app">
        <h1 class="title">Hello Virtual DOM</h1>
        <button onclick="alert('Clicked')">Click Me!</button>
      </div>
    `;

    const appElement = document.getElementById("app")!;
    const vdom = createVNodeFromDOM(appElement);

    const expectedVDOM: VNode<any> = {
      type: "div",
      props: { id: "app" },
      children: [
        {
          type: "h1",
          props: { class: "title" },
          children: [
            {
              type: "TEXT_ELEMENT",
              props: { nodeValue: "Hello Virtual DOM" },
              children: null,
            },
          ],
        },
        {
          type: "button",
          props: { onclick: "alert('Clicked')" },
          children: [
            {
              type: "TEXT_ELEMENT",
              props: { nodeValue: "Click Me!" },
              children: null,
            },
          ],
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });

  it("빈 텍스트 노드를 무시해야 합니다", () => {
    document.body.innerHTML = `
      <div id="app">
        <span>    </span>
        텍스트
      </div>
    `;

    const appElement = document.getElementById("app")!;
    const vdom = createVNodeFromDOM(appElement);

    const expectedVDOM: VNode<any> = {
      type: "div",
      props: { id: "app" },
      children: [
        {
          type: "span",
          props: {},
          children: null,
        },
        {
          type: "TEXT_ELEMENT",
          props: { nodeValue: "\n        텍스트\n      " },
          children: null,
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });

  it("속성이 없는 요소를 처리할 수 있어야 합니다", () => {
    document.body.innerHTML = `<div><p>Test</p></div>`;

    const divElement = document.querySelector("div")!;
    const vdom = createVNodeFromDOM(divElement);

    const expectedVDOM: VNode<any> = {
      type: "div",
      props: {},
      children: [
        {
          type: "p",
          props: {},
          children: [
            {
              type: "TEXT_ELEMENT",
              props: { nodeValue: "Test" },
              children: null,
            },
          ],
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });
});
