import { REACT_ELEMENT_TYPE } from "@/shared/symbol/react.symbol";
import { Key, ReactElementType } from "@/types/common";
import { ReactElement } from "@/types/element.interface";

/**
 * ReactElement
 * @description 리액트 엘리먼트를 생성하는 팩토리 메서드
 * @param type
 * @param key
 * @param props
 */
export function ReactElement(
  type: ReactElementType,
  key: Key,
  props: { [propName: string]: any }
) {
  const ref = props.ref;
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
