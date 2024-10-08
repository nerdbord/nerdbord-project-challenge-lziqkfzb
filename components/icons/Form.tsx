interface FormProps {
  isGrayed?: boolean;
}

export const Form = ({ isGrayed = false }: FormProps) => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.5833 2.08331H6.25001C5.69747 2.08331 5.16757 2.30281 4.77687 2.69351C4.38617 3.08421 4.16667 3.61411 4.16667 4.16665V20.8333C4.16667 21.3858 4.38617 21.9158 4.77687 22.3065C5.16757 22.6972 5.69747 22.9166 6.25001 22.9166H18.75C19.3025 22.9166 19.8324 22.6972 20.2231 22.3065C20.6138 21.9158 20.8333 21.3858 20.8333 20.8333V8.33331M14.5833 2.08331L20.8333 8.33331M14.5833 2.08331V8.33331H20.8333M16.6667 13.5416H8.33334M16.6667 17.7083H8.33334M10.4167 9.37498H8.33334"
      stroke="black"
      strokeOpacity={isGrayed ? '0.5' : '0.92'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
