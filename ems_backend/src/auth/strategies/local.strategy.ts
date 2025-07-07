import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { response } from "express";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super()
    }

    validate(username: string, password: string) {

        const user = this.authService.validateUser({ username, password });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

}