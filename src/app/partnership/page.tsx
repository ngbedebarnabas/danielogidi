import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CopyButton } from "@/components/CopyButton";
import { Heart, Landmark } from "@/components/icons";
import { Highlight, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Star4 } from "@/components/Sparkle";
import { bankAccounts, donateUrl, type BankAccount } from "@/data/partnership";
import { pillars } from "@/data/site";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "Partner with Apostle Daniel Ogidi in apostolic leadership, doctrinal teaching, leadership development and global missions. Give online or by bank transfer.",
};

/** Group the flat account list by bank so each bank is one card with a row per currency. */
function groupByBank(accounts: BankAccount[]) {
  const groups = new Map<string, { key: string; bankName: string; accountName: string; accounts: BankAccount[] }>();
  for (const a of accounts) {
    const key = `${a.bankName}|${a.accountName}`;
    const g = groups.get(key) ?? { key, bankName: a.bankName, accountName: a.accountName, accounts: [] };
    g.accounts.push(a);
    groups.set(key, g);
  }
  return [...groups.values()];
}

const currencyNames = new Intl.DisplayNames(["en"], { type: "currency" });
const currencyName = (code: string) => {
  try {
    return currencyNames.of(code) ?? code;
  } catch {
    return code;
  }
};

export default function PartnershipPage() {
  const banks = groupByBank(bankAccounts);

  return (
    <>
      <PageHeader
        eyebrow="Partnership"
        title={
          <>
            Partner with the <Highlight>mission</Highlight>
          </>
        }
        description="Stand with Apostle Daniel Ogidi in apostolic leadership, doctrinal teaching, leadership development and global missions. Give online or by bank transfer."
        image="/images/altar-crowd.jpg"
        focus="75% 40%"
      />

      {/* Ways to give */}
      <section className="container-x pb-16 sm:pb-24">
        <SectionHeading eyebrow="Ways to give">
          Choose how you would like to <Highlight>give</Highlight>
        </SectionHeading>

        {/* Online */}
        <Reveal className="mt-12">
          <div className="gold-glow relative flex flex-col gap-8 overflow-hidden rounded-[2rem] border border-gold/40 bg-panel p-7 sm:rounded-[2.5rem] sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5 sm:gap-6">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gold text-ink">
                <Heart width={26} height={26} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold sm:text-3xl">Give online</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-fg/70">
                  Give quickly with your card or other supported payment options. You will be taken to
                  Flutterwave&apos;s donation page to complete your gift.
                </p>
                <p className="mt-4 flex max-w-xl items-start gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-relaxed">
                  <Star4 className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    <strong className="font-bold">Note:</strong> on the payment page you can change the currency to the
                    currency of your choice.
                  </span>
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <Button href={donateUrl} target="_blank" rel="noopener noreferrer">
                Give Online
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Bank transfer */}
        <Reveal delay={0.1} className="mt-6">
          <div className="rounded-[2rem] border border-line bg-panel/70 p-7 sm:rounded-[2.5rem] sm:p-10">
            <div className="flex items-start gap-5 sm:gap-6">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink">
                <Landmark width={26} height={26} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold sm:text-3xl">Bank transfer</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-fg/70">
                  Prefer to give directly? Transfer to the account that matches your currency.
                </p>
              </div>
            </div>

            {banks.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {banks.map((bank) => (
                  <div key={bank.key} className="rounded-2xl border border-line bg-bg p-5 sm:p-6">
                    <p className="font-display text-xl font-extrabold">{bank.bankName}</p>
                    <p className="mt-1 text-sm text-fg/70">
                      <span className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Account name </span>
                      <span className="ml-1 font-semibold text-fg">{bank.accountName}</span>
                    </p>

                    <ul className="mt-5 divide-y divide-line border-t border-line">
                      {bank.accounts.map((a) => (
                        <li key={a.id} className="py-4">
                          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                            <div>
                              <p className="text-xs font-bold tracking-[0.14em] text-gold-ink uppercase">
                                {a.currency ? `${a.currency} · ${currencyName(a.currency)}` : "Account"}
                                {a.accountType ? ` · ${a.accountType}` : ""}
                              </p>
                              <p className="mt-1 font-display text-xl font-extrabold tracking-wider sm:text-2xl">{a.accountNumber}</p>
                            </div>
                            <CopyButton value={a.accountNumber} label={`${a.bankName} ${a.currency ?? ""} account number`} />
                          </div>
                          {(a.swift || a.iban || a.sortCode) && (
                            <p className="mt-2 text-xs text-muted">
                              {[a.swift && `SWIFT/BIC ${a.swift}`, a.iban && `IBAN ${a.iban}`, a.sortCode && `Sort code ${a.sortCode}`]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                          )}
                          {a.note && <p className="mt-2 text-xs leading-relaxed text-muted">{a.note}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-fg/25 p-6">
                <p className="font-semibold">Account details are being added.</p>
                <p className="mt-1 text-sm leading-relaxed text-fg/70">
                  In the meantime you can give online, or contact us and we will share the account details with you.
                </p>
                <div className="mt-5">
                  <Button href="/contact" variant="outline">
                    Contact us
                  </Button>
                </div>
              </div>
            )}

            <p className="mt-6 text-xs leading-relaxed text-muted">
              After a transfer, you are welcome to let us know through the contact form so your gift can be acknowledged.
            </p>
          </div>
        </Reveal>
      </section>

      {/* What it advances */}
      <section className="container-x py-16 sm:py-28">
        <SectionHeading eyebrow="Why partner">
          Areas of ministry you help <Highlight>advance</Highlight>
        </SectionHeading>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <StaggerItem
              key={p.title}
              className="rounded-[1.75rem] border border-line bg-panel/70 p-7 transition-colors duration-300 hover:border-gold/50"
            >
              <span className="font-display text-sm font-extrabold text-gold-ink">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-extrabold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg/65">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Scripture + contact */}
      <section className="container-x pb-24 sm:pb-36">
        <Reveal className="grid items-center gap-8 rounded-[2rem] border border-gold/30 bg-gold/[0.06] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <blockquote>
            <Star4 className="mb-4 size-7 text-gold" />
            <p className="font-display text-xl leading-snug font-bold sm:text-2xl">
              Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God
              loveth a cheerful giver.
            </p>
            <footer className="mt-3 text-sm font-semibold text-gold-ink">2 Corinthians 9:7 (KJV)</footer>
          </blockquote>
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-fg/70">Questions about partnering with the ministry?</p>
            <Button href="/contact" variant="outline">
              Contact us
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
