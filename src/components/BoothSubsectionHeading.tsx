interface BoothSubsectionHeadingProps {
  title: string;
}

export function BoothSubsectionHeading({ title }: BoothSubsectionHeadingProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold leading-[46px] text-primary lg:text-[32px]">{title}</h3>
      <hr className="mt-[11px] border-[#DCDCDC] lg:mt-[15px]" />
    </div>
  );
}
