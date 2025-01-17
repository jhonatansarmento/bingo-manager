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
    .regex(/^[A-Za-z]+ [A-Za-z]+$/, {
      message: "Informe o nome completo com pelo menos um sobrenome.",
    }),
  phone: z.string().min(10, "Telefone inválido.").max(15, "Telefone inválido."),
});
