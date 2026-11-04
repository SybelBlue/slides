<!-- .slide: class="rs-center" -->

# General PrairieLearn Demo

<p class="rs-lede">Mariana Silva</p>

<p class="rs-citation">
  Teaching Associate Professor, University of Illinois Urbana-Champaign<br />
  Co-founder and CEO, PrairieLearn, Inc.
</p>

---

### Sophisticated Questions

<div class="rs-grid cols-2 gpd-split">
  <div>
    <ul>
      <li>Do not want to dumb things down</li>
      <li>Want complex and authentic questions that are auto-graded with quick feedback</li>
    </ul>
    <img
      src="decks/general-pl-demo/imgs/proof-drag-drop.gif"
      alt="Drag-and-drop proof question where students order statements to prove that the sum of two even numbers is even"
      style="object-fit: contain"
    />
  </div>
  <div class="gpd-shots">
    <img
      src="decks/general-pl-demo/imgs/sophisticated-demo-graph.png"
      alt="PrairieLearn question where students sketch a graph and receive instant feedback"
      style="object-fit: contain"
    />
    <img
      src="decks/general-pl-demo/imgs/sophisticated-demo-fbd.png"
      alt="PrairieLearn question with an interactive free body diagram of a beam"
      style="object-fit: contain"
    />
  </div>
</div>

Note:
Elements to do sophisticated things:

- code for instant feedback
- interactive free body diagram
- fraida example
- videos for FBD and coding

+++

### Question Generators

- Generators create many versions of the question
- Enables re-use (homework, exams, across terms)
- Students can practice on different variants

<div class="rs-grid cols-2 gpd-shots">
  <figure>
    <img
      src="decks/general-pl-demo/imgs/generator-number-input.png"
      alt="Randomized question asking students to solve for c given two random numbers a and b"
      style="object-fit: contain"
    />
    <figcaption><code>server.py</code> picks new values for each variant</figcaption>
  </figure>
  <figure>
    <img
      src="decks/general-pl-demo/imgs/generator-symbolic-input.png"
      alt="Randomized symbolic question asking students to differentiate a polynomial"
      style="object-fit: contain"
    />
    <figcaption>Randomized symbolic calculations</figcaption>
  </figure>
</div>

Note:
Let students retry different variants of the same question several times until mastery is achieved.

No more waiting period for the graded assignments with feedback (which often were not even looked at).

--- <!-- .slide: data-auto-animate -->

## PrairieLearn course

<div class="rs-grid cols-3 gpd-levels">
  <div class="rs-card" data-id="level-instances">
    <strong>Course instances</strong>
    <p>An offering of a course: semester, section of a larger course, etc.</p>
  </div>
  <div class="rs-card" data-id="level-assessments">
    <strong>Assessments</strong>
    <p>What students complete during a course offering, for example homeworks and exams</p>
  </div>
  <div class="rs-card" data-id="level-questions">
    <strong>Questions</strong>
    <p>Individual problems included in an assessment</p>
  </div>
</div>

--- <!-- .slide: data-auto-animate -->

## PrairieLearn course

<div class="rs-grid cols-3 gpd-levels">
  <div class="rs-card primary" data-id="level-instances">
    <strong>Course instances</strong>
    <p>An offering of a course: semester, section of a larger course, etc.</p>
  </div>
  <div class="rs-card gpd-dim" data-id="level-assessments">
    <strong>Assessments</strong>
  </div>
  <div class="rs-card gpd-dim" data-id="level-questions">
    <strong>Questions</strong>
  </div>
</div>

+++

### Course instance example

<div class="rs-grid cols-2 gpd-split">
  <img
    src="decks/general-pl-demo/imgs/course-instance-modules.png"
    alt="Course instance assessment list grouped by module, with lessons, homeworks, demos, quizzes and group activities"
    style="object-fit: contain"
  />
  <div class="gpd-assessment-types">
    <div class="rs-card">
      <strong>Summative Assessments</strong>
      <ul>
        <li>Frequent low-stake exams (bi-weekly)</li>
        <li>Partial credit opportunities</li>
        <li>Practice Quiz includes the same pool of questions</li>
      </ul>
    </div>
    <div class="rs-card secondary">
      <strong>Formative Assessments</strong>
      <ul>
        <li>Unlimited (or many) attempts</li>
        <li>Instant feedback</li>
        <li>Chance to collaborate with peers</li>
        <li>Self-paced (mostly asynchronous)</li>
        <li>Flexible deadlines</li>
      </ul>
    </div>
  </div>
