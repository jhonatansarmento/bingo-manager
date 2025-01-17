"use client";

import { addParticipant } from "@/app/actions/add-participant";
import { getUsedNumbers } from "@/app/actions/get-used-numbers ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import GenerateNumbersModal from "./generate-numbers-modal";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const AddParticipantDialog = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const formSchema = z
    .object({
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
      phone: z
        .string()
        .min(14, "Telefone inválido.")
        .max(15, "Telefone inválido."),
    })
    .superRefine(async (values, ctx) => {
      const usedNumbers = await getUsedNumbers();
      const numbersArray = values.numbers
        .split(",")
        .map((num) => num.trim())
        .map(Number);

      numbersArray.forEach((num) => {
        if (usedNumbers.includes(num)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["numbers"],
            message: `O número ${num} já está cadastrado.`,
          });
        }
      });
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numbers: "",
      fullName: "",
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await addParticipant(data);
      setDialogIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={(open) => {
        setDialogIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>Adicionar Participante</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Participante</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para adicionar um novo participante
            ao sorteio.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="numbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Números da Sorte</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 501, 502, 503" {...field} />
                  </FormControl>
                  <GenerateNumbersModal
                    onGenerate={(generatedNumbers) => {
                      if (generatedNumbers) {
                        field.onChange(generatedNumbers);
                      }
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Jhonatan Sarmento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <InputMask
                      mask="(99) 99999-9999"
                      placeholder="Ex: (92) 99187-0568"
                      {...field}
                    >
                      {(inputProps) => <Input {...inputProps} />}
                    </InputMask>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddParticipantDialog;
