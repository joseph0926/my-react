// 해당 파일은 react 17이전에 사용하던 JSX 생성방식입니다.

import { __DEV__ } from "@/shared/constants";
import { validateChildKeys } from "@/shared/utils/validation";
import { ReactElementType, ReactNode } from "@/types/react.type";

export function createElement(
  type: ReactElementType,
  config,
  children: ReactNode
) {
  if (__DEV__) {
    // arguments[2]부터는 자식 컴포넌트 (1 => type, 2 => config)
    // 따라서 자식 요소를 모두 순회하면서 key 검증을 수행함
    for (let i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  let propName;
  const props = {};

  let key = null;

  if (config != null) {
    if (__DEV__) {
      if (
        !didWarnAboutOldJSXRuntime &&
        "__self" in config &&
        !("key" in config)
      ) {
        didWarnAboutOldJSXRuntime = true;
        console.warn(
          "Your app (or one of its dependencies) is using an outdated JSX " +
            "transform. Update to the modern JSX transform for " +
            "faster performance: https://react.dev/link/new-jsx-transform"
        );
      }
    }

    if (hasValidKey(config)) {
      if (__DEV__) {
        checkKeyStringCoercion(config.key);
      }
      key = "" + config.key;
    }

    // Remaining properties are added to a new props object
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        // Skip over reserved prop names
        propName !== "key" &&
        // Even though we don't use these anymore in the runtime, we don't want
        // them to appear as props, so in createElement we filter them out.
        // We don't have to do this in the jsx() runtime because the jsx()
        // transform never passed these as props; it used separate arguments.
        propName !== "__self" &&
        propName !== "__source"
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (__DEV__) {
    if (key) {
      const displayName =
        typeof type === "function"
          ? type.displayName || type.name || "Unknown"
          : type;
      defineKeyPropWarningGetter(props, displayName);
    }
  }

  return ReactElement(
    type,
    key,
    undefined,
    undefined,
    getOwner(),
    props,
    __DEV__ && Error("react-stack-top-frame"),
    __DEV__ && createTask(getTaskName(type))
  );
}
