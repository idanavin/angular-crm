import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtSecret } from "../../.env";
import { EmployeeService } from "./employee.service";

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy) {
  constructor(private employeesService: EmployeeService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret.SECRET,
    });
  }

  //Checks token and return bool if admin
  async validate(payload: any): Promise<boolean> {
    const isAdmin = await this.employeesService.checkIsAdmin(payload.sub);
    return isAdmin;
  }
}
