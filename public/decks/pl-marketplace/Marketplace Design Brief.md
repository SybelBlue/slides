# PrairieLearn Marketplace — Design Brief for Slide Generation

## Purpose

PrairieLearn needs a marketplace for reusable educational materials that goes beyond today's simple sharing model.

The goal is to create a **versioned, dependency-aware ecosystem for educational content and software** that supports instructors, content authors, and researchers without forcing all of those users into the same responsibilities.

A useful framing is:

> **A package registry and marketplace for educational software and content, not merely a sharing gallery.**

---

## Primary User Groups

### Instructors

Instructors are the primary consumers of marketplace content.

Their main priorities are:

- Quickly discovering useful content.
- Importing or enabling content with minimal setup.
- Knowing that imported content will remain stable during a course or semester.
- Avoiding unexpected upstream changes.
- Avoiding unnecessary technical responsibility for maintaining reused content.

### Content Authors

Content authors create questions, elements, datasets, helper libraries, and other reusable materials.

Their main priorities are:

- Tracking what their content depends on.
- Understanding what other content depends on their work.
- Managing versions and releases.
- Keeping compatible packages working together.
- Communicating breaking changes or required upgrades.
- Preserving attribution and provenance.

Content authors will often also act as maintainers, but authorship and maintainership should not be treated as the same concept.

### Researchers

Researchers may publish educational materials as part of research projects, studies, grants, or curriculum development.

Their main priorities are:

- Receiving clear authorship credit.
- Tracking who is using their content.
- Understanding where and how their content is being deployed.
- Preserving provenance and potentially research-related metadata.
- Avoiding an assumption of indefinite maintenance responsibility.

Researchers **must be able to remain authors even when they are no longer maintainers**.

---

## First-Class Role Distinctions

The marketplace should model these relationships separately from the beginning.

### Authorship

**Who created the work?**

Authorship represents:

- Credit.
- Provenance.
- Scholarly or creative contribution.
- Historical responsibility for the original work.

Authorship should generally be durable and should not disappear when maintenance responsibility changes.

### Maintainership

**Who is currently responsible for keeping the package functional?**

Maintainership may include:

- Fixing bugs.
- Updating dependencies.
- Maintaining compatibility with PrairieLearn.
- Reviewing contributions.
- Publishing new versions.
- Responding to breaking changes.

Maintenance responsibility should be transferable without rewriting authorship history.

### Publication

**Who has authority to publish or release the package?**

This may be:

- An individual.
- A project team.
- A university.
- A research group.
- An organization.

Publication authority may overlap with maintainership, but it does not need to.

### Consumption

**Who is using the package?**

For most instructors, marketplace participation should default to consumption without implying authorship or maintenance responsibility.

---

## Important Design Requirement

> **Using, importing, or adapting content must not automatically make an instructor a maintainer.**

This is especially important for instructors, who may want high-quality reusable content without taking on responsibility for keeping the original package functional.

Similarly:

- A researcher may be an author without being a maintainer.
- A content author may also be a maintainer.
- A maintainer may take over a package without becoming its original author.
- Organizations may maintain packages created by individuals or research groups.

The system should therefore avoid a single generic concept such as **owner** when several distinct relationships actually exist.

---

## Types of Content the Marketplace Must Support

The marketplace needs to support much more than complete courses or individual questions.

Potential package types include:

### Course and Assessment Content

- Questions.
- Question collections.
- Assessments.
- Course modules.
- Learning-objective collections.
- Reusable curricular units.

### PrairieLearn Elements

Reusable PrairieLearn elements or components that extend the question authoring system.

### Shared Data Packages

Examples include:

- Periodic tables.
- Unit-circle data.
- Reference tables.
- Mathematical datasets.
- Constants and lookup tables.
- Shared configuration data.

These may correspond to course-level files or other shared resources.

### Helper Code and Libraries

Examples include:

