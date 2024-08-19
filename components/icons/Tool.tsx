interface ToolProps {
  isGrayed?: boolean;
}
export const Tool = ({ isGrayed = false }: ToolProps) => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.3125 6.56249C15.1216 6.75721 15.0147 7.019 15.0147 7.29166C15.0147 7.56431 15.1216 7.8261 15.3125 8.02082L16.9792 9.68749C17.1739 9.87835 17.4357 9.98526 17.7083 9.98526C17.981 9.98526 18.2428 9.87835 18.4375 9.68749L22.3646 5.76041C22.8884 6.91789 23.047 8.20752 22.8192 9.45743C22.5915 10.7073 21.9882 11.8582 21.0899 12.7565C20.1915 13.6549 19.0407 14.2581 17.7908 14.4859C16.5409 14.7136 15.2512 14.555 14.0938 14.0312L6.89584 21.2292C6.48143 21.6436 5.91939 21.8764 5.33334 21.8764C4.74728 21.8764 4.18524 21.6436 3.77084 21.2292C3.35643 20.8148 3.12363 20.2527 3.12363 19.6667C3.12363 19.0806 3.35643 18.5186 3.77084 18.1042L10.9688 10.9062C10.445 9.74875 10.2864 8.45912 10.5141 7.20921C10.7418 5.95931 11.3451 4.80848 12.2435 3.91012C13.1418 3.01175 14.2927 2.4085 15.5426 2.18076C16.7925 1.95303 18.0821 2.11162 19.2396 2.63541L15.3229 6.55207L15.3125 6.56249Z"
      stroke="black"
      strokeOpacity={isGrayed ? '0.5' : '0.92'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
