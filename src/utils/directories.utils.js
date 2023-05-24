import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __src = dirname(dirname(__filename));
const __root = dirname(__src);
export { __src, __root };