- Python helper functions.
- Grading utilities.
- Symbolic mathematics helpers.
- Randomization utilities.
- Domain-specific libraries.
- Shared JavaScript or other runtime code.

### Content Databases

Some questions may depend on structured collections that must be indexed or processed before use.

Examples might include:

- Proof databases.
- Problem banks.
- Graph or concept databases.
- Large collections of parameterized source material.

These dependencies need to be represented explicitly rather than copied informally between courses.

---

## Current OER-Based Model

The current ecosystem largely uses an **Open Educational Resources (OER)** approach.

A typical publication pattern is:

1. Create a demo PrairieLearn course containing the material.
2. Publish the course publicly.
3. Expose its source.
4. Allow instructors to inspect and copy the content.

This has advantages for openness and transparency, but it also creates limitations for a package marketplace.

### Assessment Security

Public source availability can expose:

- Correct answers.
- Grading logic.
- Randomization logic.
- Answer-generation code.
- Instructor-only metadata.

Students may therefore be able to obtain information that compromises assessments.

A marketplace may need to distinguish among:

- Public metadata.
- Public instructional content.
- Restricted source.
- Instructor-only resources.
- Runtime dependencies.

This raises possible needs around **authentication and authorization**.

---

## Existing PrairieLearn Sharing Model

PrairieLearn already contains course-sharing workflows, including interfaces for sharing questions and related content.

The marketplace should ideally be integrated into the existing PrairieLearn course authoring experience rather than becoming an entirely separate workflow.

However, the current sharing approaches do not fully solve the marketplace problem.

---

## Failure Mode: Sharing by Copy

Copying content gives the consuming course its own local version.

### Advantages

- The instructor controls the copied files.
- Upstream changes cannot unexpectedly alter a live course.
- Local modification is straightforward.

### Problems

- Provenance can be lost.
- Dependency information can be lost.
- Bug fixes do not propagate automatically.
- Upstream improvements are difficult to discover or merge.
- Different copies quickly diverge.
- Authors cannot reliably determine where their content is being used.
- Consumers may unknowingly retain vulnerable or broken code.

Copying therefore provides isolation but poor lifecycle management.

---

## Failure Mode: Sharing by Link

Linking to a shared source preserves the relationship to upstream content.

### Advantages

- Dependency relationships remain clearer.
- Updates can propagate.
- Shared maintenance becomes possible.
- Duplication is reduced.

### Problems

If the linked content does not support version pinning, downstream courses may inherit changes unexpectedly.

For example:

- A bug introduced upstream could immediately affect consumers.
- A question could change between semesters.
- A dependency could make a breaking release.
- Course behavior could change without the instructor intentionally updating anything.

Linking therefore provides dependency continuity but insufficient reproducibility unless versions can be pinned.

---

## Marketplace Model

A marketplace should combine the useful properties of copying and linking.

The desired model is closer to a software package ecosystem:

> **Discover → Install → Pin → Upgrade intentionally**

A consuming course should be able to declare:

- Which package it uses.
- Which version it uses.
- Which dependencies that package requires.
- Whether updates are available.
- Whether an update contains breaking changes.

This creates a stable relationship between upstream packages and downstream courses without requiring permanent copies or uncontrolled live links.

---

## Core System Capabilities

### Versioned Packages

Marketplace items should have explicit versions.

The system should support:

- Stable releases.
- Version histories.
- Upgrade paths.
- Breaking-change signaling.
- Deprecation.
- Version pinning.

Semantic versioning may be worth investigating, though educational content may require conventions beyond traditional software versioning.

### Explicit Dependency Tracking

Packages should be able to declare dependencies on other packages.

Examples:

- A question package depends on a custom PrairieLearn element.
- An element depends on a Python helper library.
- A problem bank depends on a shared data package.
- A proof question depends on an indexed proof database.

The system should understand these relationships instead of relying on authors to manually copy the correct supporting files.

### Transitive Dependencies

Dependencies may themselves have dependencies.

The marketplace therefore needs to consider:

