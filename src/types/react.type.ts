/**
 * Represents any user-defined component, either as a function or a class.
 *
 * Similar to {@link ComponentType}, but without extra properties like
 * {@link FunctionComponent.defaultProps defaultProps } and
 * {@link ComponentClass.contextTypes contextTypes}.
 *
 * @template P The props the component accepts.
 */
type JSXElementConstructor<P> =
  | ((
      props: P,
      /**
       * @deprecated
       *
       * @see {@link https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-stateless-function-components React Docs}
       */
      deprecatedLegacyContext?: any
    ) => ReactNode)
  | (new (
      props: P,
      /**
       * @deprecated
       *
       * @see {@link https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods React Docs}
       */
      deprecatedLegacyContext?: any
    ) => Component<any, any>);

/**
 * Represents a JSX element.
 *
 * Where {@link ReactNode} represents everything that can be rendered, `ReactElement`
 * only represents JSX.
 *
 * @template P The type of the props object
 * @template T The type of the component or tag
 *
 * @example
 *
 * ```tsx
 * const element: ReactElement = <div />;
 * ```
 */
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T;
  props: P;
  key: string | null;
}

/**
 * Represents all of the things React can render.
 *
 * Where {@link ReactElement} only represents JSX, `ReactNode` represents everything that can be rendered.
 *
 * @see {@link https://react-typescript-cheatsheet.netlify.app/docs/react-types/reactnode/ React TypeScript Cheatsheet}
 *
 * @example
 *
 * ```tsx
 * // Typing children
 * type Props = { children: ReactNode }
 *
 * const Component = ({ children }: Props) => <div>{children}</div>
 *
 * <Component>hello</Component>
 * ```
 *
 * @example
 *
 * ```tsx
 * // Typing a custom element
 * type Props = { customElement: ReactNode }
 *
 * const Component = ({ customElement }: Props) => <div>{customElement}</div>
 *
 * <Component customElement={<div>hello</div>} />
 * ```
 */
// non-thenables need to be kept in sync with AwaitedReactNode
type ReactNode =
  | ReactElement
  | string
  | number
  | Iterable<ReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined
  | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES];
