import { describe, it, expect } from "vitest";
import { createVNodeFromDOM } from "@/libs/create-vdom";
import type { VNode } from "@/types/dom.type";

describe("createVNodeFromDOM - Edge Cases", () => {
  it("주석(Comment Node)을 무시해야 합니다", () => {
    document.body.innerHTML = `
      <div>
        <!-- 이 주석은 무시되어야 합니다 -->
        텍스트
      </div>
    `;

    const divElement = document.querySelector("div")!;
    const vdom = createVNodeFromDOM(divElement);

    const expectedVDOM: VNode<any> = {
      type: "div",
      props: {},
      children: [
        {
          type: "TEXT_ELEMENT",
          props: { nodeValue: "\n        텍스트\n      " },
          children: null,
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });

  it("특수 속성(style, dataset)을 올바르게 처리해야 합니다", () => {
    document.body.innerHTML = `
      <div style="color:red; font-size:16px;" data-value="123">
        특수 속성
      </div>
    `;

    const divElement = document.querySelector("div")!;
    const vdom = createVNodeFromDOM(divElement);

    const expectedVDOM: VNode<any> = {
      type: "div",
      props: { style: "color:red; font-size:16px;", "data-value": "123" },
      children: [
        {
          type: "TEXT_ELEMENT",
          props: { nodeValue: "\n        특수 속성\n      " },
          children: null,
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });

  it("script, style 태그 내부 내용을 텍스트 노드로 처리해야 합니다", () => {
    document.body.innerHTML = `
      <div>
        <script>console.log('test');</script>
        <style>.test{color:blue;}</style>
      </div>
    `;

    const divElement = document.querySelector("div")!;
    const vdom = createVNodeFromDOM(divElement);

    const expectedVDOM: VNode<any> = {
      type: "div",
      props: {},
      children: [
        {
          type: "script",
          props: {},
          children: [
            {
              type: "TEXT_ELEMENT",
              props: { nodeValue: "console.log('test');" },
              children: null,
            },
          ],
        },
        {
          type: "style",
          props: {},
          children: [
            {
              type: "TEXT_ELEMENT",
              props: { nodeValue: ".test{color:blue;}" },
              children: null,
            },
          ],
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });

  it("HTML 엔티티(&nbsp;, &lt;, &gt;)를 올바르게 처리해야 합니다", () => {
    document.body.innerHTML = `
      <div>&lt;span&gt;Hello&nbsp;World&lt;/span&gt;</div>
    `;

    const divElement = document.querySelector("div")!;
    const vdom = createVNodeFromDOM(divElement);

    const expectedVDOM: VNode<any> = {
      type: "div",
      props: {},
      children: [
        {
          type: "TEXT_ELEMENT",
          props: { nodeValue: "<span>Hello World</span>" },
          children: null,
        },
      ],
    };

    expect(vdom).toEqual(expectedVDOM);
  });

  it("비정상적인 속성 값(숫자, boolean 등)을 문자열로 처리해야 합니다", () => {
    document.body.innerHTML = `
      <input type="checkbox" checked data-number="42" data-boolean="true"/>
    `;

    const inputElement = document.querySelector("input")!;
    const vdom = createVNodeFromDOM(inputElement);

    const expectedVDOM: VNode<any> = {
      type: "input",
      props: {
        type: "checkbox",
        checked: "",
        "data-number": "42",
        "data-boolean": "true",
      },
      children: null,
    };

    expect(vdom).toEqual(expectedVDOM);
  });
});
