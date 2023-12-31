import createClient from "openapi-fetch";
import type { components, paths } from "./v1";

const client = createClient<paths>({ baseUrl: "http://localhost:5129" });

export type Virksomhet = components["schemas"]["VirksomhetOutputDto"];
export type VirksomhetEdit = components["schemas"]["VirksomhetEditDto"];
export type VirksomhetAdd = components["schemas"]["VirksomhetInputDto"];

export default client;