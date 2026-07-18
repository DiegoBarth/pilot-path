
# Question Practice

## Overview

Question Practice allows users to answer aviation questions and track their learning performance.

Each answer attempt is stored, enabling future statistics and adaptive learning features.

---

## Entities

### UserQuestion

Stores a user's answer attempt.

Properties:

- User
- Question
- Selected alternative
- Correctness
- Response time
- Answer date

---

## Relationships

```mermaid
erDiagram

  User ||--o{ UserQuestion : answers

  Question ||--o{ UserQuestion : receives

  QuestionAlternative ||--o{ UserQuestion : selected
```

---

## API

### Submit Answer

```http
POST /api/v1/question-practice/:id/answer
```

Features:

- Validate selected alternative
- Calculate correctness
- Store response time
- Persist answer history

Authentication:

- Authenticated users

### Answer History

```http
GET /api/v1/question-practice/history
```

Returns previous answers from the authenticated user.

### Future Improvements

- Accuracy statistics
- Subject performance
- Weak area detection
- Study recommendations
- Adaptive difficulty