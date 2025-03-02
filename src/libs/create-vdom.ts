import type { VNodeType, VNode } from "@/types/dom.type";

/**
 * createVDom
 * @description 실제 DOM을 받아서 vDom을 반환
 * @param realDom
 * @returns vDom
 */
export function createVNodeFromDOM(node: Node): VNode<VNodeType> {
  // node가 text node인지 확인
  if (node.nodeType === Node.TEXT_NODE) {
    const nodeValue = node.textContent || "";

    // 텍스트가 존재하지 않으면 null 반환
    // 단, 의도한 공백은 존재할수있으므로 공백 자체 제거는 x
    if (nodeValue.trim().length === 0) {
      return null;
    }

    return {
      props: { nodeValue },
      children: null,
    };
  }

  const element = node as HTMLElement;
  let props: Record<string, string> = {};

  for (const attr of Array.from(element.attributes)) {
    props[attr.name] = attr.value;
  }

  const childrenNodes = Array.from(element.childNodes)
    .map(createVNodeFromDOM)
    .filter((child): child is VNode<any> => child !== null);

  return {
    props,
    children: childrenNodes.length > 0 ? childrenNodes : null,
  };
}
