import { z } from "zod";

export const addParticipantSchema = z.object({
  numbers: z
    .string()
    .min(1, { message: "Números da sorte são obrigatórios." })
    .regex(
      /^(\d+\s*,\s*)*\d+$/,
      "Os números devem ser separados por vírgulas e apenas números são permitidos.",
    ),
  fullName: z
    .string()
    .min(2, { message: "O nome completo é obrigatório." })
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/,
      "Informe um nome válido com pelo menos uma palavra.",
    ),
  phone: z.string().min(10, "Telefone inválido.").max(15, "Telefone inválido."),
});