</div>

Note:
For my formative assessments, I give students unlimited attempts, each of them autograded with instant feedback. They can create many variants of the same question, and show mastery by getting the question correctly 2-3 times in order to get full credit. These assignments are mostly completed asynchronously, with the exception of the group activity completed during class time. Students are encouraged to work with each other outside of class time. And I have adopted a flexible deadline, which I will discuss later in this talk.

For the summative assessments, I adopted bi-weekly quizzes, each covering 2-3 modules. In these quizzes, the questions are fixed for each student (but randomized among students in the class). Students can retry each question for partial credit when they get their first attempt marked as incorrect. I also provide a practice quiz to students the week prior to each quiz, which is generated by the same file that generates their actual quiz.

+++

### Course instance organized by Assessment Set

<img
  class="gpd-tall"
  src="decks/general-pl-demo/imgs/assessment-sets.png"
  alt="Course instance assessment list grouped into homeworks and quizzes"
  style="object-fit: contain"
/>

--- <!-- .slide: data-auto-animate -->

## PrairieLearn course

<div class="rs-grid cols-3 gpd-levels">
  <div class="rs-card gpd-dim" data-id="level-instances">
    <strong>Course instances</strong>
  </div>
  <div class="rs-card primary" data-id="level-assessments">
    <strong>Assessments</strong>
    <p>What students complete during a course offering, for example homeworks and exams</p>
  </div>
  <div class="rs-card gpd-dim" data-id="level-questions">
    <strong>Questions</strong>
  </div>
</div>

+++

### Assessments with unlimited practice

<div class="rs-grid cols-2 gpd-pair">
  <img
    src="decks/general-pl-demo/imgs/hw8-overview-0.png"
    alt="Homework 8 overview with 0 of 15 points earned"
    style="object-fit: contain"
  />
  <img
    src="decks/general-pl-demo/imgs/hw8-matrix-norm.png"
    alt="Matrix norm question showing a unit ball transformed by a random matrix"
    style="object-fit: contain"
  />
</div>

+++

### Assessments with unlimited practice

<div class="rs-grid cols-2 gpd-pair">
  <img
    src="decks/general-pl-demo/imgs/hw8-overview-1.png"
    alt="Homework 8 overview with 1 of 15 points earned"
    style="object-fit: contain"
  />
  <img
    src="decks/general-pl-demo/imgs/hw8-matrix-norm-correct.png"
    alt="Matrix norm question graded correct"
    style="object-fit: contain"
  />
</div>

+++

### Assessments with unlimited practice

<div class="rs-grid cols-2 gpd-pair">
  <img
    src="decks/general-pl-demo/imgs/hw8-overview-1.png"
    alt="Homework 8 overview with 1 of 15 points earned"
    style="object-fit: contain"
  />
  <img
    src="decks/general-pl-demo/imgs/hw8-is-norm.png"
    alt="Multiple-choice question asking whether a given function is a norm"
    style="object-fit: contain"
  />
</div>

+++

### Assessments with unlimited practice

<div class="rs-grid cols-2 gpd-pair">
  <img
    src="decks/general-pl-demo/imgs/hw8-overview-2.png"
    alt="Homework 8 overview with 2 of 15 points earned"
    style="object-fit: contain"
  />
  <img
    src="decks/general-pl-demo/imgs/hw8-is-norm-correct.png"
    alt="Is-it-a-norm question graded correct"
    style="object-fit: contain"
  />
</div>

+++

### Assessments with unlimited practice

<div class="rs-grid cols-2 gpd-pair">
  <img
    src="decks/general-pl-demo/imgs/hw8-overview-2.png"
    alt="Homework 8 overview with 2 of 15 points earned"
    style="object-fit: contain"
  />
  <img
    src="decks/general-pl-demo/imgs/hw8-matrix-norm-correct.png"
    alt="Matrix norm question graded correct"
    style="object-fit: contain"
  />
</div>

+++

### Assessments with unlimited practice

<div class="rs-grid cols-2 gpd-pair">
  <img
    src="decks/general-pl-demo/imgs/hw8-overview-2.png"
    alt="Homework 8 overview with 2 of 15 points earned"
    style="object-fit: contain"
  />
  <img
    src="decks/general-pl-demo/imgs/hw8-matrix-norm-new-variant.png"
    alt="New variant of the matrix norm question with a different matrix and unit ball"
    style="object-fit: contain"
  />
