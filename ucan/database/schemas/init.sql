CREATE TABLE users (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  password TEXT NOT NULL
);

INSERT INTO users (id, name, email, phone, password) VALUES 
  ('1', 'admin', 'example@email.com', '+11234567891', 'Password'),
  ('2', 'user', 'example2@email.com', '+11234567890', 'Password');

CREATE TABLE user_groups (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES users (id)
);

INSERT INTO user_groups (id, name, owner_id) VALUES 
  ('1', 'admin', '1'),
  ('2', 'user', '2');

CREATE TABLE user_roles (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES users (id)
);

INSERT INTO user_roles (id, name, owner_id) VALUES 
  ('1', 'Super', '1'),
  ('2', 'General', '1');

CREATE TABLE tenants (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES users (id)
);

INSERT INTO tenants (id, name, owner_id) VALUES 
  ('1', 'Demo', '1'),
  ('2', 'Demo', '2');

CREATE TABLE media (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  owner_id TEXT NOT NULL,
  name TEXT,
  type TEXT,
  size INTEGER,
  data BLOB,
  FOREIGN KEY (owner_id) REFERENCES users (id)
);

CREATE TABLE customize (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  data TEXT,
  tenant_id TEXT NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants (id)
);

INSERT INTO customize (id, data, tenant_id) VALUES 
  ('1', '{"theme": "dark"}', '1'),
  ('2', '{"theme": "light"}', '2');

CREATE TABLE user_meta (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  owner_id TEXT NOT NULL,
  user_groups TEXT NOT NULL,
  user_roles TEXT NOT NULL,
  uniq_customize TEXT,
  FOREIGN KEY (owner_id) REFERENCES users (id),
  FOREIGN KEY (user_groups) REFERENCES user_groups (id),
  FOREIGN KEY (user_roles) REFERENCES user_roles (id)
);

INSERT INTO user_meta (id, owner_id, user_groups, user_roles, uniq_customize) VALUES 
  ('1', '1', '1', '1', '1'),
  ('2', '2', '2', '2', '2');
