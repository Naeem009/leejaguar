export const categories = [
  {
    number: "01",
    name: "Knitwear & jersey",
    slug: "knitwear-jersey",
    description: "T-shirts, polos, sweatshirts, hoodies and joggers.",
    image: "knitwear",
  },
  {
    number: "02",
    name: "Activewear & performance",
    slug: "activewear-performance",
    description: "Leggings, sports bras, training tops and performance apparel.",
    image: "activewear",
  },
  {
    number: "03",
    name: "Loungewear & sleepwear",
    slug: "loungewear-sleepwear",
    description: "Lounge sets, pyjamas, robes and coordinated comfortwear.",
    image: "loungewear",
  },
  {
    number: "04",
    name: "Outerwear",
    slug: "outerwear",
    description: "Jackets, coats, padded jackets and overshirts.",
    image: "outerwear",
  },
  {
    number: "05",
    name: "Denim & woven apparel",
    slug: "denim-woven",
    description: "Jeans, trousers, woven shirts and shorts.",
    image: "denim",
  },
  {
    number: "06",
    name: "Dresses & contemporary fashion",
    slug: "dresses-contemporary",
    description: "Dresses, skirts, tops and fashion co-ordinates.",
    image: "dresses",
  },
  {
    number: "07",
    name: "Swimwear & resortwear",
    slug: "swimwear-resortwear",
    description: "Swimwear, cover-ups and beachwear.",
    image: "swimwear",
  },
  {
    number: "08",
    name: "Intimates & shapewear",
    slug: "intimates-shapewear",
    description: "Underwear, briefs, camisoles and shapewear.",
    image: "intimates",
  },
  {
    number: "09",
    name: "Babywear & kidswear",
    slug: "babywear-kidswear",
    description: "Rompers, bodysuits, baby sets and children's apparel.",
    image: "kidswear",
  },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];
