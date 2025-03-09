import type { ReactElement, ReactPortal } from "./element.interface";
import type { ReactNode as BaseReactNode } from "./common";

/**
 * ReactNode 타입
 */
export type ReactNode = BaseReactNode | ReactElement | ReactPortal;
