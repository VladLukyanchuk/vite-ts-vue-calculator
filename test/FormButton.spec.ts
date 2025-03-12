import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import FormButton from "../src/components/UI/FormButton.vue";

it("Render: type danger", () => {
  const dangerButtonClass = "button--danger";

  const wrapper = mount(FormButton, {
    props: { type: "danger" },
    slots: {
      default: "Label",
    },
  });

  expect(wrapper.text()).toContain("Label");
  expect(wrapper.classes()).toContain(dangerButtonClass);
});
