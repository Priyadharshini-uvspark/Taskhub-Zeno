CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Project" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    owner_id INTEGER NOT NULL REFERENCES "User"(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ProjectMember" (
    user_id INTEGER REFERENCES "User"(id) ON DELETE CASCADE,
    project_id INTEGER REFERENCES "Project"(id) ON DELETE CASCADE,
    role VARCHAR(30) NOT NULL DEFAULT 'member',
    PRIMARY KEY (user_id, project_id),
    CHECK (role IN ('admin', 'member'))
);

CREATE TABLE "Task" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES "Project"(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'todo',
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    due_date DATE,
    assignee_id INTEGER REFERENCES "User"(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (status IN ('todo', 'in_progress', 'completed')),
    CHECK (priority IN ('low', 'medium', 'high'))
);

CREATE TABLE "Comment" (
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL REFERENCES "Task"(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES "User"(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Attachment" (
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL REFERENCES "Task"(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_by INTEGER REFERENCES "User"(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ActivityLog" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "User"(id) ON DELETE SET NULL,
    project_id INTEGER REFERENCES "Project"(id) ON DELETE SET NULL,
    task_id INTEGER REFERENCES "Task"(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
