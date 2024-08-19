import { Logo } from './icons/Logo';
import { Logotype } from './icons/Logotype';

export const TextLogo = () => {
  return (
    <div className="flex items-center gap-[10px] py-[1px]">
      <Logo />
      <Logotype />
    </div>
  );
};
