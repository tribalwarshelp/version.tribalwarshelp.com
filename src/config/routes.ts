export const INDEX_PAGE = '/';
export const SERVER_PAGE = {
  BASE: '/server',
  get INDEX_PAGE() {
    return this.BASE + '/:key';
  },
};