</div>

+++

### Assessments without variants

<div class="rs-grid cols-2 gpd-pair">
  <img
    src="decks/general-pl-demo/imgs/quiz3-overview.png"
    alt="Quiz 3 overview listing unanswered questions with their available points"
    style="object-fit: contain"
  />
  <img
    src="decks/general-pl-demo/imgs/quiz3-q1-area.png"
    alt="Quiz question estimating the area of a figure with the Monte Carlo method"
    style="object-fit: contain"
  />
</div>

+++

### Assessments without variants

<div class="rs-grid cols-2 gpd-pair">
  <img
    src="decks/general-pl-demo/imgs/quiz3-overview.png"
    alt="Quiz 3 overview listing unanswered questions with their available points"
    style="object-fit: contain"
  />
  <img
    src="decks/general-pl-demo/imgs/quiz3-q4-monte-carlo.png"
    alt="Quiz question on Monte Carlo convergence for a prize wheel"
    style="object-fit: contain"
  />
</div>

+++

### Assessments without variants

<div class="rs-grid cols-2 gpd-pair">
  <img
    src="decks/general-pl-demo/imgs/quiz3-overview.png"
    alt="Quiz 3 overview listing unanswered questions with their available points"
    style="object-fit: contain"
  />
  <img
    src="decks/general-pl-demo/imgs/quiz3-q5-wheel.png"
    alt="Coding question simulating a prize wheel"
    style="object-fit: contain"
  />
</div>

+++

### Course instance

<div class="gpd-end-of-term">
  <ol class="gpd-question-list">
    <li class="rs-card outline">Question 1</li>
    <li class="rs-card outline">Question 2</li>
    <li class="rs-card outline">Question 3</li>
    <li class="rs-card outline">Question 4</li>
    <li class="rs-card outline">Question 5</li>
    <li class="rs-card outline">Question 6</li>
  </ol>
  <img
    src="decks/general-pl-demo/imgs/course-instance-modules.png"
    alt="Course instance assessment list grouped by module"
    style="object-fit: contain"
  />
  <figure class="gpd-copy">
    <img
      src="decks/general-pl-demo/imgs/copy-icon.jpeg"
      alt="Copy icon"
      style="object-fit: contain"
    />
    <figcaption>End of term</figcaption>
  </figure>
</div>

--- <!-- .slide: data-auto-animate -->

## PrairieLearn course

<div class="rs-grid cols-3 gpd-levels">
  <div class="rs-card gpd-dim" data-id="level-instances">
    <strong>Course instances</strong>
  </div>
  <div class="rs-card gpd-dim" data-id="level-assessments">
    <strong>Assessments</strong>
  </div>
  <div class="rs-card primary" data-id="level-questions">
    <strong>Questions</strong>
    <p>Individual problems included in an assessment</p>
  </div>
</div>

+++

### Simple question generator: add numbers

<div class="gpd-add-numbers">
  <figure class="gpd-server">
    <figcaption><code>server.py</code></figcaption>
    <img
      src="decks/general-pl-demo/imgs/add-numbers-server-py.png"
      alt="server.py generate function that samples two random integers and stores their sum as the correct answer"
      style="object-fit: contain"
    />
  </figure>
  <figure class="gpd-html">
    <figcaption><code>question.html</code></figcaption>
    <img
      src="decks/general-pl-demo/imgs/add-numbers-question-html.png"
      alt="question.html with a pl-question-panel and a pl-integer-input for c"
      style="object-fit: contain"
    />
  </figure>
  <figure class="gpd-student">
    <figcaption>Student view</figcaption>
    <img
      src="decks/general-pl-demo/imgs/add-numbers-student-view.png"
      alt="Rendered question asking for the sum of two numbers with an input box"
      style="object-fit: contain"
    />
  </figure>
</div>

+++

### Question types

