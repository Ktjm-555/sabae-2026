import ticketData from "../../content/ticket.json";

export interface TicketForm {
  id: string;
  label: string;
  href: string;
}

export interface TicketContent {
  date: string;
  category: string;
  projectLabel: string;
  title: string;
  eventDateTime: string;
  venue: string;
  rainPolicy: string;
  applicationPeriod: string;
  applicationIntro: string;
  forms: TicketForm[];
  queueRules: string[];
  entryRules: string[];
  otherNotes: string[];
  latestInfoUrl: string;
  privacyPolicy: string[];
  sampleTicket: {
    areaLabel: string;
    schedule: string;
  };
}

export function getTicketContent(): TicketContent {
  return ticketData as TicketContent;
}
