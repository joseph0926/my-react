/** HTML 요소 타입 */
export type ElementType = keyof HTMLElementTagNameMap;

/** 전체 노드 타입 (HTML 요소 + 텍스트 노드) */
export type VNodeType = ElementType | "TEXT_ELEMENT";

/** HTML 태그에 따른 속성 타입 */
export type ElementProps<T extends ElementType> = Partial<
  Omit<HTMLElementTagNameMap[T], "nodeValue">
>;

/** 텍스트 노드 전용 속성 타입 */
export type TextProps = { nodeValue: string };

/** VNode - 버츄얼 노드 타입 */
export type VNode<T extends VNodeType> =
  | (T extends "TEXT_ELEMENT"
      ? { type: "TEXT_ELEMENT"; props: TextProps; children: null }
      : {
          type: ElementType;
          props: ElementProps<Extract<T, ElementType>>;
          children: VNode<any>[] | null;
        })
  | null;
