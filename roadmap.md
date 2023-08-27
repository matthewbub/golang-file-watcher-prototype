## todo

- [ ] Documents
- [ ] Comments 

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

### Comments.

The comments table consists of the following fields

- **id** UUID, not null
- **created_at** Timestamp, default now(), not null
- **updated_at** Timestamp, default now(), not null
- **user_id** UUID, not null
- **comment** String, not null

