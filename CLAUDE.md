@AGENTS.md

## Design SSOT

- Storybook(`src/**/*.stories.tsx`)이 디자인 SSOT다.
- 모든 UI 작업은 Storybook 스토리에 있는 컴포넌트(`src/components/ui`)와 토큰(`src/app/globals.css`)을 재사용한다.
- 새 UI가 필요하면 먼저 컴포넌트와 스토리를 추가한 뒤 사용한다.
- 색상·타이포·간격은 하드코딩하지 않고 토큰만 쓴다.
