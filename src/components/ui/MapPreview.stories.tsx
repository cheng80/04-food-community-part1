import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { MapPreview } from "./MapPreview";

const meta = {
  title: "UI/Map Preview",
  component: MapPreview,
  args: { className: "w-[320px]" },
} satisfies Meta<typeof MapPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 02 상세 · Kakao Map */
export const WithAddress: Story = {
  args: { address: "경기 광명시 광명로 123번길 8" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "경기 광명시 광명로 123번길 8 지도" })).toBeVisible();
  },
};

/** 03 등록 · Map Placeholder */
export const Empty: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("주소를 고르면 지도에 핀이 표시돼요")).toBeVisible();
  },
};
