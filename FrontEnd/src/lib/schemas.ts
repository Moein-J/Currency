import * as z from "zod";

export const addCurrencySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  information: z.string().min(5),
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1)
  ),
});
