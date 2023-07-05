INSERT INTO "public"."users" ("created_at", "auth_provider", "auth_uuid", "email", "first_name", "last_name")
VALUES (now(), 'email', 'b2a673fb-005f-4e02-b4a5-d20d64c995e0', 'user1@example.com', 'John', 'Doe'),
(now(), 'google', 'dcff4d17-4362-46f8-bfd7-f55332a3b738', 'user2@example.com', 'Jane', 'Smith');

INSERT INTO "public"."permissions" ("created_at", "updated_at", "name")
VALUES (now(), now(), 'read_permission'),
(now(), now(), 'write_permission'),
(now(), now(), 'delete_permission');

INSERT INTO "public"."roles" ("created_at", "updated_at", "name")
VALUES (now(), now(), 'admin'),
(now(), now(), 'editor'),
(now(), now(), 'viewer');

INSERT INTO "public"."roles_permissions_junction" ("created_at", "role_id", "permission_id", "updated_at")
VALUES (now(), 1, 1, now()),
(now(), 1, 2, now()),
(now(), 2, 2, now()),
(now(), 2, 3, now()),
(now(), 3, 1, now()),
(now(), 3, 3, now());

INSERT INTO "public"."user_logs" ("created_at", "user_id", "action")
VALUES (now(), 1, 'Logged in'),
(now(), 2, 'Created a new post'),
(now(), 1, 'Logged out');

INSERT INTO "public"."user_roles_junction" ("created_at", "updated_at", "role_id", "user_id")
VALUES (now(), now(), 1, 1),
(now(), now(), 2, 1),
(now(), now(), 3, 2);
