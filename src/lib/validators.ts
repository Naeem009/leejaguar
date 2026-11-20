import { z } from "zod";
import { categories } from "@/content/categories";

export const businessTypes = [
  "Established brand",
  "Emerging label",
  "Retailer",
  "Online fashion business",
  "Private label",
  "Distributor or brand owner",
] as const;

export const projectStages = [
  "Concept",
  "Design in progress",
  "Tech pack ready",
  "Ready for sampling",
  "Ready for production",
] as const;

const slugValues = categories.map((item) => item.slug);
const categorySlugEnum = z.enum(slugValues as unknown as [string, ...string[]]);

export const enquirySchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required.").max(120),
  company: z.string().trim().min(1, "Company or brand is required.").max(160),
  email: z.string().trim().email("Enter a valid business email.").max(160),
  phone: z.string().trim().max(40),
  businessType: z.union([z.enum(businessTypes), z.literal("")]),
  categories: z.array(categorySlugEnum).max(9),
  stage: z.union([z.enum(projectStages), z.literal("")]),
  brief: z.string().trim().min(1, "Project brief is required.").max(5000),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required to send an enquiry.",
  }),
  website: z.string().max(200),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
