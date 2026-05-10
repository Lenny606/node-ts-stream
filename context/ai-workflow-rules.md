# AI WORKFLOW RULES

## SPEC-DRIVEN WORKFLOW
This project strictly follows a **Spec-Driven Workflow**. Every implementation step must be grounded in the specifications provided in the `context/` directory.

### Core Principles
1.  **Context First**: Before any code change, always read and adhere to the files in the `context/` folder (e.g., `project-overview.md`, `database-model.md`, etc.).
2.  **No Deviations**: Do not implement features, components, or logic that are not explicitly defined in the specifications.
3.  **Strict Adherence**: If a specification exists for a component or workflow, it must be followed precisely. If something is missing, ask for clarification or propose an update to the spec before implementation.
4.  **Planning Phase**: For any non-trivial task, always start with a Research and Planning phase, updating the `implementation_plan.md` and `task.md` artifacts.

### Development Lifecycle
1.  **Spec Review**: Analyze the relevant specification files in the `context/` folder.
2.  **Planning**: Create or update the `implementation_plan.md` to reflect the intended changes based on the specs.
3.  **Approval**: Wait for user feedback/approval on the plan if the change is significant.
4.  **Execution**: Implement the changes, tracking progress in `task.md`.
5.  **Verification**: Verify the implementation against the "Success Criteria" defined in the `project-overview.md`.

## LIMITATIONS
- **No Unsolicited Features**: Do not add extra "nice-to-have" features unless they are requested or documented in the specs.
- **Scope Awareness**: Always check the "In Scope" and "Out of Scope" sections in `project-overview.md` before starting work.
- **Database Consistency**: Use only the designated database (PostgreSQL) and ORM (Prisma) as defined in the stack.
- **Progress Tracking**: Always update `progress-tracker.md` after every task completion or significant project update.
