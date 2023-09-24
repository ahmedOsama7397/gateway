import config from "../config";
let jwt = require("jsonwebtoken");

class JwtGenerator {
  private token: any = "";
  // jwt expired => 998
  // invalid signature => 997

  public generateToken(data: any) {
    const jwtToken = jwt.sign(data, config.dev.JWT_SECRET, {
      expiresIn: "1h",
    });

    this.token = jwtToken;
    return this.token;
  }

  public refreshToken(payload: any) {
    const refToken = jwt.sign(payload, config.dev.JWT_SECRET, {
      expiresIn: "1h",
    });
    return refToken;
  }

  public jwtTokenVerify(token: any) {
    try {
      const verified = jwt.verify(token, config.dev.JWT_SECRET);

      return verified;
    } catch (err) {
      return false;
    }
  }
}

export { JwtGenerator };
