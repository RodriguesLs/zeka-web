export type UserData = {
  name: string;
  email: string;
  avatar_url: string;
  password: string;
};

export type UsersStore = Map<string, UserData>;

export type RefreshTokensStore = Map<string, string[]>;

export const users: UsersStore = new Map();

export const tokens: RefreshTokensStore = new Map();

export const seedUserStore = () => {
  users.set('admin@admin.com', {
    email: 'admin@admin.com',
    name: 'Admin Zeka',
    avatar_url:
      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    password: '123456',
  });
};
