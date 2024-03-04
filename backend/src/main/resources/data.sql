INSERT INTO public.appuser (id, last_name, first_name, middle_name, username, password, avatar, account_nonexpired, account_nonlocked, credentials_nonexpired, is_enabled) VALUES (1, 'Admin', 'Admin', 'Admin', 'admin', '$2a$10$.Mpu96rUydo9RvNv.LykQOg72KUFLpZuQkHoNZ.3SHKg5Q00jwbly', null, true, true, true, true) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.role (id, role_name) VALUES (1, 'ROLE_ADMIN') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.role (id, role_name) VALUES (2, 'ROLE_USER') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.role (id, role_name) VALUES (3, 'ROLE_GUEST') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.appuser_role (appuser_id, role_id) VALUES (1, 1) ON CONFLICT (appuser_id, role_id) DO NOTHING;
SELECT setval('appuser_id_seq', nextval('appuser_id_seq'));