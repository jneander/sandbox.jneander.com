// import Routing from 'routing';

const router = {
  internals: {
    routeList: []
  },

  add (action, path) {
    this.internals.routeList.push([action, path]);
  },

  routes: {
  },

  match (matchPath) {
    const route = this.internals.routeList.find(([action, path]) => path === matchPath);
    return route ? route[0] : null;
  }
};

router.add('home', '/');
router.add('example', '/example');
router.add('slickGrid', '/slickGrid');
router.add('spreadsheet', '/spreadsheet');

export default router; // { match, routes }
