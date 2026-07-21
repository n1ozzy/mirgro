"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Upload } from "lucide-react";
import { cn } from "@/lib/cn";
import { companyInfo, contactSection, services } from "@/content/site";
import { useServiceRequest } from "@/components/providers/ServiceRequestProvider";
import { Toast } from "@/components/ui/Toast";

const MIN_PHONE_DIGITS = 7;
const TOAST_HIDE_MS = 4200;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Podaj imię i nazwisko."),
  phone: z
    .string()
    .trim()
    .min(1, "Podaj numer telefonu.")
    .refine(
      (value) => value.replace(/\D/g, "").length >= MIN_PHONE_DIGITS,
      "Podaj poprawny numer telefonu.",
    ),
  email: z.union([z.literal(""), z.email("Podaj poprawny adres e-mail.")]),
  city: z.string(),
  service: z.string(),
  message: z.string().trim().min(1, "Opisz krótko zakres prac."),
  contactPreference: z.enum(["telefon", "email", "whatsapp"]),
  photos: z.custom<FileList | null>().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  /** Swap for an API call / Server Action when a backend exists. */
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
}

const CONTACT_PREFERENCES = [
  { value: "telefon", label: "Telefon" },
  { value: "email", label: "E-mail" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

const fieldClasses =
  "w-full rounded-field border border-text/40 bg-bg px-3.75 py-3.25 text-body text-text outline-none transition-colors duration-200 placeholder:text-dim focus:border-brass";

const labelClasses = "mb-1.75 block text-caption font-semibold text-muted";

export function ContactForm({ onSubmit }: ContactFormProps) {
  const { requestedService } = useServiceRequest();
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [seenRequestToken, setSeenRequestToken] = useState<number | null>(null);

  // Hide the stale success banner as soon as a new service request arrives
  // (state adjustment during render instead of a cascading effect).
  if (requestedService && requestedService.token !== seenRequestToken) {
    setSeenRequestToken(requestedService.token);
    setSubmitted(false);
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      service: "",
      message: "",
      contactPreference: "telefon",
    },
  });

  // Syncing react-hook-form (an external store) with the latest request.
  useEffect(() => {
    if (requestedService) setValue("service", requestedService.id);
  }, [requestedService, setValue]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), TOAST_HIDE_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  const submit = handleSubmit(async (values) => {
    await onSubmit?.(values);
    setSubmitted(true);
    setToast(contactSection.successMessage);
    reset();
  });

  return (
    <>
      {submitted && (
        <div className="mb-5.5 flex items-center gap-3 rounded-xl border border-laser/30 bg-laser/6 px-4.5 py-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-laser text-ink">
            <Check aria-hidden size={18} strokeWidth={2.4} />
          </span>
          <span className="text-ui text-text">{contactSection.successMessage}</span>
        </div>
      )}

      <form onSubmit={submit} noValidate className="grid gap-4">
        <p className="text-caption text-muted">Pola oznaczone * są wymagane.</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-4">
          <div>
            <label htmlFor="contact-name" className={labelClasses}>
              Imię i nazwisko *
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Jan Kowalski"
              aria-required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={cn(fieldClasses, errors.name && "border-danger")}
              {...register("name")}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1.5 text-caption text-danger">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="contact-phone" className={labelClasses}>
              Telefon *
            </label>
            <input
              id="contact-phone"
              type="tel"
              placeholder={companyInfo.phone}
              aria-required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              className={cn(fieldClasses, errors.phone && "border-danger")}
              {...register("phone")}
            />
            {errors.phone && (
              <p id="contact-phone-error" className="mt-1.5 text-caption text-danger">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-4">
          <div>
            <label htmlFor="contact-email" className={labelClasses}>
              E-mail
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder={companyInfo.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={cn(fieldClasses, errors.email && "border-danger")}
              {...register("email")}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1.5 text-caption text-danger">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="contact-city" className={labelClasses}>
              Miasto / region
            </label>
            <input
              id="contact-city"
              type="text"
              placeholder={companyInfo.region}
              className={fieldClasses}
              {...register("city")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-service" className={labelClasses}>
            Interesująca usługa
          </label>
          <select
            id="contact-service"
            className={cn(fieldClasses, "cursor-pointer")}
            {...register("service")}
          >
            <option value="">Wybierz usługę…</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
            <option value="inne">{contactSection.serviceFallbackOption}</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            Opis projektu *
          </label>
          <textarea
            id="contact-message"
            rows={4}
            placeholder="Opisz krótko zakres prac, powierzchnię, stan wyjściowy…"
            aria-required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={cn(fieldClasses, "resize-y", errors.message && "border-danger")}
            {...register("message")}
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-caption text-danger">
              {errors.message.message}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-2.5 block text-caption font-semibold text-muted">
            Preferowany kontakt
          </legend>
          <div className="flex flex-wrap gap-5">
            {CONTACT_PREFERENCES.map((preference) => (
              <label
                key={preference.value}
                className="flex min-h-11 cursor-pointer items-center gap-2 text-ui text-text-2"
              >
                <input
                  type="radio"
                  value={preference.value}
                  className="size-5 accent-brass"
                  {...register("contactPreference")}
                />
                {preference.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex cursor-pointer items-center gap-3 rounded-field border border-dashed border-text/16 bg-bg px-3.75 py-3.5 text-sm text-muted transition-colors duration-200 hover:border-brass/50">
          <Upload aria-hidden size={20} strokeWidth={1.6} className="shrink-0 text-brass" />
          Dodaj zdjęcia (opcjonalnie)
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            {...register("photos")}
          />
        </label>

        <button
          type="submit"
          className="mt-1 inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-brass p-4 text-base font-bold text-bg transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-cta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        >
          Wyślij zapytanie
          <ArrowRight aria-hidden size={17} strokeWidth={2} />
        </button>
      </form>

      <Toast message={toast} />
    </>
  );
}
