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

PlanetScaleDriver.ts
delete all users

{
  headers: [],
  types: {},
  fields: [],
  rows: [],
  rowsAffected: 0,
  insertId: '0',
  size: 0,
  statement: 'delete from `users`',
  time: 2.506444
}

-----------------------------------

add users

{
  headers: [],
  types: {},
  fields: [],
  rows: [],
  rowsAffected: 2,
  insertId: '1',
  size: 0,
  statement: "insert into `users` (`id`, `name`) values (default, 'john'), (default, 'andrew')",
  time: 6.3370370000000005
}

-----------------------------------

list all users

[ { id: 1, name: 'john' }, { id: 2, name: 'andrew' } ]

-----------------------------------

delete all posts

{
  headers: [],
  types: {},
  fields: [],
  rows: [],
  rowsAffected: 0,
  insertId: '0',
  size: 0,
  statement: 'delete from `posts`',
  time: 1.763944
}

-----------------------------------

add posts

{
  headers: [],
  types: {},
  fields: [],
  rows: [],
  rowsAffected: 2,
  insertId: '1',
  size: 0,
  statement: "insert into `posts` (`id`, `content`, `author_id`) values (default, 'john', 1), (default, 'andrew', 2)",
  time: 7.105297
}

-----------------------------------

lists all posts

[
  { id: 1, content: 'john', authorId: 1 },
  { id: 2, content: 'andrew', authorId: 2 }
]

-----------------------------------

/Users/hayato94087/Private/temp/nextjs-planetscale-drizzle-20230609-test/src/db/examplePlanetScaleDriver.ts:69
  const result = await db.query.users.findMany({
                                      ^


TypeError: Cannot read properties of undefined (reading 'findMany')
    at main (/Users/hayato94087/Private/temp/nextjs-planetscale-drizzle-20230609-test/src/db/examplePlanetScaleDriver.ts:69:39)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

Node.js v19.6.1
```

try to run example files.
following example will works. 

```bash
$ pnpm node -r esbuild-register src/db/exampleMysql2.ts

Ignoring invalid configuration option passed to Connection: sslaccept. This is currently a warning, but in future versions of MySQL2, an error will be thrown if you pass an invalid configuration option to a Connection
delete all users

[
  ResultSetHeader {
    fieldCount: 0,
    affectedRows: 2,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]

-----------------------------------

add users

[
  ResultSetHeader {
    fieldCount: 0,
    affectedRows: 2,
    insertId: 3,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]

-----------------------------------

list all users

[ { id: 3, name: 'john' }, { id: 4, name: 'andrew' } ]

-----------------------------------

delete all posts

[
  ResultSetHeader {
    fieldCount: 0,
    affectedRows: 2,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]

-----------------------------------

add posts

[
  ResultSetHeader {
    fieldCount: 0,
    affectedRows: 2,
    insertId: 3,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]

-----------------------------------

lists all posts

[
  { id: 3, content: 'john', authorId: 3 },
  { id: 4, content: 'andrew', authorId: 4 }
]

-----------------------------------

lists all users with related posts

user.id: 3
user.name: john
- post.id: 3
- post.authorId: 3
- post.content: john


user.id: 4
user.name: andrew
- post.id: 4
- post.authorId: 4
- post.content: andrew

-----------------------------------
```

try to run example files.
following example will works. 

```bash
$ pnpm node -r esbuild-register src/db/examplePlanetScaleDriverVariant.ts

delete all users

{
  headers: [],
  types: {},
  fields: [],
  rows: [],
  rowsAffected: 2,
  insertId: '0',
  size: 0,
  statement: 'delete from `users`',
  time: 8.631001
}

-----------------------------------

add users

{
  headers: [],
  types: {},
  fields: [],
  rows: [],
  rowsAffected: 2,
  insertId: '5',
  size: 0,
  statement: "insert into `users` (`id`, `name`) values (default, 'john'), (default, 'andrew')",
  time: 7.465092
}

-----------------------------------

list all users

[ { id: 5, name: 'john' }, { id: 6, name: 'andrew' } ]

-----------------------------------

delete all posts

{
  headers: [],
  types: {},
  fields: [],
  rows: [],
  rowsAffected: 2,
  insertId: '0',
  size: 0,
  statement: 'delete from `posts`',
  time: 7.254178
}

-----------------------------------

add posts

{
  headers: [],
  types: {},
  fields: [],
  rows: [],
  rowsAffected: 2,
  insertId: '5',
  size: 0,
  statement: "insert into `posts` (`id`, `content`, `author_id`) values (default, 'hello world', 5), (default, 'hello universe', 6)",
  time: 8.713751
}

-----------------------------------

lists all posts

[
  { id: 5, content: 'hello world', authorId: 5 },
  { id: 6, content: 'hello universe', authorId: 6 }
]

-----------------------------------

lists all users with related posts

user.id: 5
user.name: john
- post.id: 5
- post.authorId: 5
- post.content: hello world


user.id: 6
user.name: andrew
- post.id: 6
- post.authorId: 6
- post.content: hello universe

-----------------------------------
```