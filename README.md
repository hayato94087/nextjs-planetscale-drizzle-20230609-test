## Getting Started

install packages

```bash
$ pnpm i
```

create .env file and fill DATABASE_URL

```bash
$ cp .env.example .env
```

create migration files

```bash
$ pnpm db:generate
```

push migration file to database

```bash
$ pnpm db:push
```

try to run example file.
following example file will throw Exception, which is expected.

```bash
$ pnpm node -r esbuild-register src/db/examplePlanetScaleDriver.ts
```

try to run example files.
following example will works. 

```bash
$ pnpm node -r esbuild-register src/db/exampleMysql2.ts
$ pnpm node -r esbuild-register src/db/examplePlanetScaleDriverVariant.ts 
```