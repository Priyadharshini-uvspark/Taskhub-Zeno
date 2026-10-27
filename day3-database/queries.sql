-- 1. Count tasks by status for each project
SELECT
    p.id,
    p.name,
    t.status,
    COUNT(t.id) AS task_count
FROM "Project" p
LEFT JOIN "Task" t ON t.project_id = p.id
GROUP BY p.id, p.name, t.status
ORDER BY p.id, t.status;


-- 2. Find overdue tasks with the assignee's name
SELECT
    t.id,
    t.title,
    t.due_date,
    u.name AS assignee
FROM "Task" t
LEFT JOIN "User" u ON u.id = t.assignee_id
WHERE t.due_date < CURRENT_DATE
  AND t.status <> 'completed';


-- 3. Top 3 users by completed tasks this month
SELECT
    u.id,
    u.name,
    COUNT(t.id) AS completed_tasks
FROM "User" u
JOIN "Task" t ON t.assignee_id = u.id
WHERE t.status = 'completed'
  AND t.created_at >= DATE_TRUNC('month', CURRENT_DATE)
  AND t.created_at < DATE_TRUNC('month', CURRENT_DATE)
                        + INTERVAL '1 month'
GROUP BY u.id, u.name
ORDER BY completed_tasks DESC
LIMIT 3;


-- 4. List tasks with their project names
SELECT t.id, t.title, p.name AS project
FROM "Task" t
JOIN "Project" p ON p.id = t.project_id;


-- 5. List users who belong to each project
SELECT p.name AS project, u.name AS member, pm.role
FROM "ProjectMember" pm
JOIN "Project" p ON p.id = pm.project_id
JOIN "User" u ON u.id = pm.user_id;


-- 6. Count comments on each task
SELECT t.id, t.title, COUNT(c.id) AS comment_count
FROM "Task" t
LEFT JOIN "Comment" c ON c.task_id = t.id
GROUP BY t.id, t.title;


-- 7. Find tasks whose priority is higher than the average
-- priority rank of all tasks (using a numeric ranking)
SELECT id, title, priority
FROM "Task"
WHERE CASE priority
    WHEN 'low' THEN 1
    WHEN 'medium' THEN 2
    WHEN 'high' THEN 3
END > (
    SELECT AVG(
        CASE priority
            WHEN 'low' THEN 1
            WHEN 'medium' THEN 2
            WHEN 'high' THEN 3
        END
    )
    FROM "Task"
);


-- 8. Rank users by their number of completed tasks
SELECT
    u.name,
    COUNT(t.id) AS completed_tasks,
    RANK() OVER (ORDER BY COUNT(t.id) DESC) AS task_rank
FROM "User" u
LEFT JOIN "Task" t
    ON t.assignee_id = u.id
   AND t.status = 'completed'
GROUP BY u.id, u.name;


-- 9. Find projects with more than 5 tasks
SELECT p.id, p.name, COUNT(t.id) AS task_count
FROM "Project" p
JOIN "Task" t ON t.project_id = p.id
GROUP BY p.id, p.name
HAVING COUNT(t.id) > 5;


-- 10. Find users who have never been assigned a task
SELECT u.id, u.name
FROM "User" u
WHERE NOT EXISTS (
    SELECT 1
    FROM "Task" t
    WHERE t.assignee_id = u.id
);

-- run this line: & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d day3_db -f queries.sql