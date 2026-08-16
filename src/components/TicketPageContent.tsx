import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { buttonArrowIconSizeClass } from "@/components/NewsListItem";
import type { TicketContent } from "@/lib/ticket";

function ButtonArrowIcon({ className }: { className?: string }) {
  return (
    <Image
      src={withBasePath("/images/btn_arrow.svg")}
      alt=""
      width={12}
      height={20}
      className={className}
      aria-hidden="true"
    />
  );
}

interface TicketApplyButtonProps {
  href: string;
  label?: string;
  external?: boolean;
  newTab?: boolean;
}

export function TicketApplyButton({
  href,
  label = "お申込みはこちら",
  external = false,
  newTab,
}: TicketApplyButtonProps) {
  const className =
    "inline-flex h-[39px] w-[228px] items-center justify-center gap-3 rounded-[80px] bg-primary px-4 text-base font-bold text-white transition-colors hover:bg-primary-dark lg:h-[49px] lg:text-xl";

  const content = (
    <>
      {label}
      <ButtonArrowIcon className={`shrink-0 ${buttonArrowIconSizeClass}`} />
    </>
  );

  const isExternalLink = external || href.startsWith("http");
  const openInNewTab = newTab ?? isExternalLink;

  if (isExternalLink) {
    return (
      <a
        href={href}
        className={className}
        {...(openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

interface TicketRow {
  label: string;
  content: ReactNode;
  singleLine?: boolean;
}

function TicketInfoRowDesktop({
  label,
  children,
  isLast = false,
  singleLine = false,
}: {
  label: string;
  children: ReactNode;
  isLast?: boolean;
  singleLine?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[172px_1fr] border-t border-[#DCDCDC] ${isLast ? "border-b" : ""}`}
    >
      <div className="flex self-stretch py-[10px]">
        <div className="flex min-h-[58px] w-full items-center justify-center bg-[#EFEFEF] px-2 text-center text-base font-bold leading-[26px] text-[#4B5563] whitespace-pre-line">
          {label}
        </div>
      </div>
      <div
        className={`self-stretch py-5 pl-[25px] pr-0 text-base text-[#4B5563] ${
          singleLine ? "flex items-center" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function TicketInfoRowMobile({
  label,
  children,
  isLast = false,
}: {
  label: string;
  children: ReactNode;
  isLast?: boolean;
}) {
  const lastRowClassName = isLast ? " border-b border-[#DCDCDC]" : "";

  return (
    <div className={`border-t border-[#DCDCDC]${lastRowClassName}`}>
      <div className="pt-[10px]">
        <div className="flex min-h-[58px] items-center justify-center bg-[#EFEFEF] px-2 text-center text-base font-bold leading-[26px] text-[#4B5563] whitespace-pre-line">
          {label}
        </div>
      </div>
      <div className="py-5 text-sm text-[#4B5563]">{children}</div>
    </div>
  );
}

function TicketSampleCard({
  areaLabel,
  schedule,
}: {
  areaLabel: string;
  schedule: string;
}) {
  return (
    <div className="mx-auto w-[200px] border border-[#DCDCDC] bg-white px-2 py-3 text-center lg:mx-0">
      <p className="text-[10px] font-bold leading-[15px] text-black">
        めがねのまちさばえミライフェス 2026
        <br />
        スペシャルステージ入場券
      </p>
      <p className="mt-1 text-xs font-bold leading-[15px] text-black">【エリア区分】</p>
      <p className="mt-1 text-lg font-bold leading-[15px] text-[#ED6A02]">{areaLabel}</p>
      <p className="mt-3 whitespace-pre-line text-xs leading-[15px] text-black">{schedule}</p>
    </div>
  );
}

function AreaSectionContent() {
  return (
    <div className="space-y-4 leading-[22px]">
      <div>
        <p>会場内は、ステージ前方から以下の3つのエリアに分かれます。</p>
        <p>
          ① 鯖江市内園児エリア
          <br />
          ② 鯖江市内親子エリア
          <br />
          ③ 一般エリア
        </p>
      </div>

      <div>
        <p className="font-bold">①鯖江市内園児エリア</p>
        <p className="pl-4 font-bold">
          EXILE BE HAPPY TETSUYAさんたちと一緒に「さばえハッピーダンス」を踊ろう！
        </p>
        <p className="font-bold">対象：</p>
        <p className="pl-4">
          鯖江市内の保育園・こども園・幼稚園に通う0～5歳児とそのご家族
          <br />
          ※対象園児1人につき、保護者1人でお申込みください。
          <br />
          ※対象園児と同一世帯のご家族は、同行者として入場できます。
        </p>
        <p className="font-bold">例：</p>
        <p className="pl-4">
          対象園児1人＋保護者(母)1人＋同行者(祖母､園児と小学生の兄弟)3人
          <br />
          ※0～1歳児は、安全確保のため、抱っこひもでの入場をお願いします。
        </p>
      </div>

      <div>
        <p className="font-bold">②鯖江市内親子エリア</p>
        <p className="font-bold">対象：</p>
        <p className="pl-4">
          鯖江市内の小学6年生以下のお子さまとそのご家族
          <br />
          ※対象のお子さまと同一世帯のご家族は、同行者として入場できます。
        </p>
        <p className="font-bold">例：</p>
        <p className="pl-4">
          対象のお子さま1人＋保護者(父)1人＋同行者(中学生と高校生の姉妹)2人
        </p>
      </div>

      <div>
        <p className="font-bold">③一般エリア</p>
        <p className="font-bold">対象：</p>
        <p className="pl-4">
          ①･②の対象外の方、または同一世帯のご家族以外の方を同行者に含む方
          <br />
          ※代表者1人につき、同行者3人まで入場できます。
        </p>
      </div>
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <div className="leading-7">
      {items.map((item, index) => {
        const [firstLine, ...restLines] = item.split("\n");
        return (
          <p key={item}>
            {index + 1}. {firstLine}
            {restLines.map((line) => (
              <span key={line}>
                <br />
                <span className="pl-4">{line}</span>
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function BulletedList({ items }: { items: string[] }) {
  return (
    <div className="leading-7">
      {items.map((item) => (
        <p key={item} className="flex gap-0">
          <span aria-hidden="true" className="shrink-0">
            ・
          </span>
          <span>{item}</span>
        </p>
      ))}
    </div>
  );
}

function buildTicketRows(content: TicketContent): TicketRow[] {
  return [
    {
      label: "開催日時",
      singleLine: true,
      content: <p className="leading-[26px]">{content.eventDateTime}</p>,
    },
    {
      label: "会場",
      singleLine: true,
      content: <p className="leading-[26px]">{content.venue}</p>,
    },
    {
      label: "雨天時の対応",
      content: <p className="whitespace-pre-line leading-[22px]">{content.rainPolicy}</p>,
    },
    {
      label: "エリア区分",
      content: <AreaSectionContent />,
    },
    {
      label: "入場券申込期間",
      singleLine: true,
      content: <p className="font-bold leading-[26px]">{content.applicationPeriod}</p>,
    },
    {
      label: "入場券の入手方法",
      content: (
        <div className="space-y-5 leading-[22px]">
          <p className="whitespace-pre-line">{content.applicationIntro}</p>
          <div className="space-y-8">
            {content.forms.map((form) => (
              <div key={form.id} className="space-y-3">
                <p className="font-bold">{form.label}</p>
                <TicketApplyButton href={form.href} external={form.href.startsWith("http")} />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "入場券（例）",
      content: (
        <TicketSampleCard
          areaLabel={content.sampleTicket.areaLabel}
          schedule={content.sampleTicket.schedule}
        />
      ),
    },
    {
      label: "エリア入場前の整列（待機）について",
      content: <NumberedList items={content.queueRules} />,
    },
    {
      label: "エリア入場方法",
      content: (
        <div className="leading-7">
          <p>
            1. 開場時間（12:00）になりましたら、以下の順番でエリア内へご案内します。
            <br />
            <span className="pl-4 font-bold">
              ① 鯖江市内園児エリア
              <br />
              　② 鯖江市内親子エリア
              <br />
              　③ 一般エリア
            </span>
          </p>
          {content.entryRules.slice(1).map((rule, index) => (
            <p key={rule}>
              {index + 2}. {rule}
            </p>
          ))}
        </div>
      ),
    },
    {
      label: "その他",
      content: (
        <div className="leading-7">
          <p>1. {content.otherNotes[0]}</p>
          <div className="py-4">
            <TicketApplyButton
              href={content.latestInfoUrl}
              label="最新情報はこちら"
              newTab={false}
            />
          </div>
          <p>
            2. {content.otherNotes[1]}
            <br />
            3. {content.otherNotes[2]}
          </p>
        </div>
      ),
    },
    {
      label: "個人情報の取扱いに\nついて",
      content: <BulletedList items={content.privacyPolicy} />,
    },
  ];
}

interface TicketPageContentProps {
  content: TicketContent;
}

export function TicketPageContent({ content }: TicketPageContentProps) {
  const rows = buildTicketRows(content);

  return (
    <div className="px-4 pb-4 sm:px-6 lg:px-[42px] lg:pb-6">
      <div className="hidden lg:block">
        {rows.map((row, index) => (
          <TicketInfoRowDesktop
            key={row.label}
            label={row.label}
            isLast={index === rows.length - 1}
            singleLine={row.singleLine}
          >
            {row.content}
          </TicketInfoRowDesktop>
        ))}
      </div>

      <div className="lg:hidden">
        {rows.map((row, index) => (
          <TicketInfoRowMobile
            key={row.label}
            label={row.label}
            isLast={index === rows.length - 1}
          >
            {row.content}
          </TicketInfoRowMobile>
        ))}
      </div>
    </div>
  );
}
