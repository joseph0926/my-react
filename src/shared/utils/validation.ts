import { Config } from "@/types/common";
import { __DEV__ } from "../constants";
import { REACT_ELEMENT_TYPE } from "../symbol/react.symbol";
import type {
  ReactElement,
  ReactElementType,
  ReactNode,
} from "@/types/react.type";

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
    // 인자로 받은 자식 element가 React Element인지 확인
    if (isValidElement(node)) {
      // React Element에 내부 디버깅용 `_store`가 존재하는지 확인
      if (node._store) {
        // 기본으로 `_store`에 검증됨을 명시
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

/**
 * hasValidKey
 * @description config 객체에 올바른 key가 설정되어 있는지 검사하는 함수
 * @param config
 * @returns `true` | `false`
 */
export function hasValidKey(config: Config) {
  // key가 undefined면 false, 값이 있으면 true
  return config.key !== undefined;
}

/**
 * checkKeyStringCoercion
 * @description key로 전달된 값이 문자열로 강제 변환(string coercion) 가능한 값인지 검사하는 함수
 * @param keyValue key 속성에 전달된 값
 * @returns
 * @example 1 => "1" 가능 / {{}} => "{{}}" 불가능
 */
export function checkKeyStringCoercion(keyValue: unknown) {
  const type = typeof keyValue;

  if (keyValue === null || keyValue === undefined) {
    console.error(`key 값으로 null 또는 undefined는 허용되지 않습니다.`);
    throw new Error("Invalid key type");
  }

  // 객체 타입 체크
  if (type === "object") {
    const displayType = Array.isArray(keyValue) ? "Array" : "Object";
    console.error(`key 값으로 ${displayType} 타입은 허용되지 않습니다.`);
    throw new Error(`Invalid key type: ${displayType}`);
  }

  // symbol, function 체크
  if (type === "symbol" || type === "function") {
    console.error(`key 값으로 ${type} 타입은 허용되지 않습니다.`);
    throw new Error(`Invalid key type: ${type}`);
  }

  try {
    // keyValue를 문자열로 변환 시도
    return "" + keyValue;
  } catch (error) {
    // 실패시 에러 던짐
    console.error(`key 값을 문자열로 변환할 수 없습니다:`, error);
    throw error;
  }
}
