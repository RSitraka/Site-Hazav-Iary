import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Base commune : trait de 1,6 px, coins arrondis, hérite de la couleur du texte. */
function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      width={24}
      height={24}
      {...props}
    >
      {children}
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Svg>
  );
}

export function PanelIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 15h18l-2-9H5l-2 9Z" />
      <path d="M9 6 8 15M15 6l1 9M4.2 10.5h15.6M12 15v6M9 21h6" />
    </Svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </Svg>
  );
}

export function FactoryIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 21V10l6 3.5V10l6 3.5V10l6 3.5V21H3Z" />
      <path d="M6 3h3v7M7 17.5h2M12 17.5h2M17 17.5h2" />
    </Svg>
  );
}

export function WaterIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3s6 6.2 6 10.2A6 6 0 0 1 6 13.2C6 9.2 12 3 12 3Z" />
      <path d="M9 13.8a3 3 0 0 0 3 3" />
    </Svg>
  );
}

export function BatteryIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2" y="7" width="17" height="10" rx="2.5" />
      <path d="M22 10.5v3" />
      <path d="m11 9-2.4 3.4h3.2L9.6 15" />
    </Svg>
  );
}

export function AuditIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="m9 15 2-2.5 2 2 2.5-3.5" />
    </Svg>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15.5 3.5a5 5 0 0 0-6.2 6.4L3.6 15.6a2 2 0 0 0 2.8 2.8l5.7-5.7a5 5 0 0 0 6.4-6.2l-2.9 2.9-2.6-.6-.6-2.6 2.9-2.9Z" />
    </Svg>
  );
}

export function StreetlightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 21V6a3 3 0 0 1 3-3h6" />
      <rect x="14" y="6" width="7" height="3.5" rx="1.2" />
      <path d="M17.5 9.5V12M15 15l2.5-3 2.5 3M4 21h4" />
    </Svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20C3 14 6 5 20 4c1 9-3.5 15-11 15a5.6 5.6 0 0 1-5-1Z" />
      <path d="M9 15c1.5-3.5 4-6 8-7.5" />
    </Svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13.5 2 4 13.8h6.2L9.8 22 20 9.9h-6.6l.1-7.9Z" />
    </Svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 5 6v5.5c0 4.4 2.9 8.2 7 9.5 4.1-1.3 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2.2c.7 0 1.3.5 1.5 1.1l.8 3a1.5 1.5 0 0 1-.5 1.6l-1.2 1a12 12 0 0 0 4.9 4.9l1-1.2a1.5 1.5 0 0 1 1.6-.5l3 .8c.6.2 1.1.8 1.1 1.5v2.2c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 0 1 4 5.5Z" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <Svg {...props} strokeWidth={1.2}>
      <path d="M9 6c-3 1.5-4.5 4-4.5 7.5V18h6v-6H7c0-2 .7-3.4 2-4.4L9 6ZM19.5 6c-3 1.5-4.5 4-4.5 7.5V18h6v-6h-3.5c0-2 .7-3.4 2-4.4L19.5 6Z" />
    </Svg>
  );
}

/** Table de correspondance utilisée par les cartes de service. */
export const serviceIcons = {
  panel: PanelIcon,
  map: MapPinIcon,
  audit: AuditIcon,
  battery: BatteryIcon,
  factory: FactoryIcon,
  wrench: WrenchIcon,
} as const;
