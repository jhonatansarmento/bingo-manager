"use client";

import { getUsedNumbers } from "@/app/actions/get-used-numbers ";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useState } from "react";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
interface RangeSliderProps {
  defaultValue?: number[];
  onGenerate?: (numbers: string) => void;
}

export const RangeSlider = ({
  defaultValue = [1, 1000],
  onGenerate,
}: RangeSliderProps) => {
  const [range, setRange] = useState<number[]>(defaultValue);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);

    try {
      const usedNumbers = await getUsedNumbers();

      const availableNumbers = Array.from(
        { length: range[1] - range[0] + 1 },
        (_, i) => range[0] + i,
      ).filter((num) => !usedNumbers.includes(num));

      if (quantity > availableNumbers.length) {
        setError(
          "Não há números suficientes disponíveis no intervalo selecionado.",
        );
        setLoading(false);
        return;
      }

      const generatedNumbers = [];
      for (let i = 0; i < quantity; i++) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        generatedNumbers.push(availableNumbers[randomIndex]);
        availableNumbers.splice(randomIndex, 1);
      }

      if (onGenerate) onGenerate(generatedNumbers.join(", "));
    } catch (err) {
      console.error("Erro ao gerar números:", err);
      setError("Erro ao gerar números. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Slider */}
      <SliderPrimitive.Root
        value={range}
        min={1}
        max={1000}
        step={1}
        onValueChange={(values) => setRange(values)}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {range.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow"
          />
        ))}
      </SliderPrimitive.Root>

      {/* Inputs de Intervalo */}
      <div className="flex items-center space-x-4">
        <Input
          type="number"
          value={range[0]}
          onChange={(e) =>
            setRange([Math.min(Number(e.target.value), range[1]), range[1]])
          }
          className="w-20 text-center"
        />
        <span>-</span>
        <Input
          type="number"
          value={range[1]}
          onChange={(e) =>
            setRange([range[0], Math.max(Number(e.target.value), range[0])])
          }
          className="w-20 text-center"
        />
      </div>

      {/* Input de Quantidade */}
      <div className="flex items-center space-x-4">
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          min={1}
          max={range[1] - range[0] + 1}
          placeholder="Quantidade"
          className="w-20"
        />
        <span>Números</span>
      </div>

      {/* Botão para Gerar Números */}
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Números"}
      </Button>

      {/* Exibir Erros */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
