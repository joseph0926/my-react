import { describe, it, expect } from "vitest";
import { createElement } from "@/jsx/old-jsx-element";
import { REACT_ELEMENT_TYPE } from "@/shared/symbol/react.symbol";

describe("Old JSX Element 테스트", () => {
  it("JSX로 생성한 Element의 기본 props 확인", () => {
    const jsxElement = createElement("div", { id: "test-div" }, "Hello World");

    expect(jsxElement).toEqual({
      $$typeof: REACT_ELEMENT_TYPE,
      type: "div",
      key: null,
      ref: null,
      props: {
        id: "test-div",
        children: "Hello World",
      },
      _store: {},
    });
  });

  it("key와 ref가 props 바깥에 존재하는지 확인", () => {
    const myRef = { current: null };
    const jsxElement = createElement(
      "span",
      { key: "unique-key", ref: myRef, className: "test-span" },
      "Span Text"
    );

    expect(jsxElement.key).toBe("unique-key");
    expect(jsxElement.ref).toBe(myRef);
    expect(jsxElement.props).toEqual({
      className: "test-span",
      children: "Span Text",
    });
  });

  it("자식 요소가 여러 개인 경우 배열로 처리하는지 확인", () => {
    const jsxElement = createElement(
      "ul",
      { id: "list" },
      createElement("li", null, "Item 1"),
      createElement("li", null, "Item 2")
    );

    expect(Array.isArray(jsxElement.props.children)).toBe(true);
    expect(jsxElement.props.children).toHaveLength(2);
    expect(jsxElement.props.children[0].props.children).toBe("Item 1");
    expect(jsxElement.props.children[1].props.children).toBe("Item 2");
  });

  it("자식이 없는 경우 props에 children이 없는지 확인", () => {
    const jsxElement = createElement("div", { id: "no-child" });

    expect(jsxElement.props.children).toBeUndefined();
  });

  it("key가 없으면 null인지 확인", () => {
    const jsxElement = createElement("div", {});

    expect(jsxElement.key).toBeNull();
  });

  it("ref가 없으면 null인지 확인", () => {
    const jsxElement = createElement("div", {});

    expect(jsxElement.ref).toBeNull();
  });

  it("props가 빈 객체일 때 정확히 처리되는지 확인", () => {
    const jsxElement = createElement("div", {});

    expect(jsxElement.props).toEqual({});
  });

  it("key가 문자열로 강제 변환되는지 확인", () => {
    const jsxElement = createElement("div", { key: 123 });

    expect(jsxElement.key).toBe("123");
  });

  it("자식 배열이 불변인지 확인", () => {
    const jsxElement = createElement(
      "div",
      null,
      createElement("span", null, "Child 1"),
      createElement("span", null, "Child 2")
    );

    expect(Object.isFrozen(jsxElement.props.children)).toBe(true);
  });

  it("요소와 props 객체가 불변인지 확인", () => {
    const jsxElement = createElement("div", { className: "immutable" });

    expect(Object.isFrozen(jsxElement)).toBe(true);
    expect(Object.isFrozen(jsxElement.props)).toBe(true);
  });
});