<div class="rs-carousel auto-advance gpd-carousel" aria-label="PrairieLearn question type examples">
  <figure class="rs-carousel-item">
    <img
      src="decks/general-pl-demo/imgs/type-multiple-choice-images.png"
      alt="Multiple-choice question with images of birds as answer options"
      style="object-fit: contain"
    />
    <figcaption>Multiple choice with images</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-checkboxes.png"
      alt="Checkbox question asking students to select all prime numbers"
      style="object-fit: contain"
    />
    <figcaption>Checkboxes</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-number-input.png"
      alt="Number input question with random parameters"
      style="object-fit: contain"
    />
    <figcaption>Number input</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-integer-input.png"
      alt="Integer input question converting an angle from radians to degrees"
      style="object-fit: contain"
    />
    <figcaption>Integer input</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-dynamic-figure.png"
      alt="Question with a dynamically generated plot of a circle"
      style="object-fit: contain"
    />
    <figcaption>Dynamic figures</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-matrix-input.png"
      alt="Matrix component input for the adjacency matrix of a random graph"
      style="object-fit: contain"
    />
    <figcaption>Matrix input</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-string-input.png"
      alt="String input question asking for the plural of leaf"
      style="object-fit: contain"
    />
    <figcaption>String input</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-symbolic-input.png"
      alt="Symbolic input question asking for the derivative of a polynomial"
      style="object-fit: contain"
    />
    <figcaption>Symbolic input</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-dropdown.png"
      alt="Dropdown question asking what color the sky is"
      style="object-fit: contain"
    />
    <figcaption>Dropdown</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-matching.png"
      alt="Matching question pairing nations with capital cities"
      style="object-fit: contain"
    />
    <figcaption>Matching</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img
      src="decks/general-pl-demo/imgs/type-proof-order.png"
      alt="Drag-and-drop proof construction question"
      style="object-fit: contain"
    />
    <figcaption>Proof ordering</figcaption>
  </figure>
</div>

+++

### External grader for coding questions

<div class="rs-grid cols-3 gpd-shots">
  <a href="https://us.prairielearn.com/pl/course_instance/4970/instructor/question/9063234/preview" target="_blank">
    <img
      src="decks/general-pl-demo/imgs/grader-cpp.png"
      alt="C++ autograder question computing sales tax"
      style="object-fit: contain"
    />
  </a>
  <a href="https://www.prairielearn.org/pl/course/293/question/9060999/preview" target="_blank">
    <img
      src="decks/general-pl-demo/imgs/grader-python.png"
      alt="Python autograder question writing code with numpy"
      style="object-fit: contain"
    />
  </a>
  <a href="https://us.prairielearn.com/pl/course_instance/4970/instructor/question/9058239/preview" target="_blank">
    <img
      src="decks/general-pl-demo/imgs/grader-java.png"
      alt="Java autograder question implementing a square method"
      style="object-fit: contain"
    />
  </a>
</div>

+++

### Workspaces and containerized grading

<div class="rs-grid cols-2 gpd-workspaces">
  <div>
    <p class="rs-small">Workspaces run inside PrairieLearn for Jupyter Notebooks, VS Code, R Studio, and more</p>
    <img
      src="decks/general-pl-demo/imgs/workspace-question.png"
      alt="Workspace question with an Open workspace button and a table of variables to define"
      style="object-fit: contain"
    />
    <p class="rs-small">
      <a href="https://www.prairielearn.org/pl/course/293/question/9060669/preview" target="_blank">Try this question!</a>
    </p>
    <div class="gpd-logos">
      <img src="decks/general-pl-demo/imgs/logo-elb.png" alt="Elastic Load Balancing" />
      <img src="decks/general-pl-demo/imgs/logo-aws.png" alt="AWS" />
      <img src="decks/general-pl-demo/imgs/logo-docker.png" alt="Docker" />
    </div>
    <p class="rs-small">Safely auto-graded at scale in course-specific containers</p>
  </div>
  <div>
    <img
      src="decks/general-pl-demo/imgs/workspace-jupyterlab.png"
      alt="JupyterLab workspace running inside PrairieLearn"
      style="object-fit: contain"
    />
    <p class="rs-small"><code>#grade</code> cells are auto-graded for immediate feedback</p>
    <img
      src="decks/general-pl-demo/imgs/workspace-notebook-grade.png"
      alt="Graded notebook cells with feedback"
      style="object-fit: contain"
    />
  </div>
</div>

+++

### Manual Grading

<div class="rs-grid cols-2 gpd-shots">
  <a href="https://us.prairielearn.com/pl/course_instance/4970/instructor/question/6297687/preview" target="_blank">
    <img
      src="decks/general-pl-demo/imgs/manual-markdown.png"
      alt="Markdown editor question with live preview for a written proof"
      style="object-fit: contain"
    />
  </a>
  <img
    src="decks/general-pl-demo/imgs/manual-file-upload.png"
    alt="File upload question for a hand-written solution that is graded manually"
    style="object-fit: contain"
  />
</div>
