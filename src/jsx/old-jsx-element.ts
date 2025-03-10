// 해당 파일은 react 17이전에 사용하던 JSX 생성방식입니다.

import { ReactElement } from "@/libs/react-element";
import { __DEV__ } from "@/shared/constants";
import {
  checkKeyStringCoercion,
  hasValidKey,
  validateChildKeys,
} from "@/shared/utils/validation";
import type { Key, Config } from "@/types/common";
import type { ReactElementType, ReactNode } from "@/types/react.type";

/**
 * createElement
 * @description react v17 이전에 react element를 만드는 함수입니다.
 * @param type
 * @param config
 * @param children
 * @returns `ReactElement`
 */
export function createElement(
  type: ReactElementType,
  config: Config | null,
  ..._children: ReactNode[]
) {
  // arguments[2]부터는 자식 컴포넌트 (0 => type, 1 => config)
  // 따라서 자식 요소를 모두 순회하면서 key 검증을 수행함
  for (let i = 2; i < arguments.length; i++) {
    // 각 자식 컴포넌트의 `_store`에 검증됨을 명시
    validateChildKeys(arguments[i], type);
  }

  let propName: string;
  let key: Key = null;
  let ref = null;
  const props: { [propName: string]: any } = {};

  // config가 존재하면
  if (config !== null) {
    // config 객체에 올바른 key가 설정되어 있는지 검사
    if (hasValidKey(config)) {
      key = checkKeyStringCoercion(config.key);
    }
    if (config.ref !== undefined) {
      ref = config.ref;
    }

    // 속성들중에 예약를 제외하고 props 객체로 할당
    for (propName in config) {
      if (
        Object.hasOwn(config, propName) &&
        propName !== "key" &&
        propName !== "ref"
      ) {
        props[propName] = config[propName];
      }
    }
  }

  /*
    JSX를 통해 전달된 children가 몇 개인지에 따라 다르게 처리
    - 없으면 → props.children이 x
    - 1개면 → 자식을 그대로 할당 (props.children = child)
    - 2개 이상이면 → 배열로 묶어서 처리 (props.children = [child1, child2, ...])
  */
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = arguments[2];
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    // 실수나 의도적으로 chidlren[]을 조작하지 못하게 처리
    if (Object.freeze) {
      Object.freeze(childArray);
    }
    props.children = childArray;
  }

  // 컴포넌트에 정의된 기본 속성값(defaultProps) 을 props에 적용
  // 다만 최신에 와서는 defaultProps는 처리 안하므로 여기선 무시
  // if (type && type.defaultProps) {
  //   const defaultProps = type.defaultProps;
  //   for (propName in defaultProps) {
  //     if (props[propName] === undefined) {
  //       props[propName] = defaultProps[propName];
  //     }
  //   }
  // }

  return ReactElement(type, key, ref, props);
}
