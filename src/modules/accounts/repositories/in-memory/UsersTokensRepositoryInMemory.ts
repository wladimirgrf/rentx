import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UserToken[] = [];

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userTokenFound = this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );

    return userTokenFound;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userTokenFound = this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userTokenFound;
  }

  async deleteById(id: string): Promise<void> {
    const userTokenFound = this.userTokens.find(
      (userToken) => userToken.id === id
    );

    const userTokenFoundIndex = this.userTokens.indexOf(userTokenFound);

    this.userTokens.splice(userTokenFoundIndex);
  }
}

export { UsersTokensRepositoryInMemory };