- Dependency resolution.
- Version compatibility.
- Conflicting requirements.
- Installation of dependency trees.
- Upgrade behavior.

### Reproducibility

A course should be able to preserve exactly which versions were used during a particular term or assessment.

This may imply concepts similar to:

- Package manifests.
- Lockfiles.
- Frozen dependency graphs.

### Safe Upgrades

Updates should be discoverable without automatically changing live course behavior.

A likely workflow is:

1. Instructor is notified that a newer compatible version exists.
2. The system explains relevant changes.
3. The instructor chooses whether to update.
4. The course records the new version.

### Provenance

The system should retain information about:

- Original authors.
- Current maintainers.
- Package lineage.
- Forks or derived packages.
- Original source package.
- Version history.

### Usage Tracking

Researchers and authors may need visibility into adoption.

Possible metrics include:

- Number of courses using a package.
- Number of institutions using it.
- Active versus historical installations.
- Installed versions.
- Types of courses or subject areas using it.

Privacy and institutional policies will determine how granular this information can be.

---

## Authentication and Authorization

Because some packages may contain assessment-sensitive source code, the marketplace may need multiple access levels.

Potential distinctions include:

- Publicly visible metadata.
- Public source.
- Authenticated instructor access.
- Institution-restricted access.
- Private packages.
- Organization-only packages.

Important questions include:

- How is instructor status validated?
- Can students have PrairieLearn accounts that must not receive instructor-level package source?
- Can packages expose metadata publicly while protecting implementation details?
- Can package binaries or runtime artifacts be distributed without exposing source?
- How does this interact with OER expectations?

---

## Integration with PrairieLearn

The marketplace should ideally feel like part of the existing PrairieLearn course workflow.

Potential instructor experience:

1. Open a PrairieLearn course.
2. Browse or search marketplace content.
3. Preview a question, element, dataset, or package.
4. Select a version.
5. Add it to the course.
6. Automatically resolve required dependencies.
7. See the package in the course's dependency manifest.
8. Receive optional notifications about available updates.
9. Upgrade intentionally when appropriate.

This should be more robust than today's concept of simply **sharing** content.

---

## External Models Worth Studying

The marketplace should draw from existing package and extension ecosystems rather than inventing all concepts from scratch.

### VS Code Marketplace

Useful concepts to examine:

- Extension discovery.
- Publisher identity.
- Version histories.
- Installation workflow.
- Update workflow.
- Compatibility metadata.
- Marketplace presentation.

### npm / pnpm Ecosystem

Useful concepts to examine:

- Package manifests.
- Explicit dependencies.
- Semantic versioning.
- Transitive dependency resolution.
- Lockfiles.
- Package registries.
- Version pinning.
- Deprecation.
- Package ownership and maintainers.

The educational-content use case differs from software packages, but these systems offer mature patterns for dependency and lifecycle management.

---

## Key Design Tension

The marketplace must balance four goals:

1. **Ease of reuse**  
   Instructors should be able to import useful material quickly.

2. **Reproducibility**  
   A course should not change unexpectedly because upstream content changed.

3. **Maintainability**  
   Authors and maintainers need a way to distribute fixes and compatible updates.

4. **Attribution and research visibility**  
   Authorship and adoption should remain visible even when maintenance responsibility changes.

---

## Open Design Questions

### Unit of Publication

What exactly is a package?

Possibilities include:

- A single question.
- A group of questions.
- An element.
- A helper library.
- A dataset.
- A full module.
- A complete course.
- A bundle containing several package types.

The system may need nested or composable packages.

### Versioning

- What changes require a new version?
- Should educational content use semantic versioning?
- What constitutes a breaking change for a question?
- Can metadata changes occur without changing the pedagogical content version?

### Dependency Management

- How are dependencies declared?
- How are conflicting versions resolved?
- Can multiple versions coexist?
- How are transitive dependencies represented?
- Can packages depend on particular PrairieLearn versions?

### Local Modification

If an instructor modifies installed marketplace content:

