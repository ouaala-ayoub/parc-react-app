export const STATUS = [
  {
    id: 1,
    libelle: "Opérationnel",
    color: "green.500",
    lightColor: "green.100",
  },
  {
    id: 2,
    libelle: "En Panne",
    color: "red.500",
    lightColor: "red.100",
  },
  {
    id: 3,
    libelle: "Reserve",
    color: "cyan.500",
    lightColor: "cyan.100",
  },
  {
    id: 4,
    libelle: "Accidenté",
    color: "purple",
    lightColor: "purple.100", // Lighter purple
  },
  {
    id: 5,
    libelle: "En Maintenance préventive",
    color: "yellow.400",
    lightColor: "yellow.100",
  },
];

export const RISK = {
  "-1": {
    id: -1,
    libelle: "Pas de risque",
    color: "green.500",
    lightColor: "green.100",
  },
  1: {
    id: 1,
    libelle: "Faible",
    color: "black.500",
    lightColor: "gray.300",
  },
  2: {
    id: 2,
    libelle: "Moyen",
    color: "orange.500",
    lightColor: "orange.100",
  },
  3: {
    id: 3,
    libelle: "Important",
    color: "red.500",
    lightColor: "red.100",
  },
};
