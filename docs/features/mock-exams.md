# Mock Exams

## Overview

Mock Exams allow users to simulate aviation certification exams by answering a randomized set of questions.

The feature provides:

- Exam generation
- Random question selection
- Answer submission
- Score calculation
- Pass/fail evaluation
- Exam history
- Study session registration on completion (`MOCK_EXAM`)

---

## Entities

### MockExam

Represents a generated exam.

Fields:

- userId
- subjectId
- totalQuestions
- correctAnswers
- score
- passingScore
- passed
- duration
- startedAt
- finishedAt

---

### MockExamQuestion

Represents the relationship between an exam and its questions.

Stores:

- Question order
- Selected alternative
- Correctness result

---

## API

### Create Mock Exam

```http
POST /api/v1/mock-exams
```

Generates a new exam with randomized questions from an active subject.

---

### List Mock Exams

```http
GET /api/v1/mock-exams
```

Returns user exam history.

---

### Subject Question Availability

```http
GET /api/v1/mock-exams/subjects-availability
```

Returns how many active questions are available per subject. Used by the frontend to disable subjects without enough questions for exam generation.

---

### Get Mock Exam

```http
GET /api/v1/mock-exams/:id
```

Returns exam details and questions.

---

### Finish Mock Exam

```http
POST /api/v1/mock-exams/:id/finish
```

Calculates:

- Correct answers
- Score percentage
- Pass/fail result

Also registers a `StudySession` with `studyType: MOCK_EXAM` for the subject.

---

## Business Rules

- Questions are randomly selected from active questions in the chosen subject.
- Only active questions can be used.
- Minimum exam size is 5 questions.
- Answers must belong to the exam questions.
- Score is calculated based on correct answers.
- Passing depends on `passingScore`.
- Subjects without enough questions must not allow exam creation.

---

## Frontend

Routes:

- `/mock-exams` — landing (create panel + history)
- `/mock-exams/[id]` — exam session and results

Feature module: `frontend/src/features/mock-exams/`
