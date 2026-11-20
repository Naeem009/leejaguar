"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { categories } from "@/content/categories";
import { formCopy } from "@/content/copy";
import { businessTypes, enquirySchema, projectStages, type EnquiryInput } from "@/lib/validators";

type Status =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success" }
  | { type: "error"; message: string };

const fieldClass =
  "w-full min-h-12 bg-cream px-3 py-3 text-base text-espresso placeholder:text-espresso/60";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      businessType: "",
      categories: [],
      stage: "",
      brief: "",
      consent: false,
      website: "",
    },
  });

  async function onSubmit(values: EnquiryInput) {
    setStatus({ type: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        setStatus({
          type: "error",
          message: payload.message || "Your enquiry could not be sent. Please try again.",
        });
        return;
      }
      reset();
      setStatus({ type: "success" });
    } catch {
      setStatus({ type: "error", message: "Your enquiry could not be sent. Please try again." });
    }
  }

  if (status.type === "success") {
    return (
      <div className="border border-stone bg-cream p-8 text-espresso" role="status" aria-live="polite">
        <h2 className="font-display text-[length:var(--text-h3)] uppercase text-espresso">{formCopy.successTitle}</h2>
        <p className="mt-3 text-base text-espresso">{formCopy.successBody}</p>
        <div className="mt-6">
          <Button type="button" variant="secondary" onClick={() => setStatus({ type: "idle" })}>
            {formCopy.another}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-6 text-espresso" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label={formCopy.fullName} required error={errors.fullName?.message} htmlFor="fullName">
          <input id="fullName" className={fieldClass} autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register("fullName")} />
        </Field>
        <Field label={formCopy.company} required error={errors.company?.message} htmlFor="company">
          <input id="company" className={fieldClass} autoComplete="organization" aria-invalid={Boolean(errors.company)} {...register("company")} />
        </Field>
        <Field label={formCopy.email} required error={errors.email?.message} htmlFor="email">
          <input id="email" type="email" className={fieldClass} autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
        </Field>
        <Field label={formCopy.phone} hint={formCopy.optional} error={errors.phone?.message} htmlFor="phone">
          <input id="phone" type="tel" className={fieldClass} autoComplete="tel" {...register("phone")} />
        </Field>
        <Field label={formCopy.businessType} error={errors.businessType?.message} htmlFor="businessType">
          <select id="businessType" className={fieldClass} defaultValue="" {...register("businessType")}>
            <option value="">{formCopy.select}</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label={formCopy.stage} error={errors.stage?.message} htmlFor="stage">
          <select id="stage" className={fieldClass} defaultValue="" {...register("stage")}>
            <option value="">{formCopy.select}</option>
            {projectStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-espresso">
          {formCopy.categories}
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {categories.map((category) => (
            <label key={category.slug} className="flex min-h-11 items-center gap-3 text-base text-espresso">
              <input type="checkbox" value={category.slug} className="h-4 w-4 accent-espresso" {...register("categories")} />
              <span className="uppercase tracking-[0.04em]">{category.name}</span>
            </label>
          ))}
        </div>
        {errors.categories?.message ? (
          <p className="mt-2 text-base text-espresso" role="alert">
            {errors.categories.message}
          </p>
        ) : null}
      </fieldset>

      <Field label={formCopy.brief} required error={errors.brief?.message} htmlFor="brief">
        <textarea id="brief" rows={7} className={`${fieldClass} min-h-40`} aria-invalid={Boolean(errors.brief)} {...register("brief")} />
      </Field>

      <div>
        <label className="flex min-h-11 items-start gap-3 text-base text-espresso">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-espresso" aria-invalid={Boolean(errors.consent)} {...register("consent")} />
          <span>{formCopy.consent}</span>
        </label>
        {errors.consent?.message ? (
          <p id="consent-error" className="mt-2 text-base text-espresso" role="alert">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div aria-live="polite">
        {status.type === "error" ? <p className="text-base text-espresso">{status.message}</p> : null}
      </div>

      <Button type="submit" disabled={status.type === "submitting"}>
        {status.type === "submitting" ? formCopy.sending : formCopy.submit}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-espresso">
        {label}
        {required ? <span aria-hidden> *</span> : null}
        {hint ? <span className="ml-2 normal-case tracking-normal">({hint})</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-2 text-base text-espresso" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
