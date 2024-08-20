interface UserProps {
  isGrayed?: boolean;
}

export const User = ({ isGrayed = false }: UserProps) => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.8333 21.875V19.7917C20.8333 18.6866 20.3944 17.6268 19.613 16.8454C18.8315 16.064 17.7717 15.625 16.6667 15.625H8.33334C7.22827 15.625 6.16846 16.064 5.38706 16.8454C4.60566 17.6268 4.16667 18.6866 4.16667 19.7917V21.875M16.6667 7.29167C16.6667 9.59285 14.8012 11.4583 12.5 11.4583C10.1988 11.4583 8.33334 9.59285 8.33334 7.29167C8.33334 4.99048 10.1988 3.125 12.5 3.125C14.8012 3.125 16.6667 4.99048 16.6667 7.29167Z"
      stroke="black"
      strokeOpacity={isGrayed ? '0.5' : '0.92'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
