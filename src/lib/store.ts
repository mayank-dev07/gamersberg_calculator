import { atom } from "jotai";
import { Fruit } from "./fruits";

export const selectedOfferFruitsAtom = atom<Fruit[]>([]);

export const totalOfferValueAtom = atom((get) => {
  const selectedOfferFruits = get(selectedOfferFruitsAtom);
  return selectedOfferFruits.reduce((total, fruit) => total + fruit.value, 0);
});

export const totalOfferPriceAtom = atom((get) => {
  const selectedOfferFruits = get(selectedOfferFruitsAtom);
  return selectedOfferFruits.reduce((total, fruit) => total + fruit.price, 0);
});

export const selectedRequestedFruitsAtom = atom<Fruit[]>([]);

export const totalRequestedValueAtom = atom((get) => {
  const selectedRequestedFruits = get(selectedRequestedFruitsAtom);
  return selectedRequestedFruits.reduce(
    (total, fruit) => total + fruit.value,
    0
  );
});

export const totalRequestedPriceAtom = atom((get) => {
  const selectedRequestedFruits = get(selectedRequestedFruitsAtom);
  return selectedRequestedFruits.reduce(
    (total, fruit) => total + fruit.price,
    0
  );
});
