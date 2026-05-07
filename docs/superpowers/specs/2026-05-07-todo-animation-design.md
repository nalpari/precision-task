# Todo Animation Design

## 배경

현재 todo 앱은 검정 캔버스, full-bleed hero 이미지, hairline, 넓은 letter-spacing을 중심으로 한 절제된 프리미엄 톤을 갖고 있다. 사용자는 화면이 지나치게 정적으로 느껴진다고 피드백했고, hero 섹션, 홈 좌측 todo 카운트 영역, active 페이지 상단 차트에 애니메이션을 적용하는 방향을 검토했다.

선택한 방향은 "정제된 계기판"이다. 기본 움직임은 조용한 진입과 데이터 시각화 reveal에 집중하고, hover/focus 시 미세한 hairline 밝기 변화만 추가한다.

## 목표

- 첫 진입 시 화면이 살아나는 느낌을 주되 반복 사용 피로를 만들지 않는다.
- todo 앱의 핵심 작업인 추가, 수정, 완료, 삭제, 드래그 정렬의 반응성을 해치지 않는다.
- 외부 애니메이션 라이브러리나 차트 라이브러리를 추가하지 않는다.
- `prefers-reduced-motion` 사용자는 즉시 표시되는 정적인 UI를 본다.

## 비목표

- hero parallax, glow sweep, 반복 루프 애니메이션은 넣지 않는다.
- todo item 자체, DnD 정렬 동작, 인라인 편집 입력에는 새 애니메이션을 넣지 않는다.
- 색상 팔레트나 디자인 시스템을 바꾸지 않는다.
- DB, Supabase, Server Action 동작은 변경하지 않는다.

## 적용 범위

### 홈 hero

`TodoListClient`의 hero 영역에 진입 애니메이션 클래스를 추가한다.

- eyebrow, h1, 설명 문장, `TodoInput`이 80-140ms 간격으로 순차 등장한다.
- 움직임은 `opacity`와 작은 `translateY`만 사용한다.
- hero 배경 이미지는 고정한다. parallax나 scale 애니메이션은 사용하지 않는다.

### 홈 좌측 카운트

`SpecCell`에 계기판식 reveal을 추가한다.

- 셀은 위에서 아래로 짧게 순차 등장한다.
- 상단/bottom hairline은 밝기가 미세하게 살아난다.
- 숫자는 과한 rolling counter 대신 표시 안정성을 유지한다.
- completion 값은 별도 카운트업이 필요하면 후속 작업으로 분리한다.

### Active 상단 차트

`src/app/_components/dashboard/Charts.tsx`의 자체 SVG/막대 구현 안에서 처리한다.

- `CompletionRing`은 stroke dash가 목표 비율까지 그려진다.
- `WeeklyActivity` 막대는 0에서 계산된 높이까지 올라온다.
- `AgeBuckets` 막대는 0에서 계산된 너비까지 확장된다.
- hover/focus 시 chart hairline 또는 활성 막대가 아주 살짝 밝아진다.

## 아키텍처

공통 모션 토큰과 keyframes는 `src/app/globals.css`에 둔다.

- `--motion-fast`, `--motion-medium`, `--motion-ease-out` 같은 CSS custom property를 정의한다.
- `@keyframes rise-in`, `@keyframes line-reveal`, `@keyframes chart-grow-y`, `@keyframes ring-grow`처럼 작고 범용적인 keyframe만 추가한다.
- `@media (prefers-reduced-motion: reduce)`에서 animation과 transition을 제거한다.

컴포넌트 변경은 className 추가 중심으로 제한한다.

- `TodoListClient.tsx`: hero 자식 요소와 `SpecCell`에 모션 class 및 delay style을 부여한다.
- `ActiveDashboardClient.tsx`: 상단 heading 및 chart grid에 진입 class를 부여한다.
- `Charts.tsx`: SVG ring, weekly bar, age bar에 chart 전용 class를 부여한다.

## 데이터 흐름

todo 데이터 흐름은 유지한다.

- `useOptimistic` reducer와 Server Action 호출 방식은 변경하지 않는다.
- 차트 계산 결과인 `weekly`, `ageBuckets`, `counts`를 그대로 사용한다.
- hydration mismatch 회피를 위해 이미 존재하는 `isClient` 가드 구조를 변경하지 않는다.

CSS animation은 렌더링된 값의 표시 방식만 바꾼다. 데이터 계산, 필터링, 정렬, revalidation에는 관여하지 않는다.

## 접근성

- `prefers-reduced-motion: reduce`에서는 모든 진입/차트 애니메이션이 비활성화된다.
- 애니메이션은 의미 정보를 전달하는 유일한 수단이 되지 않는다.
- focus ring, 버튼 상태, 입력 가능 여부는 기존 접근성 상태를 유지한다.
- hover 효과는 pointer 사용자의 보조 피드백으로만 취급한다.

## 에러 처리

이 작업은 서버 통신이나 데이터 변경을 포함하지 않는다. 따라서 신규 런타임 에러 경로는 만들지 않는다.

잠재 리스크는 hydration과 layout shift다.

- SSR과 클라이언트 렌더 결과가 달라지지 않도록 CSS class 중심으로 구현한다.
- 차트 막대 컨테이너의 높이와 너비는 기존 고정 치수를 유지한다.
- 숫자 표시 영역은 content 변화로 크기가 흔들리지 않게 기존 typography와 layout을 유지한다.

## 테스트 계획

- `pnpm lint`로 정적 검사를 실행한다.
- 가능하면 `pnpm build`로 Next.js 16 빌드 검증을 실행한다.
- 로컬 dev 서버에서 `/`와 `/active`를 확인한다.
- 브라우저에서 desktop/mobile viewport를 확인해 텍스트 겹침, chart blank, layout shift가 없는지 본다.
- `prefers-reduced-motion`은 CSS rule 존재와 화면 즉시 표시 동작을 확인한다.

## 수용 기준

- `/` hero와 좌측 카운트가 첫 진입 시 절제된 순차 reveal을 보인다.
- `/active` 상단 차트가 데이터 값까지 조용히 그려진다.
- hover/focus 반응은 hairline과 chart emphasis 수준으로 제한된다.
- todo CRUD, 필터, DnD 동작은 기존과 동일하다.
- 새 런타임 의존성은 추가되지 않는다.
- reduced motion 환경에서 애니메이션이 비활성화된다.
