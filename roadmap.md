## todo
- [ ] `/users`
- [ ] `/user-meta`
- [ ] `/user-groups`
- [ ] `/user-roles`
- [ ] `/customize`
- [ ] `/events`
- [ ] `/documents`
- [ ] `/document-comments`
- [ ] `/projects`
- [ ] `/project-discussions`
- [ ] `/forums`
- [ ] `/forum-discussions`
- [ ] `/chats`
- [ ] `/help-desk`
- [ ] `/invoices`
- [ ] `/forms`
- [ ] `/form-responses`

Schema outlines can be [found here](https://docs.google.com/spreadsheets/d/1fAWWoETSTmDzuuDmBZ2Sve--pyLZQXDmEqsCzkTT0VE/edit#gid=0)

### Users.

The users table consists of the following fields 

- **id** UUID, not null
- **created_at** Timestamp, default now(), not null
- **updated_at** Timestamp, default now(), not null
- **name** String, not null
- **email** String, not null
- **phone** String, not null
- **password** String, not null

### User Meta.

The user meta table shares a relation to the `users->id` field. The table consists of the following fields

- **id** UUID, not null
- **created_at** Timestamp, default now(), not null
- **updated_at** Timestamp, default now(), not null
- **owner_id** UUID references Users->id, not null
- **user_groups** UUID references User Groups->id, not null
- **user_roles** UUID references User Roles->id, not null
- **uniq_customize** JSON 

### User Groups.

The user groups table shares a relation to the `users->id` field. The table consists of the following fields

- **id** UUID, not null
- **created_at** Timestamp, default now(), not null
- **updated_at** Timestamp, default now(), not null
- **name** String, not null
- **owner_id** UUID references Users->id, not null

### User Roles.

The user roles table shares a relation to the `users->id` field. The table consists of the following fields

- **id** UUID, not null
- **created_at** Timestamp, default now(), not null
- **updated_at** Timestamp, default now(), not null
- **name** String, not null
- **owner_id** UUID references Users->id, not null

### Customize.

The customize table shares a relation to the `tenants->id` field.  The table consists of the following fields

- **id** UUID, not null
- **created_at** Timestamp, default now(), not null
- **updated_at** Timestamp, default now(), not null
- **data** JSON
- **tenant_id** UUID references Tenants->id, not null

### Tenants.

The tenants table shares a relation to the `users->id` field. The table consists of the following fields

- **id** UUID, not null
- **created_at** Timestamp, default now(), not null
- **updated_at** Timestamp, default now(), not null
- **owner_id** UUID references Users->id, not null

### Media

- **id** UUID, not null
- **created_at** Timestamp, default now(), not null
- **updated_at** Timestamp, default now(), not null
- **owner_id** UUID references Users->id, not null
- **name** String
- **type** String
- **size** Big Int
- **data** BYTEA 
