import type { ReactElementType, Key, ReactNode } from "./common";

/**
 * React 내부에서만 사용하는 프로퍼티 (_store)를 정의한 인터페이스입니다.
 * 주로 개발 환경에서 요소의 상태 검증을 위한 용도로 사용됩니다.
 */
interface ReactElementStore {
  /**
   * 요소의 검증 상태를 나타내는 값 (주로 개발용)
   */
  validated?: number;

  /**
   * 그 외 추가적으로 필요한 프로퍼티를 정의할 수 있는 인덱스 시그니처
   */
  [key: string]: any;
}

/**
 * JSX에서 생성되는 요소를 나타내는 ReactElement의 타입입니다.
 * type, props, key, 그리고 내부적으로만 사용하는 _store 프로퍼티로 구성됩니다.
 *
 * @template P - props 타입
 * @template T - HTML 태그명 또는 JSX 함수형 컴포넌트 타입
 */
export interface ReactElement<
  P = any,
  T extends ReactElementType = ReactElementType
> {
  /**
   * 요소의 타입으로 HTML 태그명 또는 JSX 컴포넌트입니다.
   */
  type: T;

  /**
   * 컴포넌트가 전달받는 props 객체입니다.
   */
  props: P;

  /**
   * 리스트 렌더링 시 요소를 구분하기 위한 React의 특별한 prop입니다.
   */
  key: Key;

  /**
   * 내부적으로만 사용하는 프로퍼티로 개발 환경에서 요소의 상태 관리 용도로 쓰입니다.
   */
  _store?: ReactElementStore;
}

/**
 * React 포털(portal)을 나타내는 인터페이스입니다.
 * 포털은 요소를 DOM 트리 외부의 다른 DOM 노드로 렌더링할 때 사용됩니다.
 */
export interface ReactPortal extends ReactElement {
  /**
   * 포털이 렌더링할 자식 요소입니다.
   */
  children: ReactNode;
}

/**
 * JSX 요소를 생성할 때 사용되는 config 객체의 타입입니다.
 * key는 선택적이며 그 외 자유롭게 추가적인 props를 포함할 수 있습니다.
 */
export interface Config {
  /**
   * 리스트 렌더링 시 고유한 요소를 식별하는 선택적인 key 값
   */
  key?: Key;

  /**
   * 그 외 컴포넌트에 전달될 추가적인 props를 포함합니다.
   */
  [propName: string]: any;
}
