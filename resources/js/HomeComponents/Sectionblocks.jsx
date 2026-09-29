import React from 'react'


function Divider() {
  return (
    <div className="relative mt-3 h-2 w-full sm:h-3" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px bg-[#12294f]/30" />
      <div className="absolute left-0 top-0 h-full w-[65%] bg-[#12294f]" />
    </div>
  )
}

// Every section: rule on top, heading on the left, content on the right (desktop)
function Block({ section, children }) {
  return (
    <section className="mt-14 border-t border-[#12294f]/20 pt-10 sm:mt-20 sm:pt-14 lg:mt-24 lg:pt-16">
      <div className="max-w-3xl">
        {section.label && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a2e] sm:text-sm">
            {section.label}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-semibold tracking-wide sm:text-3xl lg:text-4xl">
          {section.title}
        </h2>
        <Divider />
      </div>

      <div className="mt-10 sm:mt-12 lg:mt-14">{children}</div>

      {section.footnote && (
        <p className="mt-10 text-sm italic text-[#12294f]/70 sm:text-base">{section.footnote}</p>
      )}
    </section>
  )
}

/* ───────────── KPI columns: three open columns split by hairlines ───────────── */

function KpiColumns({ section }) {
  return (
    <Block section={section}>
      <div className="grid gap-10 md:grid-cols-3 md:gap-0">
        {section.columns.map((col, i) => (
          <div
            key={col.label}
            className={`md:px-8 lg:px-12 ${i === 0 ? 'md:pl-0' : 'md:border-l md:border-[#12294f]/20'} ${
              i === section.columns.length - 1 ? 'md:pr-0' : ''
            }`}
          >
            <h3 className="border-b-2 border-[#c99a2e] pb-3 text-sm font-semibold uppercase tracking-[0.15em] sm:text-base">
              {col.label}
            </h3>
            <ul>
              {col.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-[#12294f]/15 py-4 text-lg font-medium sm:text-xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Block>
  )
}

/* ───────────── Process: vertical timeline ───────────── */

function Process({ section }) {
  return (
    <Block section={section}>
      <ol className="relative">
        <span
          className="absolute bottom-3 left-[19px] top-3 w-px bg-[#12294f]/25 sm:left-[23px]"
          aria-hidden="true"
        />
        {section.steps.map((step, i) => (
          <li
            key={step.title}
            className="relative grid gap-x-10 gap-y-2 pb-10 pl-14 last:pb-0 sm:pl-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#12294f] text-base font-semibold text-white ring-4 ring-[#e6e5e0] sm:h-12 sm:w-12 sm:text-lg">
              {i + 1}
            </span>

            <h3 className="pt-2 text-lg font-semibold leading-snug sm:pt-3 sm:text-xl">
              {step.title}
            </h3>

            {(step.points || step.note) && (
              <div className="lg:pt-3">
                {step.points && (
                  <ul className="flex flex-wrap gap-2">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="border border-[#12294f]/25 px-3 py-1 text-sm sm:text-base"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {step.note && (
                  <p className="mt-3 text-sm font-semibold text-[#12294f] sm:text-base">
                    {step.note}
                  </p>
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Block>
  )
}

/* ───────────── Stats + questions: number strip, then two-column list ───────────── */

function StatsQuestions({ section }) {
  return (
    <Block section={section}>
      <dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-y-0">
        {section.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-0 sm:px-6 lg:px-8 ${i % 2 === 1 ? 'pl-6' : ''} ${
              i > 0 ? 'lg:border-l lg:border-[#12294f]/20' : 'lg:pl-0'
            } ${i % 2 === 1 ? 'border-l border-[#12294f]/20' : ''}`}
          >
            <dd className="text-2xl font-semibold text-[#12294f] sm:text-3xl lg:text-4xl">
              {stat.value}
            </dd>
            <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#c99a2e] sm:text-sm">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>

      {section.lead && (
        <p className="mt-12 max-w-3xl text-lg leading-8 sm:text-xl lg:mt-14 lg:text-2xl lg:leading-9">
          {section.lead}
        </p>
      )}

      <ul className="mt-6 grid md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        {section.questions.map((q) => (
          <li
            key={q}
            className="flex items-start gap-4 border-b border-[#12294f]/15 py-4 text-base leading-7 sm:text-lg"
          >
            <span className="mt-3 h-0.5 w-5 shrink-0 bg-[#c99a2e]" aria-hidden="true" />
            <span>{q}</span>
          </li>
        ))}
      </ul>
    </Block>
  )
}

/* ───────────── Comparison: clean two-column table ───────────── */

function Comparison({ section }) {
  const { left, right } = section
  const rowCount = Math.max(left.rows.length, right.rows.length)
  return (
    <Block section={section}>
      <div className="overflow-hidden">
        <div className="grid grid-cols-2 border-b-2 border-[#12294f]">
          <h3 className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#12294f]/60 sm:text-base">
            {left.title}
          </h3>
          <h3 className="pb-3 pl-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#12294f] sm:pl-8 sm:text-base">
            {right.title}
          </h3>
        </div>

        {Array.from({ length: rowCount }).map((_, i) => (
          <div key={i} className="grid grid-cols-2 border-b border-[#12294f]/15">
            <p className="py-4 pr-4 text-sm text-[#12294f]/70 sm:py-5 sm:text-base lg:text-lg">
              {left.rows[i]}
            </p>
            <p className="flex items-start gap-3 border-l border-[#12294f]/20 py-4 pl-4 text-sm font-semibold sm:gap-4 sm:py-5 sm:pl-8 sm:text-base lg:text-lg">
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c99a2e] sm:mt-2.5"
                aria-hidden="true"
              />
              <span>{right.rows[i]}</span>
            </p>
          </div>
        ))}
      </div>
    </Block>
  )
}

/* ───────────── Callout: split statement + pull quote ───────────── */

function Callout({ section }) {
  return (
    <section className="mt-14 border-t border-[#12294f]/20 pt-10 sm:mt-20 sm:pt-14 lg:mt-24 lg:pt-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div>
          {section.label && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a2e] sm:text-sm">
              {section.label}
            </p>
          )}
          <h2 className="mt-2 text-2xl font-semibold tracking-wide sm:text-3xl lg:text-4xl">
            {section.title}
          </h2>
          <Divider />
        </div>

        <div>
          {section.text && (
            <p className="text-base leading-7 sm:text-lg sm:leading-8 lg:text-xl">
              {section.text}
            </p>
          )}
          {section.quote && (
            <blockquote className="mt-8 border-l-4 border-[#c99a2e] pl-5 text-lg font-medium italic leading-8 sm:pl-8 sm:text-xl lg:text-2xl lg:leading-9">
              {section.quote}
            </blockquote>
          )}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Other layouts (not used by current data) ───────────── */

function Columns({ section }) {
  return <KpiColumns section={section} />
}

function ChecklistPanel({ section }) {
  const { steps, panel } = section
  return (
    <Block section={section}>
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ol>
          {steps.map((step, i) => (
            <li
              key={`${i}-${step}`}
              className="flex items-start gap-4 border-b border-[#12294f]/15 py-4 text-base sm:text-lg"
            >
              <span className="w-6 shrink-0 font-semibold text-[#c99a2e]">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {panel && (
          <aside className="border-l-4 border-[#c99a2e] pl-6 sm:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c99a2e] sm:text-sm">
              {panel.label}
            </p>
            <p className="mt-4 text-lg italic leading-8 sm:text-xl">{panel.quote}</p>
            <ul className="mt-6">
              {panel.terms?.map((term) => (
                <li
                  key={term}
                  className="border-b border-[#12294f]/15 py-3 text-lg font-semibold"
                >
                  {term}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </Block>
  )
}

function NumberedCards({ section }) {
  return (
    <Block section={section}>
      <ol className="grid md:grid-cols-2 md:gap-x-16">
        {section.steps.map((step, i) => (
          <li
            key={`${i}-${step}`}
            className="flex items-start gap-4 border-b border-[#12294f]/15 py-5 text-base sm:text-lg"
          >
            <span className="w-6 shrink-0 font-semibold text-[#c99a2e]">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </Block>
  )
}

function DualPanels({ section }) {
  return (
    <Block section={section}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {section.panels.map((panel) => (
          <article key={panel.title}>
            <h3 className="border-b-2 border-[#c99a2e] pb-3 text-lg font-semibold sm:text-xl">
              {panel.title}
            </h3>
            <ul>
              {panel.points.map((point) => (
                <li
                  key={point}
                  className="border-b border-[#12294f]/15 py-4 text-base sm:text-lg"
                >
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Block>
  )
}

function ListTiles({ section }) {
  const { left, right } = section
  return (
    <Block section={section}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="border-b-2 border-[#c99a2e] pb-3 text-lg font-semibold sm:text-xl">
            {left.title}
          </h3>
          <ol>
            {left.steps.map((step, i) => (
              <li
                key={`${i}-${step}`}
                className="flex items-start gap-4 border-b border-[#12294f]/15 py-4 text-base sm:text-lg"
              >
                <span className="w-6 shrink-0 font-semibold text-[#c99a2e]">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="border-b-2 border-[#c99a2e] pb-3 text-lg font-semibold sm:text-xl">
            {right.title}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {right.tiles.map((tile) => (
              <li
                key={tile}
                className="border border-[#12294f]/25 px-4 py-2 text-base sm:text-lg"
              >
                {tile}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Block>
  )
}

/* ───────────── Registry: add new section types here ───────────── */

const SECTION_TYPES = {
  'checklist-panel': ChecklistPanel,
  'numbered-cards': NumberedCards,
  'dual-panels': DualPanels,
  'list-tiles': ListTiles,
  columns: Columns,
  'kpi-columns': KpiColumns,
  process: Process,
  'stats-questions': StatsQuestions,
  comparison: Comparison,
  callout: Callout,
}

export default function SectionBlocks({ sections }) {
  return (
    <>
      {sections.map((section, i) => {
        const Component = SECTION_TYPES[section.type]
        if (!Component) return null
        return <Component key={`${i}-${section.title}`} section={section} />
      })}
    </>
  )
}