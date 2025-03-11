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

/**
 * React의 key prop에 대한 타입을 정의합니다.
 * 주로 리스트 요소에서 고유성을 유지하기 위한 값으로 사용됩니다.
 */
export type Key = unknown | null;

/**
 * ReactElementStore
 * React 내부에서 사용하는 검증 관련 프로퍼티입니다.
 */
interface ReactElementStore {
  validated?: number;
  [key: string]: any;
}

/**
 * ReactElement 타입을 정의합니다.
 */
export interface ReactElement<
  P = any,
  T extends ReactElementType = ReactElementType
> {
  $$typeof: symbol;
  type: T;
  key: Key;
  ref?: RefObject<T>;
  props: P & { children?: ReactNode };
  _store?: ReactElementStore;
}

/**
 * JSX 컴포넌트를 나타내는 함수형 컴포넌트 타입 정의입니다.
 * JSX 컴포넌트는 props를 받아 ReactNode를 반환하는 함수로 정의됩니다.
 *
 * @template P - 컴포넌트가 받을 수 있는 props 타입
 */
export type JSXElementConstructor<P = any> = (props: P) => ReactElement | null;

/**
 * ReactElement의 type 프로퍼티로 사용할 수 있는 타입을 정의합니다.
 * - 문자열: HTML 태그 이름 (div, span 등)
 * - JSX 컴포넌트 (사용자 정의 함수형 컴포넌트)
 */
export type ReactElementType =
  | keyof HTMLElementTagNameMap
  | JSXElementConstructor<any>;

/**
 * ref 타입
 */
export interface RefObject<T> {
  readonly current: T | null;
}

/**
 * ReactNode 타입
 */
export type ReactNode =
  | string
  | number
  | boolean
  | null
  | undefined
  | ReactElement
  | ReactNode[]
  | Iterable<ReactNode>;
