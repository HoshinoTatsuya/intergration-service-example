import {IntegrationService} from "./integrations/integration.service";

export class ExampleUseService {
    public constructor(private _integrationService: IntegrationService) {
    }

    public createUser(data) {
        this._integrationService.redis.createUser(data)
    }
}