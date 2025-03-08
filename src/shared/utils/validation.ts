import { ReactElement, ReactElementType, ReactNode } from "@/types/react.type";
import { __DEV__ } from "../constants";
import { REACT_ELEMENT_TYPE } from "../symbol/react.symbol";

/**
 * validateChildKeys
 *
 * @description 자식 컴포넌트가 키에 대한 유효성 검사 체크하는 함수
 * @param {ReactNode} node 자식 React 엘리먼트
 * @param {ReactElementType} _parentType 자식 React 엘리먼트의 부모 React 엘리먼트 태그
 */
export function validateChildKeys(
  node: ReactNode,
  _parentType: ReactElementType
) {
  if (__DEV__) {
    // default가 validated된 상태 - 동적인 엘리먼트가 아니라면 key가 없어도 무방
    if (isValidElement(node)) {
      if (node._store) {
        node._store.validated = 1;
      }
    }
  }
}

/**
 * isValidElement
 * @description object가 React 엘리먼트인지 검증하는 함수
 * @param {?object} object
 * @return {boolean} object가 React 엘리먼트라면 true 반환
 */
export function isValidElement(object: any): object is ReactElement {
  return (
    typeof object === "object" &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
