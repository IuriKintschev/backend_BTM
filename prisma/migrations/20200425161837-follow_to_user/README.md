# Migration `20200425161837-follow_to_user`

This migration has been generated by Iuri Kintschev at 4/25/2020, 4:18:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Follow" (
    "currentId" INTEGER   ,
    "followId" INTEGER NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,FOREIGN KEY ("currentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
) 

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200423215448-post_update_create_at..20200425161837-follow_to_user
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -15,8 +15,9 @@
   email    String  @unique
   password String  @default("")
   name     String?
   posts    Post[]
+  follows  Follow[]
 }
 model Post {
   id        Int     @default(autoincrement()) @id
@@ -25,5 +26,13 @@
   author    User?   @relation(fields: [authorId], references: [id])
   authorId  Int?
   createdAt DateTime   @default(now())
   updatedAt DateTime   @updatedAt
-}
+}
+
+model Follow {
+  id          Int     @default(autoincrement()) @id
+  currentId   Int?
+  current     User?   @relation(fields: [currentId], references: [id])
+
+  followId    Int
+}
```


