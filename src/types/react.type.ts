/**
 * 사용자가 정의한 함수형 컴포넌트를 나타냅니다.
 *
 * @template P 컴포넌트가 받을 수 있는 props의 타입입니다.
 */
type JSXElementConstructor<P> = (props: P) => ReactNode;

/**
 * JSX 요소를 나타냅니다.
 *
 * {@link ReactNode}가 렌더링 가능한 모든 요소를 나타내는 반면,
 * `ReactElement`는 JSX로 생성된 요소만을 나타냅니다.
 *
 * @template P props의 타입
 * @template T 컴포넌트 또는 태그의 타입
 *
 */
interface ReactElement<
  P = any,
  T extends keyof HTMLElementTagNameMap | JSXElementConstructor<any> =
    | keyof HTMLElementTagNameMap
    | JSXElementConstructor<any>
> {
  type: T;
  props: P;
  key: string | null;
}

/**
 * React가 렌더링 가능한 모든 타입을 나타냅니다.
 *
 * {@link ReactElement}가 JSX 요소만 나타내는 반면,
 * `ReactNode`는 렌더링 가능한 모든 요소를 나타냅니다.
 */
type ReactNode =
  | ReactElement
  | string
  | number
  | Iterable<ReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined;

/**
 * 포털을 나타내는 타입입니다.
 */
interface ReactPortal extends ReactElement {
  children: ReactNode;
}
