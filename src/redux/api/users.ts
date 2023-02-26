import { api, httpClient, apiRoutes } from './api';
import Cookies from 'js-cookie';
import { IUser } from 'interfaces';
import { getToken, getUserId } from 'utils/cookies';

class AppError extends Error {
  status: number | undefined;
  constructor(message: string) {
    super(message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

const tokenExpire = 0.5;

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userById: builder.query<IUser, null>({
      query: () => {
        return httpClient.get({ url: apiRoutes.userById(getUserId()), token: getToken() });
      },
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
      },
    }),
    loginUser: builder.mutation({
      query: (body) => {
        return httpClient.post({ url: apiRoutes.userLogin(), body: JSON.stringify(body) });
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { token, name, id } = data;
          Cookies.set('token', token, {
            expires: tokenExpire,
          });
          Cookies.set('userId', id, {
            expires: tokenExpire,
          });
        } catch (error) {
          console.log('!!!');
          console.error(error);
        }
      },
    }),
    registerUser: builder.mutation({
      query: (body) => httpClient.post({ url: apiRoutes.userRegister(), body }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        console.log(data);
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useUserByIdQuery,
  useLazyUserByIdQuery,
} = usersApi;
