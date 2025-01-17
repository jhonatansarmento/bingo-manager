"use client";

import { useState } from "react";
import { RangeSlider } from "./range-slider";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface GenerateNumbersModalProps {
  onGenerate: (numbers: string) => void;
}

const GenerateNumbersModal = ({ onGenerate }: GenerateNumbersModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = (generatedNumbers: string) => {
    if (generatedNumbers) {
      onGenerate(generatedNumbers);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="mt-2 w-full" onClick={() => setIsOpen(true)}>
          Gerar Números
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerar Números</DialogTitle>
          <DialogDescription>
            Selecione o intervalo de números que deseja gerar.
          </DialogDescription>
        </DialogHeader>
        <RangeSlider onGenerate={handleGenerate} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateNumbersModal;
