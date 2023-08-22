INSERT INTO users (id, name, email, phone, password) VALUES 
  ('1', 'admin', 'example@email.com', '+11234567891', 'Password'),
  ('2', 'user', 'example2@email.com', '+11234567890', 'Password');

INSERT INTO user_groups (id, name, owner_id) VALUES 
  ('1', 'admin', '1'),
  ('2', 'user', '2');

INSERT INTO user_roles (id, name, owner_id) VALUES 
  ('1', 'Super', '1'),
  ('2', 'General', '1');

INSERT INTO user_meta (id, owner_id, user_groups, user_roles, uniq_customize) VALUES 
  ('1', '1', '1', '1', '1'),
  ('2', '2', '2', '2', '2');
