import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { comparison } from "@/content/site/services";
import { cn } from "@/lib/utils";

export function Comparison() {
  return (
    <section className="border-t border-line bg-band py-24 lg:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-[18ch] text-[clamp(1.625rem,3.2vw,2.5rem)] font-bold tracking-[-0.025em]">
            {comparison.title}
          </h2>
        </Reveal>

        <Reveal className="mt-10">
          <div className="overflow-x-auto rounded-tile border border-line bg-surface">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="bg-band">
                  <th scope="col" className="px-7 py-4 text-xs font-medium uppercase tracking-[0.12em] text-muted">
                    <span className="sr-only">Capability</span>
                  </th>
                  {comparison.columns.map((column, i) => (
                    <th
                      key={column}
                      scope="col"
                      className={cn(
                        "px-7 py-4 text-xs font-medium uppercase tracking-[0.12em]",
                        i === comparison.columns.length - 1
                          ? "text-accent"
                          : "text-muted",
                      )}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th
                      scope="row"
                      className="px-7 py-4 text-left text-[0.9375rem] font-normal"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={`${row.label}-${i}`}
                        className={cn(
                          "px-7 py-4 text-[0.9375rem]",
                          i === row.values.length - 1
                            ? "font-semibold text-accent"
                            : "text-muted",
                        )}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
