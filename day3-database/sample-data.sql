INSERT INTO "User" (name, email) VALUES
('Priya', 'priya@example.com'),
('Arun', 'arun@example.com');

INSERT INTO "Project" (name, owner_id) VALUES
('Website', 1);

INSERT INTO "ProjectMember" (user_id, project_id, role) VALUES
(1, 1, 'admin'),
(2, 1, 'member');

INSERT INTO "Task"
(project_id, title, status, priority, due_date, assignee_id)
VALUES
(1, 'Build homepage', 'completed', 'high', CURRENT_DATE - 2, 1),
(1, 'Fix login', 'todo', 'medium', CURRENT_DATE + 5, 2);

INSERT INTO "Comment" (task_id, user_id, content) VALUES
(1, 2, 'Looks good!');
