export const buildVillageURL = (
  host: string,
  server: string,
  id: number
): string => {
  return `https://${server}.${host}/game.php?screen=info_village&id=${id}`;
};
