# Flashcard Learning System

## Overview

The Flashcard Learning System provides active recall and spaced repetition capabilities to support aviation knowledge retention.

Flashcards are associated with aviation subjects and allow users to review concepts, track performance, and schedule future reviews.

---

## Domain Entities

### Flashcard

Represents a learning card associated with an aviation subject.

Responsibilities:

- Store question content
- Store answer content
- Associate knowledge with subjects
- Control availability through activation status

---

### UserFlashcard

Represents the relationship between a user and a flashcard.

Responsibilities:

- Track user progress
- Store correct and incorrect review counts
- Store last review date
- Calculate next review date

---

### FlashcardReview

Stores individual review attempts.

Responsibilities:

- Record review history
- Store review result
- Provide historical learning data

---

## Learning Flow

The review process follows this flow:

1. User accesses available flashcards.
2. User reviews a flashcard.
3. User marks the answer as correct or incorrect.
4. The review is stored.
5. User progress is updated.
6. The next review date is calculated.
7. A study session can be saved after the review queue.

---

## API

### Flashcards

```http
GET    /api/v1/flashcards
GET    /api/v1/flashcards/overview
GET    /api/v1/flashcards/review-queue
GET    /api/v1/flashcards/:id
POST   /api/v1/flashcards
```

### Reviews

```http
GET    /api/v1/flashcards/reviews
POST   /api/v1/flashcards/:id/review
```

---

## Spaced Repetition Foundation

The current implementation provides the foundation for spaced repetition algorithms.

Current behavior:

- Correct answers increase the review interval.
- Incorrect answers schedule an earlier review.
- Review history is permanently stored.

Future improvements may include:

- SM-2 algorithm
- Difficulty scoring
- Adaptive intervals

---

## Frontend

Route: `/flashcards`

Feature module: `frontend/src/features/flashcards/`

Includes certification/subject filters, review queue, flip cards, and session summary with study session persistence.
