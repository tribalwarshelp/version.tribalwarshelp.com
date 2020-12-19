import {
  ROWS_PER_PAGE_DEFAULT,
  ROWS_PER_PAGE_OPTIONS_DEFAULT,
} from './TableFooter';

export const validateRowsPerPage = (
  rowsPerPage: number = ROWS_PER_PAGE_DEFAULT,
  rowsPerPageOptions: Array<
    number | { value: number; label: string }
  > = ROWS_PER_PAGE_OPTIONS_DEFAULT
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