- Does the package become detached?
- Is it treated as a fork?
- Can changes be layered as patches?
- Can the instructor still receive upstream updates?
- Can improvements be contributed back?

### Authorship and Maintainership

- Can authorship be changed?
- Can maintainership be transferred?
- Can maintainers be individuals or organizations?
- What happens to abandoned packages?
- Can a package request new maintainers?
- Can a researcher remain permanently credited while another group maintains the work?

### Publication Authority

- Who can publish new versions?
- Are packages published by individuals, organizations, or both?
- How is publisher identity validated?
- Can maintainers publish without being authors?

### Usage Analytics

- What usage information should authors and researchers see?
- What counts as a package installation?
- Should forks count separately?
- How can usage be measured without compromising instructor or student privacy?

### Source Visibility

- Which package types must remain open source?
- Which implementation details can be restricted?
- How can assessment security coexist with OER goals?
- Can protected implementation code still be audited by trusted instructors?

---

## Suggested Slide Story Arc

### Slide 1 — Why a Marketplace?

PrairieLearn increasingly needs reusable content that behaves more like an ecosystem of packages than a collection of shared files.

### Slide 2 — Three Major Constituencies

Introduce:

- Instructors.
- Content authors.
- Researchers.

Show that each group wants something different from the marketplace.

### Slide 3 — The Marketplace Is Bigger Than Questions

Show the range of publishable artifacts:

- Questions.
- Elements.
- Data.
- Helper libraries.
- Databases.
- Course modules.

### Slide 4 — Today's OER Model

Explain the current demo-course publication model and its advantages.

Then introduce the assessment-security and lifecycle-management limitations.

### Slide 5 — Copy vs. Link

Contrast the two existing sharing patterns.

**Copy**

- Stable.
- Editable.
- Loses dependency and update relationships.

**Link**

- Preserves upstream relationship.
- Supports shared maintenance.
- Unsafe without version pinning.

### Slide 6 — The Package Model

Introduce:

> **Discover → Install → Pin → Upgrade intentionally**

Compare the desired marketplace to package managers and extension marketplaces.

### Slide 7 — Versions and Dependencies

Show how a question might depend on:

- An element.
- A helper library.
- A dataset.

Emphasize explicit and transitive dependency tracking.

### Slide 8 — Authorship Is Not Maintainership

This should be a major design principle.

Show separate relationships:

- Author.
- Maintainer.
- Publisher.
- Consumer.

Emphasize that instructors should not become maintainers merely by adopting content.

### Slide 9 — Research and Provenance

Show why researchers need:

- Durable authorship.
- Usage information.
- Provenance.
- Freedom from indefinite maintenance responsibility.

### Slide 10 — Authentication and Source Protection

Explain the tension between:

- OER openness.
- Instructor access.
- Assessment security.

Introduce the possibility of different visibility and authorization levels.

### Slide 11 — PrairieLearn-Native Workflow

Show a possible user flow:

**Browse → Preview → Select version → Install → Resolve dependencies → Use → Upgrade intentionally**

### Slide 12 — Models to Learn From

Reference:

- VS Code Marketplace.
- npm / pnpm.

Focus on the concepts worth borrowing rather than presenting them as direct templates.

### Slide 13 — Core Design Requirements

Summarize:

- Versioned packages.
- Dependency tracking.
- Reproducibility.
- Safe upgrades.
- Provenance.
- Separate authorship and maintainership.
- Usage tracking.
- Appropriate access control.

### Slide 14 — Open Questions

End with the unresolved design questions that need stakeholder input:

- What is the package boundary?
- What does versioning mean for educational content?
- How are local modifications handled?
- What source remains public?
- Who can publish and maintain packages?
- What adoption data is appropriate to expose?

---

## Concise Design Principle

> **PrairieLearn's marketplace should let instructors consume stable, versioned educational packages without inheriting maintenance responsibility, while preserving dependencies, authorship, provenance, and intentional upgrade paths.**
