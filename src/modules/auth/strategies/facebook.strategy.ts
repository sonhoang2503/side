// import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, VerifyCallback } from 'passport-facebook';
// import { UserService } from '@user.module';
// import { Services } from '@enums';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor(
//     @Inject(Services.USER) private readonly _userService: UserService,
//     private readonly _configService: ConfigService,
//   ) {
//     super({
//       clientID: _configService.get<string>('google.oauth.clientID'),
//       clientSecret: _configService.get<string>('google.oauth.clientSecret'),
//       scope: ['profile', 'email'],
//       callbackURL: _configService.get<string>('google.oauth.callbackURL'),
//     });
//   }
//   async validate(
//     _accessToken: string,
//     _refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     // console.log(profile);
//     const { id, email, photos, provider, displayName } = profile;

//     const user = {
//       provider,
//       providerId: id,
//       email,
//       name: displayName,
//       picture: photos[0].value,
//     };

//     console.log(user);

//     done(null, user);
//   }
// }
