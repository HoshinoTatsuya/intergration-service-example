Основная идея формирования интеграционного слоя с классом по предоставлению функционала всех интеграционных модулей. 
Сам модуль объявляется глобально для корректного предоставления функционала из любой точки

```mermaid
flowchart TB
subgraph MyApplication
subgraph BusinessServices
ExampleUseService
TransactionsService
MerchantsService
end
subgraph UseCases
CreateUserUseCase
OtherUseCases
end
end
subgraph IntegrationLayer
IntegrationModule
subgraph IntegrationServices
IntegrationService
end
subgraph InfrastructureModules
RedisModule
S3Module
ElasticsearchModule
end
subgraph ConcreteImplementations
RedisService
S3Service
ElasticsearchService
end
end
ExampleUseService --> IntegrationService
TransactionsService --> IntegrationService
MerchantsService --> IntegrationService
CreateUserUseCase --> ExampleUseService
IntegrationService --> RedisService
IntegrationService --> S3Service
IntegrationService --> ElasticsearchService
RedisService -.-> Redis["Redis Server"]
S3Service -.-> S3["S3 Storage"]
ElasticsearchService -.-> ES["Elasticsearch Cluster"]
classDef app fill:#e1f5fe,stroke:#01579b
classDef integration fill:#f3e5f5,stroke:#4a148c
classDef infra fill:#e8f5e8,stroke:#1b5e20
classDef external fill:#ffebee,stroke:#b71c1c
class MyApplication app
class IntegrationLayer integration
class InfrastructureModules infra
class Redis,S3,ES external

```
