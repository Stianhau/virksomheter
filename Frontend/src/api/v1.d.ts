/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/Virksomhet": {
    get: {
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Virksomhet"][];
            "application/json": components["schemas"]["Virksomhet"][];
            "text/json": components["schemas"]["Virksomhet"][];
          };
        };
      };
    };
    post: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["VirksomhetInputDto"];
          "text/json": components["schemas"]["VirksomhetInputDto"];
          "application/*+json": components["schemas"]["VirksomhetInputDto"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: never;
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Adresse: {
      /** Format: int32 */
      id: number;
      adresselinje_1: string;
      adresselinje_2?: string | null;
      /** Format: int32 */
      postnummer: number;
      poststed: string;
    };
    AdresseInputDto: {
      adresselinje_1?: string | null;
      adresselinje_2?: string | null;
      /** Format: int32 */
      postnummer?: number;
      poststed?: string | null;
    };
    Virksomhet: {
      /** Format: int32 */
      id: number;
      /** Format: int32 */
      organisasjonsnummer: number;
      navn: string;
      /** Format: int32 */
      adresseId: number;
      adresse?: components["schemas"]["Adresse"];
      telefon: string;
      epost: string;
    };
    VirksomhetInputDto: {
      /** Format: int32 */
      organisasjonsnummer?: number;
      navn?: string | null;
      adresse?: components["schemas"]["AdresseInputDto"];
      telefon?: string | null;
      epost?: string | null;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;