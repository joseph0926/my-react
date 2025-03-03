import { describe, it, expect } from "vitest";
import { createVNodeFromDOM } from "@/libs/create-vdom";
import type { VNode } from "@/types/dom.type";

describe("createVNodeFromDOM - 복잡한 DOM 구조", () => {
  it("중첩 구조가 깊은 DOM을 올바르게 처리해야 합니다", () => {
    document.body.innerHTML = `
      <div id="app">
        <ul class="list">
          <li>
            Item 1
            <ul>
              <li>Nested Item 1-1</li>
              <li>Nested Item 1-2</li>
            </ul>
          </li>
          <li>Item 2</li>
        </ul>
      </div>
    `;

    const appElement = document.getElementById("app")!;
    const vdom = createVNodeFromDOM(appElement);

    const expectedVDOM: VNode<any> = {
      type: "div",
      props: { id: "app" },
      children: [
        {
          type: "ul",
          props: { class: "list" },
          children: [
            {
              type: "li",
              props: {},
              children: [
                {
                  type: "TEXT_ELEMENT",
                  props: { nodeValue: "\n            Item 1\n            " },
                  children: null,
                },
                {
                  type: "ul",
                  props: {},
                  children: [
                    {
                      type: "li",
                      props: {},
                      children: [
                        {
                          type: "TEXT_ELEMENT",
                          props: { nodeValue: "Nested Item 1-1" },
                          children: null,
                        },
                      ],
                    },
                    {
                      type: "li",
                      props: {},
                      children: [
                        {
                          type: "TEXT_ELEMENT",
                          props: { nodeValue: "Nested Item 1-2" },
                          children: null,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "li",
              props: {},
              children: [
                {
                  type: "TEXT_ELEMENT",
                  props: { nodeValue: "Item 2" },
                  children: null,
                },
              ],
            },
          ],
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });

  it("여러 가지 속성을 가진 요소를 올바르게 처리해야 합니다", () => {
    document.body.innerHTML = `
      <a href="https://example.com" target="_blank" data-custom="customValue">
        Link Text
      </a>
    `;

    const aElement = document.querySelector("a")!;
    const vdom = createVNodeFromDOM(aElement);

    const expectedVDOM: VNode<any> = {
      type: "a",
      props: {
        href: "https://example.com",
        target: "_blank",
        "data-custom": "customValue",
      },
      children: [
        {
          type: "TEXT_ELEMENT",
          props: { nodeValue: "\n        Link Text\n      " },
          children: null,
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });

  it("빈 요소(Self-closing tag)를 올바르게 처리해야 합니다", () => {
    document.body.innerHTML = `
      <div>
        <img src="image.png" alt="image" />
        <input type="text" placeholder="입력해주세요." />
      </div>
    `;

    const divElement = document.querySelector("div")!;
    const vdom = createVNodeFromDOM(divElement);

    const expectedVDOM: VNode<any> = {
      type: "div",
      props: {},
      children: [
        {
          type: "img",
          props: { src: "image.png", alt: "image" },
          children: null,
        },
        {
          type: "input",
          props: { type: "text", placeholder: "입력해주세요." },
          children: null,
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });

  it("텍스트 노드와 요소가 섞인 경우를 처리해야 합니다", () => {
    document.body.innerHTML = `
      <p>
        텍스트 노드 시작
        <span>중간 요소</span>
        텍스트 노드 끝
      </p>
    `;

    const pElement = document.querySelector("p")!;
    const vdom = createVNodeFromDOM(pElement);

    const expectedVDOM: VNode<any> = {
      type: "p",
      props: {},
      children: [
        {
          type: "TEXT_ELEMENT",
          props: { nodeValue: "\n        텍스트 노드 시작\n        " },
          children: null,
        },
        {
          type: "span",
          props: {},
          children: [
            {
              type: "TEXT_ELEMENT",
              props: { nodeValue: "중간 요소" },
              children: null,
            },
          ],
        },
        {
          type: "TEXT_ELEMENT",
          props: { nodeValue: "\n        텍스트 노드 끝\n      " },
          children: null,
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });
});
