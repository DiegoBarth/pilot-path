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

Generates a new exam with randomized questions.

---

### List Mock Exams

```http
GET /api/v1/mock-exams
```

Returns user exam history.

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

---

## Business Rules

- Questions are randomly selected.
- Only active questions can be used.
- Answers must belong to the exam questions.
- Score is calculated based on correct answers.
- Passing depends on passingScore.