import type { VNodeType, VNode, ElementType } from "@/types/dom.type";

/**
 * createVDom
 * @description 실제 DOM을 받아서 vDom을 반환
 * @param realDom
 * @returns vDom
 */
export function createVNodeFromDOM(node: Node): VNode<VNodeType> {
  switch (node.nodeType) {
    case Node.TEXT_NODE: {
      const nodeValue = node.textContent || "";
      if (nodeValue.trim().length === 0) {
        return null;
      }
      return {
        type: "TEXT_ELEMENT",
        props: { nodeValue },
        children: null,
      };
    }

    case Node.ELEMENT_NODE: {
      const element = node as HTMLElement;
      const type = element.tagName.toLowerCase() as ElementType;
      let props: Record<string, string> = {};

      for (const attr of Array.from(element.attributes)) {
        props[attr.name] = attr.value;
      }

      const childrenNodes = Array.from(element.childNodes)
        .map(createVNodeFromDOM)
        .filter((child): child is VNode<any> => child !== null);

      return {
        type,
        props,
        children: childrenNodes.length > 0 ? childrenNodes : null,
      };
    }

    default:
      return null;
  }
}
