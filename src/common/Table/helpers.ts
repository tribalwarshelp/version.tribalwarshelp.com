export const validateRowsPerPage = (
  rowsPerPage: number,
  rowsPerPageOptions: Array<number | { value: number; label: string }> = [
    25,
    50,
    100,
  ]
) => {
  const rpp =
    rowsPerPageOptions.find(opt =>
      typeof opt === 'number' ? rowsPerPage === opt : opt.value === rowsPerPage
    ) ??
    (typeof rowsPerPageOptions[0] === 'number'
      ? rowsPerPageOptions[0]
      : rowsPerPageOptions[0].value);
  return typeof rpp === 'number' ? rpp : rpp.value;
};
