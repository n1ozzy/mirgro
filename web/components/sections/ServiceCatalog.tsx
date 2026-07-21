import { serviceCatalog, serviceCatalogSection } from "@/content/site";
import { cn } from "@/lib/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Flat index of every service — the whole offer at a glance, no tabs to click. */
export function ServiceCatalog() {
  return (
    <div>
      <SectionHeading {...serviceCatalogSection} className="max-w-160" />
      <ol className="mt-9 grid grid-cols-1 gap-x-10 md:grid-cols-2 xl:grid-cols-3">
        {serviceCatalog.map((service, index) => (
          <li key={service.name} className="border-t border-text/10 py-4 sm:py-5">
            <div className="flex items-baseline gap-3">
              <span
                className={cn(
                  "w-6 shrink-0 font-mono text-caption",
                  service.serviceId === "laser" ? "text-laser" : "text-brass",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-btn font-bold tracking-tight text-text">
                {service.name}
              </h3>
            </div>
            <p className="mt-1.5 ml-9 max-w-[44ch] text-ui leading-relaxed text-muted">
              {service.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
