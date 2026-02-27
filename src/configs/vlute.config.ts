import { EEnvKey } from "../common/enums/env.enum";
import { Env } from "../common/utils/env.util";
import { ConfigType, registerAs } from "@nestjs/config";

export const VLUTE_CONFIG_NAMESPACE = "vlute";

const vluteConfig = registerAs(VLUTE_CONFIG_NAMESPACE, () => ({
  studentEmailSuffix: Env.get(
    EEnvKey.studentVluteEmailSuffix,
    "st.vlute.edu.vn",
  ),
}));

export default vluteConfig;
export type VluteConfig = ConfigType<typeof vluteConfig>;
