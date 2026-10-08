const routes = {
  login: '/login',
  signup: '/signup',
  feed: '/main',
  edit: '/edit',
  search: '/search',
  profileUser: '/profile/:username',
  profileOwn: '/profile',
  post: '/post',
} as const;

export default routes;
