/**
 * React의 key prop에 대한 타입을 정의합니다.
 * 주로 리스트 요소에서 고유성을 유지하기 위한 값으로 사용됩니다.
 */
export type Key = string | null;

/**
 * JSX 컴포넌트를 나타내는 함수형 컴포넌트 타입 정의입니다.
 * JSX 컴포넌트는 props를 받아 ReactNode를 반환하는 함수로 정의됩니다.
 *
 * @template P - 컴포넌트가 받을 수 있는 props 타입
 */
type JSXElementConstructor<P> = (props: P) => ReactNode;

/**
 * ReactElement의 type 프로퍼티로 사용할 수 있는 타입을 정의합니다.
 * - 문자열: HTML 태그 이름 (div, span 등)
 * - JSX 컴포넌트 (사용자 정의 함수형 컴포넌트)
 */
export type ReactElementType =
  | keyof HTMLElementTagNameMap
  | JSXElementConstructor<any>;

/**
 * ReactNode는 순환 참조를 막기 위해 별도 선언
 */
export type ReactNode =
  | string
  | number
  | boolean
  | null
  | undefined
  | Iterable<ReactNode>
  | { type: ReactElementType; props: any; key: Key; [prop: string]: any };

/**
 * A readonly ref container where {@link current} cannot be mutated.
 *
 * Created by {@link createRef}, or {@link useRef} when passed `null`.
 *
 * @template T The type of the ref's value.
 *
 * @example
 *
 * ```tsx
 * const ref = createRef<HTMLDivElement>();
 *
 * ref.current = document.createElement('div'); // Error
 * ```
 */
export interface RefObject<T> {
  readonly current: T | null;
}
