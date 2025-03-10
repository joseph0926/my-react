import { REACT_ELEMENT_TYPE } from "@/shared/symbol/react.symbol";
import type { Key } from "@/types/common";
import type {
  ReactElementType,
  RefObject,
  ReactElement,
} from "@/types/react.type";

/**
 * ReactElement
 * @description 리액트 엘리먼트를 생성하는 팩토리 메서드
 * @param type
 * @param key
 * @param ref
 * @param props
 */
export function ReactElement(
  type: ReactElementType,
  key: Key,
  ref: RefObject<any>,
  props: { [propName: string]: any }
) {
  let element: ReactElement;

  element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  };

  element._store = {};
  Object.defineProperty(element._store, "validated", {
    configurable: false,
    enumerable: false,
    writable: true,
    value: 0,
  });
  if (Object.freeze) {
    Object.freeze(element.props);
    Object.freeze(element);
  }

  return element;
}
