/** Online giving page (Flutterwave). */
export const donateUrl = "https://flutterwave.com/donate/rxlyee1x2yee";

export type BankAccount = {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  /** e.g. "NGN", "USD" */
  currency?: string;
  /** e.g. "Current", "Savings", "Domiciliary" */
  accountType?: string;
  /** For international transfers */
  swift?: string;
  iban?: string;
  sortCode?: string;
  /** Any extra instruction shown under the account, e.g. a payment reference */
  note?: string;
};

/**
 * The ministry's bank accounts, one object per account. They appear on the
 * Partnership page automatically, grouped by bank, each with a copy-to-clipboard
 * button on the account number. Leave the list empty and the page shows a
 * "details coming soon" message instead.
 *
 * Example:
 * {
 *   id: "ngn-main",
 *   bankName: "Example Bank",
 *   accountName: "Account Holder Name",
 *   accountNumber: "0123456789",
 *   currency: "NGN",
 *   accountType: "Current",
 * },
 */
export const bankAccounts: BankAccount[] = [
  // Access Bank
  { id: "access-ngn", bankName: "Access Bank", accountName: "Daniel A. Ogidi", accountNumber: "1655017812", currency: "NGN" },
  { id: "access-eur", bankName: "Access Bank", accountName: "Daniel A. Ogidi", accountNumber: "1649508557", currency: "EUR" },
  { id: "access-gbp", bankName: "Access Bank", accountName: "Daniel A. Ogidi", accountNumber: "1649570165", currency: "GBP" },
  { id: "access-usd", bankName: "Access Bank", accountName: "Daniel A. Ogidi", accountNumber: "1649893729", currency: "USD" },
  // Zenith Bank
  { id: "zenith-ngn", bankName: "Zenith Bank", accountName: "Daniel A. Ogidi", accountNumber: "2431799012", currency: "NGN" },
  { id: "zenith-usd", bankName: "Zenith Bank", accountName: "Daniel A. Ogidi", accountNumber: "5075144813", currency: "USD" },
];
