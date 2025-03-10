import { Key } from "./common";

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
