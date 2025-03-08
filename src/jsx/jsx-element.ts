import { __DEV__ } from "@/shared/constants";
import { validateChildKeys } from "@/shared/utils/validation";

/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */
export function jsxDEV(type, config, maybeKey, isStaticChildren, source, self) {
  return jsxDEVImpl(
    type,
    config,
    maybeKey,
    isStaticChildren,
    source,
    self,
    __DEV__ && Error("react-stack-top-frame"),
    __DEV__ && createTask(getTaskName(type))
  );
}

function jsxDEVImpl(
  type,
  config,
  maybeKey,
  isStaticChildren,
  source,
  self,
  debugStack,
  debugTask
) {
  if (__DEV__) {
    // We don't warn for invalid element type here because with owner stacks,
    // we error in the renderer. The renderer is the only one that knows what
    // types are valid for this particular renderer so we let it error there.

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing
    // errors. We don't want exception behavior to differ between dev and
    // prod. (Rendering will throw with a helpful message and as soon as the
    // type is fixed, the key warnings will appear.)
    // With owner stacks, we no longer need the type here so this comment is
    // no longer true. Which is why we can run this even for invalid types.
    const children = config.children;
    if (children !== undefined) {
      if (isStaticChildren) {
        if (isArray(children)) {
          for (let i = 0; i < children.length; i++) {
            validateChildKeys(children[i], type);
          }

          if (Object.freeze) {
            Object.freeze(children);
          }
        } else {
          console.error(
            "React.jsx: Static children should always be an array. " +
              "You are likely explicitly calling React.jsxs or React.jsxDEV. " +
              "Use the Babel transform instead."
          );
        }
      } else {
        validateChildKeys(children, type);
      }
    }

    // Warn about key spread regardless of whether the type is valid.
    if (hasOwnProperty.call(config, "key")) {
      const componentName = getComponentNameFromType(type);
      const keys = Object.keys(config).filter((k) => k !== "key");
      const beforeExample =
        keys.length > 0
          ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
          : "{key: someKey}";
      if (!didWarnAboutKeySpread[componentName + beforeExample]) {
        const afterExample =
          keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
        console.error(
          'A props object containing a "key" prop is being spread into JSX:\n' +
            "  let props = %s;\n" +
            "  <%s {...props} />\n" +
            "React keys must be passed directly to JSX without using spread:\n" +
            "  let props = %s;\n" +
            "  <%s key={someKey} {...props} />",
          beforeExample,
          componentName,
          afterExample,
          componentName
        );
        didWarnAboutKeySpread[componentName + beforeExample] = true;
      }
    }

    let key = null;

    // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.
    if (maybeKey !== undefined) {
      if (__DEV__) {
        checkKeyStringCoercion(maybeKey);
      }
      key = "" + maybeKey;
    }

    if (hasValidKey(config)) {
      if (__DEV__) {
        checkKeyStringCoercion(config.key);
      }
      key = "" + config.key;
    }

    let props;
    if (!("key" in config)) {
      // If key was not spread in, we can reuse the original props object. This
      // only works for `jsx`, not `createElement`, because `jsx` is a compiler
      // target and the compiler always passes a new object. For `createElement`,
      // we can't assume a new object is passed every time because it can be
      // called manually.
      //
      // Spreading key is a warning in dev. In a future release, we will not
      // remove a spread key from the props object. (But we'll still warn.) We'll
      // always pass the object straight through.
      props = config;
    } else {
      // We need to remove reserved props (key, prop, ref). Create a fresh props
      // object and copy over all the non-reserved props. We don't use `delete`
      // because in V8 it will deopt the object to dictionary mode.
      props = {};
      for (const propName in config) {
        // Skip over reserved prop names
        if (propName !== "key") {
          props[propName] = config[propName];
        }
      }
    }

    if (!disableDefaultPropsExceptForClasses) {
      // Resolve default props
      if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (const propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
    }

    if (key) {
      const displayName =
        typeof type === "function"
          ? type.displayName || type.name || "Unknown"
          : type;
      defineKeyPropWarningGetter(props, displayName);
    }

    return ReactElement(
      type,
      key,
      self,
      source,
      getOwner(),
      props,
      debugStack,
      debugTask
    );
  }
}
