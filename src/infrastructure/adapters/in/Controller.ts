import { Router, Request, Response } from "express";
import { LogPort } from "../../../domain/ports/LogPort";
import { FetchService } from "../../../application/FetchService";
import { PokemonApiAdapter } from "../out/PokemonApiAdapter";
import { DigimonApiAdapter } from "../out/DigimonApiAdapter";
import { Metadata } from "../../../domain/models/Metadata";

export function FranchiseController(logger: LogPort): Router {
  const router = Router();

  router.get(
    "/api/:franchise/:version",
    async (req: Request, res: Response) => {
      try {
        const { franchise, version } = req.params;

        const metadata = JSON.parse(req.query.metadata as string);
        const config = JSON.parse(req.query.config as string);

        let fetchService;
        if (franchise === "pokemon") {
          fetchService = new FetchService(new PokemonApiAdapter(), logger);
        } else {
          fetchService = new FetchService(new DigimonApiAdapter(), logger);
        }

        const result = await fetchService.execute(
          franchise,
          version,
          new Metadata(metadata.id ?? null, metadata.name ?? null),
          config
        );

        res.json(result);
      } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: error.message });
      }
    }
  );

  return router;
}
