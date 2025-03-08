import { ReactElement, ReactElementType, ReactNode } from "@/types/react.type";
import { __DEV__ } from "../constants";
import { REACT_ELEMENT_TYPE } from "../symbol/react.symbol";

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node 자식 React 엘리먼트
 * @param {*} parentType 자식 React 엘리먼트의 부모 React 엘리먼트 태그
 */
export function validateChildKeys(
  node: ReactNode,
  _parentType: ReactElementType
) {
  if (__DEV__) {
    // With owner stacks is, no warnings happens. All we do is
    // mark elements as being in a valid static child position so they
    // don't need keys.
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
