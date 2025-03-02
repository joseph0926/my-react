import { createVNodeFromDOM } from "@/libs/create-vdom";

const appElement = document.getElementById("app");

if (appElement) {
  const vdom = createVNodeFromDOM(appElement);
  console.log("생성된 VDOM:", vdom);
} else {
  console.error("DOM에서 app 요소를 찾지 못했습니다.");
}
