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
